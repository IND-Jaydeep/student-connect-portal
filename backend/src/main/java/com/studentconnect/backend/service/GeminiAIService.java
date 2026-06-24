package com.studentconnect.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentconnect.backend.dto.NoticeAnalysisResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiAIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient = WebClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Analyze a university notice and return AI-generated category, priority, and summary.
     * Replaces the keyword-matching analyzeNotice() from noticeService.js
     */
    public NoticeAnalysisResponse analyzeNotice(String title, String body) {
        String prompt = """
                Analyze this university notice and return ONLY a JSON object (no markdown, no code fences):
                {
                  "category": one of ["Exam", "Academic", "Co-curricular", "General"],
                  "priority": one of ["High", "Medium", "Low"],
                  "summary": a 1-2 sentence summary (max 120 chars)
                }

                Title: %s
                Body: %s
                """.formatted(title, body);

        String aiResponse = callGemini(prompt);

        try {
            // Clean the response - remove markdown code fences if present
            String cleaned = aiResponse.replaceAll("```json\\s*", "")
                    .replaceAll("```\\s*", "")
                    .trim();

            JsonNode json = objectMapper.readTree(cleaned);
            return NoticeAnalysisResponse.builder()
                    .category(json.has("category") ? json.get("category").asText() : "General")
                    .priority(json.has("priority") ? json.get("priority").asText() : "Low")
                    .summary(json.has("summary") ? json.get("summary").asText() : "")
                    .build();
        } catch (JsonProcessingException e) {
            log.error("Failed to parse AI notice analysis response: {}", aiResponse, e);
            return NoticeAnalysisResponse.builder()
                    .category("General")
                    .priority("Low")
                    .summary("Unable to generate AI summary.")
                    .build();
        }
    }

    /**
     * AI chatbot for university-related queries.
     * Replaces getChatResponse() from ChatBot.jsx
     */
    public String chat(String userMessage, String role, String userName) {
        String prompt = """
                You are a helpful AI assistant for a University Management System (UMS) called Student-Connect.
                The user's role is: %s
                The user's name is: %s
                You can help with: exam dates, timetable info, attendance queries,
                grievance status, notice info, and general academic guidance.
                Keep responses concise (2-3 sentences max).
                Be friendly and professional.

                User: %s
                """.formatted(role, userName, userMessage);

        return callGemini(prompt);
    }

    /**
     * Convert natural language to SQL query.
     * Used by the Statistics page NL→SQL feature.
     */
    public String naturalLanguageToSQL(String userPrompt) {
        String prompt = """
                You are a SQL generator for a university database with these tables:
                - users (id, name, email, role ENUM('STUDENT','PARENT','FACULTY','ADMIN'), student_id, course, phone, address)
                - attendance (id, student_id, subject, total_lectures, attended_lectures, icon, color)
                - exams (id, exam_date, subject, start_time, end_time, room, exam_type, course, semester)
                - grievances (id, title, description, sender_id, sender_name, sender_role, status ENUM('PENDING','RESOLVED'), created_at)
                - notices (id, title, body, summary, category, priority ENUM('LOW','MEDIUM','HIGH'), audience, author_name, created_at)
                - timetable_slots (id, day_of_week, time_slot, room_number, subject, slot_type, course, semester)

                Convert this natural language query to MySQL:
                "%s"

                Return ONLY the SQL query as plain text without any formatting, code fences, or explanation.
                Only generate SELECT queries. NEVER generate UPDATE, DELETE, INSERT, DROP, ALTER, or any DDL/DML statement.
                If the query cannot be converted safely, return: SELECT 'Query cannot be processed' AS message;
                """.formatted(userPrompt);

        String aiResponse = callGemini(prompt);

        // Clean up - remove any markdown formatting
        String sql = aiResponse.replaceAll("```sql\\s*", "")
                .replaceAll("```\\s*", "")
                .trim();

        // Security: validate only SELECT queries
        String upperSql = sql.toUpperCase().trim();
        if (!upperSql.startsWith("SELECT")) {
            return "SELECT 'Unsafe query rejected' AS message";
        }

        // Block dangerous keywords
        String[] blockedKeywords = {"DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE", "EXEC", "EXECUTE", "--", ";"};
        // Allow semicolon only at the very end
        String sqlWithoutTrailingSemicolon = sql.replaceAll(";\\s*$", "");
        for (String keyword : blockedKeywords) {
            if (sqlWithoutTrailingSemicolon.toUpperCase().contains(keyword)) {
                return "SELECT 'Unsafe query rejected' AS message";
            }
        }

        return sql.replaceAll(";\\s*$", ""); // remove trailing semicolons
    }

    /**
     * Core method to call Google Gemini API
     */
    private String callGemini(String prompt) {
        String url = apiUrl + "?key=" + apiKey;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", prompt))
                ))
        );

        try {
            String response = webClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractTextFromResponse(response);
        } catch (Exception e) {
            log.error("Gemini API call failed", e);
            return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
        }
    }

    /**
     * Extract the text content from Gemini's JSON response structure
     */
    private String extractTextFromResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode candidates = root.get("candidates");
            if (candidates != null && candidates.isArray() && !candidates.isEmpty()) {
                JsonNode content = candidates.get(0).get("content");
                if (content != null) {
                    JsonNode parts = content.get("parts");
                    if (parts != null && parts.isArray() && !parts.isEmpty()) {
                        return parts.get(0).get("text").asText();
                    }
                }
            }
            return "No response generated.";
        } catch (JsonProcessingException e) {
            log.error("Failed to parse Gemini response", e);
            return "Error parsing AI response.";
        }
    }
}
