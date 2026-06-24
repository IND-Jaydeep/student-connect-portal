package com.studentconnect.backend.controller;

import com.studentconnect.backend.dto.ChatRequest;
import com.studentconnect.backend.dto.ChatResponse;
import com.studentconnect.backend.security.JwtUtil;
import com.studentconnect.backend.service.ChatBotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatBotService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(
            @Valid @RequestBody ChatRequest request,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String role = jwtUtil.extractRole(token);
        String name = jwtUtil.extractName(token);
        Long userId = jwtUtil.extractUserId(token);

        String response = chatBotService.processMessage(
                request.getMessage(), role, name, userId
        );

        return ResponseEntity.ok(ChatResponse.builder().response(response).build());
    }
}
