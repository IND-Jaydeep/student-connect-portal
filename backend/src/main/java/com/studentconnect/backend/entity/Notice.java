package com.studentconnect.backend.entity;

import com.studentconnect.backend.enums.Priority;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(length = 30)
    private String category;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Priority priority = Priority.LOW;

    @Column(nullable = false, length = 20)
    private String audience;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(name = "author_name", length = 100)
    private String authorName;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
