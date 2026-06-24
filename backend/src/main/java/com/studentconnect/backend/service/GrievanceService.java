package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.Grievance;
import com.studentconnect.backend.enums.GrievanceStatus;
import com.studentconnect.backend.repository.GrievanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrievanceService {

    private final GrievanceRepository grievanceRepository;

    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Grievance> getGrievancesBySender(Long senderId) {
        return grievanceRepository.findBySenderId(senderId);
    }

    public Grievance createGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    public Grievance resolveGrievance(Long id, Long resolvedByUserId) {
        Grievance grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grievance not found: " + id));

        grievance.setStatus(GrievanceStatus.RESOLVED);
        grievance.setResolvedBy(resolvedByUserId);
        grievance.setResolvedAt(LocalDateTime.now());

        return grievanceRepository.save(grievance);
    }

    public long countPending() {
        return grievanceRepository.countByStatus(GrievanceStatus.PENDING);
    }
}
