package com.studentconnect.backend.controller;

import com.studentconnect.backend.entity.Grievance;
import com.studentconnect.backend.enums.Role;
import com.studentconnect.backend.security.JwtUtil;
import com.studentconnect.backend.service.GrievanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grievances")
@RequiredArgsConstructor
public class GrievanceController {

    private final GrievanceService grievanceService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Grievance>> getAllGrievances() {
        return ResponseEntity.ok(grievanceService.getAllGrievances());
    }

    @GetMapping("/my")
    public ResponseEntity<List<Grievance>> getMyGrievances(
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(grievanceService.getGrievancesBySender(userId));
    }

    @PostMapping
    public ResponseEntity<Grievance> submitGrievance(
            @RequestBody Grievance grievance,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        String name = jwtUtil.extractName(token);
        String role = jwtUtil.extractRole(token);

        grievance.setSenderId(userId);
        grievance.setSenderName(name);
        grievance.setSenderRole(Role.valueOf(role));

        return ResponseEntity.ok(grievanceService.createGrievance(grievance));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Grievance> resolveGrievance(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        return ResponseEntity.ok(grievanceService.resolveGrievance(id, userId));
    }
}
