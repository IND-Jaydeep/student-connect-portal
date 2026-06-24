package com.studentconnect.backend.controller;

import com.studentconnect.backend.dto.NLQueryRequest;
import com.studentconnect.backend.service.StatisticsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @PostMapping("/query")
    public ResponseEntity<Map<String, Object>> queryStats(
            @Valid @RequestBody NLQueryRequest request) {
        Map<String, Object> result = statisticsService.executeNLQuery(request.getPrompt());
        return ResponseEntity.ok(result);
    }
}
