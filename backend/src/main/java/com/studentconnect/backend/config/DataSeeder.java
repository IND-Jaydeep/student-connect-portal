package com.studentconnect.backend.config;

import com.studentconnect.backend.entity.*;
import com.studentconnect.backend.enums.GrievanceStatus;
import com.studentconnect.backend.enums.Priority;
import com.studentconnect.backend.enums.Role;
import com.studentconnect.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AttendanceRepository attendanceRepository;
    private final TimetableRepository timetableRepository;
    private final ExamRepository examRepository;
    private final GrievanceRepository grievanceRepository;
    private final NoticeRepository noticeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded, skipping...");
            return;
        }

        log.info("Seeding database with initial data...");

        // ===== USERS =====
        User admin = userRepository.save(User.builder()
                .name("Admin")
                .email("admin@university.edu")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .studentId("A-0001")
                .course("University Administration")
                .build());

        User student = userRepository.save(User.builder()
                .name("Alex Mercer")
                .email("alex@gmail.com")
                .password(passwordEncoder.encode("student123"))
                .role(Role.STUDENT)
                .studentId("12102030")
                .course("BTech. CSE")
                .phone("9876543210")
                .build());

        User parent = userRepository.save(User.builder()
                .name("Mr. Mercer")
                .email("mercer.parent@gmail.com")
                .password(passwordEncoder.encode("parent123"))
                .role(Role.PARENT)
                .studentId("P-20301")
                .course("Parent of Alex Mercer")
                .build());

        User faculty = userRepository.save(User.builder()
                .name("Dr. Sarah Jenkins")
                .email("sarah.jenkins@university.edu")
                .password(passwordEncoder.encode("faculty123"))
                .role(Role.FACULTY)
                .studentId("F-1001")
                .course("Dept. of CSE")
                .build());

        // ===== ATTENDANCE (for Alex) =====
        attendanceRepository.save(Attendance.builder()
                .studentId(student.getId()).subject("Engineering Graphics")
                .totalLectures(14).attendedLectures(12)
                .icon("architecture").color("var(--color-primary)").build());

        attendanceRepository.save(Attendance.builder()
                .studentId(student.getId()).subject("Mathematical Engineering")
                .totalLectures(29).attendedLectures(27)
                .icon("functions").color("var(--color-danger)").build());

        attendanceRepository.save(Attendance.builder()
                .studentId(student.getId()).subject("Computer Architecture")
                .totalLectures(30).attendedLectures(27)
                .icon("computer").color("var(--color-success)").build());

        attendanceRepository.save(Attendance.builder()
                .studentId(student.getId()).subject("Database Management")
                .totalLectures(25).attendedLectures(24)
                .icon("dns").color("var(--color-danger)").build());

        attendanceRepository.save(Attendance.builder()
                .studentId(student.getId()).subject("Network Security")
                .totalLectures(27).attendedLectures(25)
                .icon("router").color("var(--color-primary)").build());

        // ===== TIMETABLE — Monday to Friday =====
        seedTimetableMonday();
        seedTimetableTuesday();
        seedTimetableWednesday();
        seedTimetableThursday();
        seedTimetableFriday();

        // ===== EXAMS =====
        examRepository.save(Exam.builder()
                .examDate(LocalDate.of(2026, 7, 1)).subject("Engineering Graphics")
                .startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(12, 0))
                .room("Hall A").examType("Mid-Term").course("BTech CSE").semester(3).build());

        examRepository.save(Exam.builder()
                .examDate(LocalDate.of(2026, 7, 3)).subject("Mathematical Engineering")
                .startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(12, 0))
                .room("Hall B").examType("Mid-Term").course("BTech CSE").semester(3).build());

        examRepository.save(Exam.builder()
                .examDate(LocalDate.of(2026, 7, 5)).subject("Computer Architecture")
                .startTime(LocalTime.of(14, 0)).endTime(LocalTime.of(17, 0))
                .room("Hall A").examType("Mid-Term").course("BTech CSE").semester(3).build());

        examRepository.save(Exam.builder()
                .examDate(LocalDate.of(2026, 7, 7)).subject("Database Management")
                .startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(12, 0))
                .room("Hall C").examType("Mid-Term").course("BTech CSE").semester(3).build());

        examRepository.save(Exam.builder()
                .examDate(LocalDate.of(2026, 7, 9)).subject("Network Security")
                .startTime(LocalTime.of(14, 0)).endTime(LocalTime.of(17, 0))
                .room("Hall B").examType("Mid-Term").course("BTech CSE").semester(3).build());

        // ===== NOTICES =====
        noticeRepository.save(Notice.builder()
                .title("Mid-Term Examinations Instructions")
                .body("All students must carry their university ID cards to the examination hall. No electronic devices are permitted. Seating arrangements will be displayed outside the exam halls 30 minutes before the exam. Students arriving more than 15 minutes late will not be allowed to enter.")
                .summary("Critical guidelines for upcoming mid-term exams including ID requirements and timing rules.")
                .category("Exam").priority(Priority.HIGH).audience("STUDENT")
                .authorId(admin.getId()).authorName("Controller of Examinations").build());

        noticeRepository.save(Notice.builder()
                .title("Hackathon 2026 Registration Open")
                .body("Registrations are now open for the annual University Hackathon 2026. Teams of 2-4 members can register before June 30th. Prizes worth Rs. 1,00,000 to be won! Register at the Student Activities Center or online through the portal.")
                .summary("Annual Hackathon 2026 registration open until June 30th with exciting prizes.")
                .category("Co-curricular").priority(Priority.MEDIUM).audience("STUDENT")
                .authorId(admin.getId()).authorName("Student Hackathon Club").build());

        noticeRepository.save(Notice.builder()
                .title("Library Extended Hours During Exams")
                .body("The Central Library will remain open from 7 AM to 11 PM during the examination period (July 1-15). Additional reading rooms in Block C will also be available. WiFi access has been upgraded for better connectivity.")
                .summary("Library hours extended to 7 AM - 11 PM during exam period.")
                .category("Academic").priority(Priority.MEDIUM).audience("STUDENT")
                .authorId(admin.getId()).authorName("Chief Librarian").build());

        noticeRepository.save(Notice.builder()
                .title("Parent-Teacher Meeting Schedule")
                .body("The semester PTM is scheduled for July 20th, 2026. Parents can book time slots with faculty members through this portal. Meeting will be held in the Main Auditorium from 10 AM to 4 PM.")
                .summary("PTM scheduled for July 20th in Main Auditorium, slot booking available online.")
                .category("Academic").priority(Priority.HIGH).audience("PARENT")
                .authorId(admin.getId()).authorName("Dean of Student Affairs").build());

        noticeRepository.save(Notice.builder()
                .title("Faculty Development Workshop")
                .body("A 3-day workshop on \"AI in Education\" will be conducted from July 25-27. All faculty members are encouraged to attend. Registration is mandatory through the HR portal by July 15th.")
                .summary("AI in Education workshop for faculty from July 25-27, registration by July 15th.")
                .category("Academic").priority(Priority.MEDIUM).audience("FACULTY")
                .authorId(admin.getId()).authorName("Director IQAC").build());

        noticeRepository.save(Notice.builder()
                .title("Campus Maintenance Notice")
                .body("Scheduled maintenance of the electrical systems in Blocks A and B will take place on June 28th from 6 AM to 12 PM. Power supply will be temporarily disrupted. All departments are requested to plan accordingly.")
                .summary("Power disruption in Blocks A & B on June 28th for scheduled maintenance.")
                .category("General").priority(Priority.LOW).audience("ALL")
                .authorId(admin.getId()).authorName("Estate Office").build());

        // ===== GRIEVANCES =====
        grievanceRepository.save(Grievance.builder()
                .title("Wi-Fi connection is extremely slow in Hostel Block C")
                .description("We are unable to access online study materials and attend live lectures due to extremely poor Wi-Fi connectivity in Hostel Block C. This has been an issue for the past two weeks. Kindly look into this urgently.")
                .senderId(student.getId()).senderName("Alex Mercer").senderRole(Role.STUDENT)
                .status(GrievanceStatus.PENDING).build());

        grievanceRepository.save(Grievance.builder()
                .title("DBMS Lecture slides not uploaded")
                .description("Can you upload Lab 3-5 DBMS guides? The practical exam is approaching and we need the reference materials. The slides from last three lectures are also missing from the portal.")
                .senderId(student.getId()).senderName("Alex Mercer").senderRole(Role.STUDENT)
                .status(GrievanceStatus.PENDING).build());

        grievanceRepository.save(Grievance.builder()
                .title("Request to check attendance error in Engineering Graphics")
                .description("I was marked absent on May 20th and May 22nd in Engineering Graphics, but my son Alex was present in class on both days. He has confirmed this with his classmates. Please review and correct the attendance records.")
                .senderId(parent.getId()).senderName("Mr. Mercer").senderRole(Role.PARENT)
                .status(GrievanceStatus.PENDING).build());

        log.info("Database seeding complete!");
    }

    private void seedTimetableMonday() {
        String c = "BTech CSE"; int s = 3;
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("9:00 - 10:00").roomNumber("101").subject("Engineering Graphics").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("10:00 - 11:00").roomNumber("102").subject("Mathematical Engineering").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("11:00 - 12:00").roomNumber("103").subject("Computer Architecture").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("12:00 - 1:00").roomNumber("-").subject("Lunch Break").slotType("").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("1:00 - 2:00").roomNumber("Lab 1").subject("Database Management").slotType("Lab").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(1).timeSlot("2:00 - 3:00").roomNumber("Lab 1").subject("Database Management").slotType("Lab").course(c).semester(s).build());
    }

    private void seedTimetableTuesday() {
        String c = "BTech CSE"; int s = 3;
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("9:00 - 10:00").roomNumber("201").subject("Database Management").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("10:00 - 11:00").roomNumber("202").subject("Network Security").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("11:00 - 12:00").roomNumber("203").subject("Engineering Graphics").slotType("Tutorial").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("12:00 - 1:00").roomNumber("-").subject("Lunch Break").slotType("").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("1:00 - 2:00").roomNumber("204").subject("Mathematical Engineering").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(2).timeSlot("2:00 - 3:00").roomNumber("Lab 2").subject("Computer Architecture").slotType("Lab").course(c).semester(s).build());
    }

    private void seedTimetableWednesday() {
        String c = "BTech CSE"; int s = 3;
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("9:00 - 10:00").roomNumber("301").subject("Computer Architecture").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("10:00 - 11:00").roomNumber("302").subject("Network Security").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("11:00 - 12:00").roomNumber("303").subject("Mathematical Engineering").slotType("Tutorial").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("12:00 - 1:00").roomNumber("-").subject("Lunch Break").slotType("").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("1:00 - 2:00").roomNumber("Lab 3").subject("Network Security").slotType("Lab").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(3).timeSlot("2:00 - 3:00").roomNumber("Lab 3").subject("Network Security").slotType("Lab").course(c).semester(s).build());
    }

    private void seedTimetableThursday() {
        String c = "BTech CSE"; int s = 3;
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("9:00 - 10:00").roomNumber("101").subject("Engineering Graphics").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("10:00 - 11:00").roomNumber("102").subject("Database Management").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("11:00 - 12:00").roomNumber("103").subject("Computer Architecture").slotType("Tutorial").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("12:00 - 1:00").roomNumber("-").subject("Lunch Break").slotType("").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("1:00 - 2:00").roomNumber("204").subject("Mathematical Engineering").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(4).timeSlot("2:00 - 3:00").roomNumber("Lab 2").subject("Engineering Graphics").slotType("Lab").course(c).semester(s).build());
    }

    private void seedTimetableFriday() {
        String c = "BTech CSE"; int s = 3;
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("9:00 - 10:00").roomNumber("301").subject("Network Security").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("10:00 - 11:00").roomNumber("302").subject("Mathematical Engineering").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("11:00 - 12:00").roomNumber("303").subject("Database Management").slotType("Tutorial").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("12:00 - 1:00").roomNumber("-").subject("Lunch Break").slotType("").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("1:00 - 2:00").roomNumber("204").subject("Engineering Graphics").slotType("Lecture").course(c).semester(s).build());
        timetableRepository.save(TimetableSlot.builder().dayOfWeek(5).timeSlot("2:00 - 3:00").roomNumber("Lab 1").subject("Computer Architecture").slotType("Lab").course(c).semester(s).build());
    }
}
