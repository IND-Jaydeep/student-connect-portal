package com.studentconnect.backend.entity;

import com.studentconnect.backend.enums.GrievanceStatus;
import com.studentconnect.backend.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "grievances")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grievance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(name = "sender_name", nullable = false, length = 100)
    private String senderName;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender_role", nullable = false)
    private Role senderRole;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private GrievanceStatus status = GrievanceStatus.PENDING;

    @Column(name = "resolved_by")
    private Long resolvedBy;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
