package com.studentconnect.backend.repository;

import com.studentconnect.backend.entity.TimetableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableSlot, Long> {
    List<TimetableSlot> findByDayOfWeek(Integer dayOfWeek);
    List<TimetableSlot> findByDayOfWeekAndCourse(Integer dayOfWeek, String course);
}
