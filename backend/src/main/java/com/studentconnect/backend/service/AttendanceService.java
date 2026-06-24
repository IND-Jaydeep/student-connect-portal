package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.Attendance;
import com.studentconnect.backend.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public List<Attendance> getAttendanceByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public Attendance updateAttendance(Long id, Attendance updated) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found: " + id));

        if (updated.getTotalLectures() != null) {
            attendance.setTotalLectures(updated.getTotalLectures());
        }
        if (updated.getAttendedLectures() != null) {
            attendance.setAttendedLectures(updated.getAttendedLectures());
        }

        return attendanceRepository.save(attendance);
    }
}
