package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

@Entity
@Table(name = "parent")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Parent extends User {

    @Column(length = 100)
    private String occupation;

    @Column(name = "alternate_phone", length = 20)
    private String alternatePhone;

    @ManyToMany(mappedBy = "parents")
    private List<Student> children;
}
