package com.studentconnect.backend.controller;

import com.studentconnect.backend.entity.TimetableSlot;
import com.studentconnect.backend.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableService timetableService;

    @GetMapping
    public ResponseEntity<List<TimetableSlot>> getTimetable(
            @RequestParam Integer day,
            @RequestParam(required = false) String course) {
        if (course != null && !course.isEmpty()) {
            return ResponseEntity.ok(timetableService.getByDayAndCourse(day, course));
        }
        return ResponseEntity.ok(timetableService.getByDay(day));
    }

    @PostMapping
    public ResponseEntity<TimetableSlot> createSlot(@RequestBody TimetableSlot slot) {
        return ResponseEntity.ok(timetableService.create(slot));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        timetableService.delete(id);
        return ResponseEntity.ok().build();
    }
}
