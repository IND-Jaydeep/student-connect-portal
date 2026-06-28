package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

@Entity
@Table(name = "faculty")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Faculty extends User {

    @Column(name = "employee_id", length = 20)
    private String employeeId;

    @Column(length = 100)
    private String department;

    @Column(length = 100)
    private String designation;

    @OneToMany(mappedBy = "classTeacher")
    private List<Student> classStudents;
}
