package com.studentconnect.backend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticsService {

    private final GeminiAIService geminiAIService;
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public Map<String, Object> executeNLQuery(String userPrompt) {
        Map<String, Object> result = new HashMap<>();

        try {
            // Generate SQL from natural language
            String sql = geminiAIService.naturalLanguageToSQL(userPrompt);
            result.put("sql", sql);

            // Execute the safe SELECT query
            Query query = entityManager.createNativeQuery(sql);
            List<?> rows = query.getResultList();

            // Convert results to a list of maps
            List<Map<String, Object>> data = new ArrayList<>();
            for (Object row : rows) {
                Map<String, Object> rowMap = new LinkedHashMap<>();
                if (row instanceof Object[] cols) {
                    for (int i = 0; i < cols.length; i++) {
                        rowMap.put("col_" + i, cols[i]);
                    }
                } else {
                    rowMap.put("col_0", row);
                }
                data.add(rowMap);
            }

            result.put("data", data);
            result.put("rowCount", data.size());
            result.put("success", true);

        } catch (Exception e) {
            log.error("NL→SQL query failed for prompt: {}", userPrompt, e);
            result.put("success", false);
            result.put("error", "Failed to process query: " + e.getMessage());
            result.put("data", List.of());
        }

        return result;
    }
}
