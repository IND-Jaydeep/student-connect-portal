package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parent_student")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParentStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;
}
