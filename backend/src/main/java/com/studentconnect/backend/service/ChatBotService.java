package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.ChatHistory;
import com.studentconnect.backend.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatBotService {

    private final GeminiAIService geminiAIService;
    private final ChatHistoryRepository chatHistoryRepository;

    public String processMessage(String message, String role, String userName, Long userId) {
        String response = geminiAIService.chat(message, role, userName);

        // Save to chat history
        ChatHistory history = ChatHistory.builder()
                .userId(userId)
                .message(message)
                .response(response)
                .build();
        chatHistoryRepository.save(history);

        return response;
    }
}
