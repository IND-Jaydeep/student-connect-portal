package com.studentconnect.backend.controller;

import com.studentconnect.backend.entity.Exam;
import com.studentconnect.backend.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @GetMapping
    public ResponseEntity<List<Exam>> getExams(
            @RequestParam(required = false) String course) {
        if (course != null && !course.isEmpty()) {
            return ResponseEntity.ok(examService.getExamsByCourse(course));
        }
        return ResponseEntity.ok(examService.getAllExams());
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.createExam(exam));
    }
}
