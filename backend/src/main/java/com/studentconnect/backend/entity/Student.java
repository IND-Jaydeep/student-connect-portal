package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

@Entity
@Table(name = "student")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Student extends User {

    @Column(name = "student_id", length = 20)
    private String studentId;

    @Column(length = 100)
    private String branch;

    @Column(name = "year_of_degree", length = 20)
    private String yearOfDegree;

    @Column(length = 10)
    private String division;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty classTeacher;

    @ManyToMany
    @JoinTable(
        name = "student_parent_mapping",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "parent_id")
    )
    private List<Parent> parents;
}
