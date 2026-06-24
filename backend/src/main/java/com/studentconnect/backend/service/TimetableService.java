package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.TimetableSlot;
import com.studentconnect.backend.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableService {

    private final TimetableRepository timetableRepository;

    public List<TimetableSlot> getByDay(Integer dayOfWeek) {
        return timetableRepository.findByDayOfWeek(dayOfWeek);
    }

    public List<TimetableSlot> getByDayAndCourse(Integer dayOfWeek, String course) {
        return timetableRepository.findByDayOfWeekAndCourse(dayOfWeek, course);
    }

    public TimetableSlot create(TimetableSlot slot) {
        return timetableRepository.save(slot);
    }

    public void delete(Long id) {
        timetableRepository.deleteById(id);
    }
}
