package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.Exam;
import com.studentconnect.backend.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAllByOrderByExamDateAsc();
    }

    public List<Exam> getExamsByCourse(String course) {
        return examRepository.findByCourse(course);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }
}
