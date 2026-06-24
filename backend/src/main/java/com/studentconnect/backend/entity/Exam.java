package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "exams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(nullable = false, length = 30)
    private String room;

    @Column(name = "exam_type", length = 30)
    private String examType;

    @Column(length = 100)
    private String course;

    private Integer semester;
}
