package com.studentconnect.backend.service;

import com.studentconnect.backend.entity.Notice;
import com.studentconnect.backend.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getNoticesByAudience(String audience) {
        if (audience == null || audience.isEmpty() || audience.equalsIgnoreCase("ALL")) {
            return noticeRepository.findAllByOrderByCreatedAtDesc();
        }
        return noticeRepository.findByAudienceOrAll(audience.toUpperCase());
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }

    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }
}
