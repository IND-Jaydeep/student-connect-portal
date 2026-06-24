package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(name = "total_lectures")
    private Integer totalLectures;

    @Column(name = "attended_lectures")
    private Integer attendedLectures;

    @Column(length = 50)
    private String icon;

    @Column(length = 50)
    private String color;
}
