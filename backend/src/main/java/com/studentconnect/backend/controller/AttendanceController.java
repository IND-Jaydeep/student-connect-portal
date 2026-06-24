package com.studentconnect.backend.controller;

import com.studentconnect.backend.entity.Attendance;
import com.studentconnect.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudentId(studentId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id,
                                                        @RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, attendance));
    }
}
