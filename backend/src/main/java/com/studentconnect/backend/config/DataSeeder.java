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
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final ParentRepository parentRepository;
    private final AdminRepository adminRepository;
    private final AttendanceRepository attendanceRepository;
    private final TimetableRepository timetableRepository;
    private final ExamRepository examRepository;
    private final GrievanceRepository grievanceRepository;
    private final NoticeRepository noticeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (studentRepository.count() >= 20) {
            log.info("Database already seeded with enough students, skipping...");
            return;
        }

        log.info("Seeding database with initial data for multiple users...");

        Random random = new Random();
        long ts = System.currentTimeMillis() % 100000; // Unique suffix for emails

        String[] firstNames = {"Aarav", "Advait", "Atharva", "Ayush", "Darshan", "Dhruv", "Harshad", "Jayesh", "Kedar", "Kunal", "Mihir", "Neeraj", "Nikhil", "Om", "Parth", "Pranav", "Prasad", "Rohan", "Sahil", "Sanket", "Saurabh", "Shlok", "Shreyas", "Soham", "Sumit", "Sushant", "Tejas", "Vedant", "Yash", "Aditya"};
        String[] lastNames = {"Kulkarni", "Deshmukh", "Joshi", "Patil", "Deshpande", "Kale", "Wagh", "Pawar", "Jadhav", "Shinde", "More", "Kamble", "Kadam", "Chavan", "Bhosale", "Gaikwad", "Mahajan", "Dixit", "Apte", "Gokhale"};
        String[] branches = {"Computer Engineering", "Mechanical Engineering", "Civil Engineering", "Electronics Engineering", "IT"};
        String[] parentNames = {"Rajesh", "Suresh", "Ramesh", "Prakash", "Ganesh", "Sanjay", "Anil", "Sunil", "Dilip", "Ashok"};

        // ===== ADMINS (3) =====
        List<Admin> admins = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            admins.add(adminRepository.save(Admin.builder()
                    .name("Admin " + i)
                    .email("admin" + i + "_" + ts + "@university.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .employeeId("A-000" + i + "-" + ts)
                    .department("University Administration")
                    .build()));
        }

        // ===== FACULTY (10) =====
        List<Faculty> faculties = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            String fName = firstNames[random.nextInt(firstNames.length)];
            String lName = lastNames[random.nextInt(lastNames.length)];
            faculties.add(facultyRepository.save(Faculty.builder()
                    .name("Prof. " + fName + " " + lName)
                    .email("faculty" + i + "_" + ts + "@university.edu")
                    .password(passwordEncoder.encode("faculty123"))
                    .role(Role.FACULTY)
                    .employeeId("F-10" + String.format("%02d", i) + "-" + ts)
                    .department(branches[random.nextInt(branches.length)])
                    .designation("Assistant Professor")
                    .build()));
        }

        // ===== STUDENTS (25) & PARENTS (25) =====
        List<Student> students = new ArrayList<>();
        for (int i = 1; i <= 25; i++) {
            String fName = firstNames[random.nextInt(firstNames.length)];
            String lName = lastNames[random.nextInt(lastNames.length)];
            String pName = parentNames[random.nextInt(parentNames.length)];
            
            Student student = studentRepository.save(Student.builder()
                    .name(fName + " " + lName)
                    .email("student" + i + "_" + ts + "@gmail.com")
                    .password(passwordEncoder.encode("student123"))
                    .role(Role.STUDENT)
                    .studentId("PRN" + (2023000 + i) + "-" + ts)
                    .branch(branches[random.nextInt(branches.length)])
                    .yearOfDegree(i % 2 == 0 ? "Third Year" : "Final Year")
                    .division(i % 2 == 0 ? "A" : "B")
                    .phone("98765" + String.format("%05d", random.nextInt(100000)))
                    .classTeacher(faculties.get(random.nextInt(faculties.size())))
                    .build());
            
            Parent parent = parentRepository.save(Parent.builder()
                    .name("Mr. " + pName + " " + lName)
                    .email("parent" + i + "_" + ts + "@gmail.com")
                    .password(passwordEncoder.encode("parent123"))
                    .role(Role.PARENT)
                    .occupation(i % 3 == 0 ? "Business" : "Service")
                    .alternatePhone("99887" + String.format("%05d", random.nextInt(100000)))
                    .build());

            // Add parent mapping
            student.setParents(List.of(parent));
            studentRepository.save(student);
            students.add(student);
        }

        // ===== ATTENDANCE (for first student) =====
        Student firstStudent = students.get(0);
        attendanceRepository.save(Attendance.builder()
                .student(firstStudent).subject("Engineering Graphics")
                .totalLectures(14).attendedLectures(12)
                .icon("architecture").color("var(--color-primary)").build());

        attendanceRepository.save(Attendance.builder()
                .student(firstStudent).subject("Mathematical Engineering")
                .totalLectures(29).attendedLectures(27)
                .icon("functions").color("var(--color-danger)").build());

        attendanceRepository.save(Attendance.builder()
                .student(firstStudent).subject("Computer Architecture")
                .totalLectures(30).attendedLectures(27)
                .icon("computer").color("var(--color-success)").build());

        attendanceRepository.save(Attendance.builder()
                .student(firstStudent).subject("Database Management")
                .totalLectures(25).attendedLectures(24)
                .icon("dns").color("var(--color-danger)").build());

        attendanceRepository.save(Attendance.builder()
                .student(firstStudent).subject("Network Security")
                .totalLectures(27).attendedLectures(25)
                .icon("router").color("var(--color-primary)").build());

        // ===== TIMETABLE — Monday to Friday =====
        if(timetableRepository.count() == 0) {
            seedTimetableMonday();
            seedTimetableTuesday();
            seedTimetableWednesday();
            seedTimetableThursday();
            seedTimetableFriday();
        }

        // ===== EXAMS =====
        if(examRepository.count() == 0) {
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
        }

        // ===== NOTICES =====
        if(noticeRepository.count() == 0) {
            noticeRepository.save(Notice.builder()
                    .title("Mid-Term Examinations Instructions")
                    .body("All students must carry their university ID cards...")
                    .summary("Critical guidelines for upcoming mid-term exams including ID requirements and timing rules.")
                    .category("Exam").priority(Priority.HIGH).audience("STUDENT")
                    .authorId(admins.get(0).getId()).authorName(admins.get(0).getName()).build());

            noticeRepository.save(Notice.builder()
                    .title("Hackathon 2026 Registration Open")
                    .body("Registrations are now open for the annual University Hackathon...")
                    .summary("Annual Hackathon 2026 registration open until June 30th with exciting prizes.")
                    .category("Co-curricular").priority(Priority.MEDIUM).audience("STUDENT")
                    .authorId(admins.get(0).getId()).authorName("Student Hackathon Club").build());
        }

        // ===== GRIEVANCES =====
        if(grievanceRepository.count() == 0) {
            grievanceRepository.save(Grievance.builder()
                    .title("Wi-Fi connection is extremely slow in Hostel Block C")
                    .description("We are unable to access online study materials...")
                    .senderId(firstStudent.getId()).senderName(firstStudent.getName()).senderRole(Role.STUDENT)
                    .status(GrievanceStatus.PENDING).build());
        }

        log.info("Database seeding complete with 25 students, 10 faculties, and 3 admins!");
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
