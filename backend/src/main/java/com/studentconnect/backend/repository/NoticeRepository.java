package com.studentconnect.backend.repository;

import com.studentconnect.backend.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("SELECT n FROM Notice n WHERE n.audience = :audience OR n.audience = 'ALL' ORDER BY n.createdAt DESC")
    List<Notice> findByAudienceOrAll(@Param("audience") String audience);

    List<Notice> findAllByOrderByCreatedAtDesc();
}
