package com.studentconnect.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "timetable_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek;

    @Column(name = "time_slot", nullable = false, length = 30)
    private String timeSlot;

    @Column(name = "room_number", nullable = false, length = 20)
    private String roomNumber;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(name = "slot_type", length = 20)
    private String slotType;

    @Column(length = 100)
    private String course;

    private Integer semester;
}
