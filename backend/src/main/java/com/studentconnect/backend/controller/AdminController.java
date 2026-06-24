package com.studentconnect.backend.controller;

import com.studentconnect.backend.enums.GrievanceStatus;
import com.studentconnect.backend.enums.Role;
import com.studentconnect.backend.repository.GrievanceRepository;
import com.studentconnect.backend.repository.NoticeRepository;
import com.studentconnect.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final GrievanceRepository grievanceRepository;
    private final NoticeRepository noticeRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalStudents = userRepository.countByRole(Role.STUDENT);
        long totalFaculty = userRepository.countByRole(Role.FACULTY);
        long totalParents = userRepository.countByRole(Role.PARENT);
        long pendingGrievances = grievanceRepository.countByStatus(GrievanceStatus.PENDING);
        long resolvedGrievances = grievanceRepository.countByStatus(GrievanceStatus.RESOLVED);
        long totalNotices = noticeRepository.count();

        Map<String, Object> stats = Map.of(
                "totalStudents", totalStudents,
                "totalFaculty", totalFaculty,
                "totalParents", totalParents,
                "pendingGrievances", pendingGrievances,
                "resolvedGrievances", resolvedGrievances,
                "totalNotices", totalNotices
        );

        return ResponseEntity.ok(stats);
    }
}
