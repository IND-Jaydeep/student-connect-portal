package com.studentconnect.backend.repository;

import com.studentconnect.backend.entity.Grievance;
import com.studentconnect.backend.enums.GrievanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    List<Grievance> findBySenderId(Long senderId);
    List<Grievance> findAllByOrderByCreatedAtDesc();
    long countByStatus(GrievanceStatus status);
}
