package com.studentconnect.backend.repository;

import com.studentconnect.backend.entity.LectureSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureSessionRepository extends JpaRepository<LectureSession, Long> {
}
