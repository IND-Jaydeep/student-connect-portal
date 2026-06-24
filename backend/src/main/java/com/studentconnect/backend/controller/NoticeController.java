package com.studentconnect.backend.controller;

import com.studentconnect.backend.dto.NoticeAnalysisResponse;
import com.studentconnect.backend.entity.Notice;
import com.studentconnect.backend.enums.Priority;
import com.studentconnect.backend.enums.Role;
import com.studentconnect.backend.security.JwtUtil;
import com.studentconnect.backend.service.GeminiAIService;
import com.studentconnect.backend.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final GeminiAIService geminiAIService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Notice>> getNotices(
            @RequestParam(required = false) String audience) {
        return ResponseEntity.ok(noticeService.getNoticesByAudience(audience));
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(
            @RequestBody Notice notice,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        String name = jwtUtil.extractName(token);

        notice.setAuthorId(userId);
        notice.setAuthorName(name);

        return ResponseEntity.ok(noticeService.createNotice(notice));
    }

    @PostMapping("/analyze")
    public ResponseEntity<NoticeAnalysisResponse> analyzeNotice(
            @RequestBody Map<String, String> request) {
        String title = request.getOrDefault("title", "");
        String body = request.getOrDefault("body", "");
        NoticeAnalysisResponse analysis = geminiAIService.analyzeNotice(title, body);
        return ResponseEntity.ok(analysis);
    }
}
