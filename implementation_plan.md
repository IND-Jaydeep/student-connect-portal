# Backend Roadmap — AI-Based Student-Connect Portal

> **Stack**: Java 17 + Spring Boot 3.x + MySQL 8 + Google Gemini AI (free API)
> **Frontend**: Your existing React (Vite) app at `c:\Users\jayde\OneDrive\Desktop\Ai-Based Student-Connect portal`

---

## Overview — What Needs a Backend?

| Frontend Feature | Current Implementation | Backend Needed |
|---|---|---|
| Login / Signup | `localStorage` mock auth | ✅ JWT Authentication |
| Role-based routing | `useAuth` context (client-only) | ✅ Server-side role verification |
| Attendance (Student Dashboard) | Hardcoded array | ✅ DB-backed attendance records |
| Timetable | Static `data/timetable.js` | ✅ CRUD from `timetable` table |
| Exam Schedule | Hardcoded array | ✅ DB-backed exam schedule |
| Grievances | `localStorage` via `grievanceService.js` | ✅ Persistent DB + REST API |
| Notices | `localStorage` via `noticeService.js` | ✅ Persistent DB + REST API |
| Notice AI Analysis | Keyword-matching `analyzeNotice()` | ✅ Real AI via Google Gemini |
| ChatBot | Hardcoded `getChatResponse()` | ✅ Real AI via Google Gemini |
| Statistics (NL → SQL) | Hardcoded mock results | ✅ Real NL→SQL via Gemini + actual DB queries |
| Settings / Profile | `localStorage` | ✅ User profile table |
| Password Change | `alert()` only | ✅ BCrypt password hashing |
| Admin Stats (Students/Faculty count) | Hardcoded `1420` / `86` | ✅ Real `COUNT(*)` from DB |

---

## Phase 1 — Project Setup & Tooling

### 1.1 Prerequisites to Install

| Tool | Version | Download |
|---|---|---|
| **JDK** | 17+ | [Adoptium](https://adoptium.net/) |
| **MySQL** | 8.0+ | [MySQL Installer](https://dev.mysql.com/downloads/installer/) |
| **Maven** | 3.9+ | Bundled with Spring Boot or [install separately](https://maven.apache.org/) |
| **IDE** | IntelliJ IDEA Community (free) | [Download](https://www.jetbrains.com/idea/download/) |
| **Postman** | Latest | [Download](https://www.postman.com/downloads/) — for API testing |

### 1.2 Generate the Spring Boot Project

Go to [start.spring.io](https://start.spring.io/) and configure:

| Setting | Value |
|---|---|
| Project | Maven |
| Language | Java |
| Spring Boot | 3.3.x (latest stable) |
| Group | `com.studentconnect` |
| Artifact | `backend` |
| Package name | `com.studentconnect.backend` |
| Java | 17 |

**Dependencies to add:**
- `Spring Web`
- `Spring Data JPA`
- `MySQL Driver`
- `Spring Security`
- `Lombok`
- `Spring Boot DevTools`
- `Validation`

> Click **Generate** → Extract the ZIP → Place it next to your frontend:
> ```
> Desktop/
> ├── Ai-Based Student-Connect portal/    ← your frontend
> └── student-connect-backend/            ← new Spring Boot project
> ```

### 1.3 Project Directory Structure (Final Goal)

```
student-connect-backend/
├── src/main/java/com/studentconnect/backend/
│   ├── BackendApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── CorsConfig.java
│   │   └── WebConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── AttendanceController.java
│   │   ├── TimetableController.java
│   │   ├── ExamController.java
│   │   ├── GrievanceController.java
│   │   ├── NoticeController.java
│   │   ├── ChatBotController.java
│   │   ├── StatisticsController.java
│   │   ├── UserController.java
│   │   └── AdminController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── SignupRequest.java
│   │   ├── AuthResponse.java
│   │   ├── ChatRequest.java
│   │   ├── ChatResponse.java
│   │   ├── NoticeAnalysisResponse.java
│   │   └── NLQueryRequest.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Attendance.java
│   │   ├── TimetableSlot.java
│   │   ├── Exam.java
│   │   ├── Grievance.java
│   │   ├── Notice.java
│   │   └── UserProfile.java
│   ├── enums/
│   │   ├── Role.java
│   │   ├── GrievanceStatus.java
│   │   └── Priority.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── AttendanceRepository.java
│   │   ├── TimetableRepository.java
│   │   ├── ExamRepository.java
│   │   ├── GrievanceRepository.java
│   │   └── NoticeRepository.java
│   ├── security/
│   │   ├── JwtUtil.java
│   │   ├── JwtAuthFilter.java
│   │   └── CustomUserDetailsService.java
│   └── service/
│       ├── AuthService.java
│       ├── AttendanceService.java
│       ├── TimetableService.java
│       ├── ExamService.java
│       ├── GrievanceService.java
│       ├── NoticeService.java
│       ├── GeminiAIService.java
│       ├── ChatBotService.java
│       └── StatisticsService.java
├── src/main/resources/
│   ├── application.properties
│   └── data.sql                         ← seed data
└── pom.xml
```

### 1.4 Configure `application.properties`

```properties
# ===== MySQL =====
spring.datasource.url=jdbc:mysql://localhost:3306/student_connect_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ===== JPA / Hibernate =====
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ===== JWT =====
jwt.secret=YourSuperSecretKeyAtLeast256BitsLongForHS256Algorithm
jwt.expiration=86400000

# ===== Google Gemini AI =====
gemini.api.key=YOUR_GEMINI_API_KEY
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

# ===== Server =====
server.port=8080

# ===== CORS =====
app.cors.allowed-origins=http://localhost:5173
```

---

## Phase 2 — MySQL Database Design

### 2.1 Create the Database

```sql
CREATE DATABASE IF NOT EXISTS student_connect_db;
USE student_connect_db;
```

### 2.2 Complete Schema (8 Tables)

```sql
-- ========== 1. USERS ==========
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,          -- BCrypt hashed
    role ENUM('STUDENT', 'PARENT', 'FACULTY', 'ADMIN') NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    course VARCHAR(100),
    student_id VARCHAR(20),                  -- e.g., '12102030'
    dob DATE,
    photo_url VARCHAR(255) DEFAULT '/images/profile-1.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========== 2. PARENT-STUDENT LINK ==========
CREATE TABLE parent_student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES users(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- ========== 3. ATTENDANCE ==========
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    total_lectures INT DEFAULT 0,
    attended_lectures INT DEFAULT 0,
    icon VARCHAR(50),                        -- Material icon name
    color VARCHAR(50),                       -- CSS variable name
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- ========== 4. TIMETABLE ==========
CREATE TABLE timetable_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    day_of_week INT NOT NULL,                -- 0=Sunday ... 6=Saturday
    time_slot VARCHAR(30) NOT NULL,          -- '9:00 - 10:00'
    room_number VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    slot_type VARCHAR(20),                   -- 'Lecture', 'Lab', 'Tutorial'
    course VARCHAR(100),                     -- 'BTech CSE' filter
    semester INT
);

-- ========== 5. EXAMS ==========
CREATE TABLE exams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exam_date DATE NOT NULL,
    subject VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(30) NOT NULL,
    exam_type VARCHAR(30) DEFAULT 'Mid-Term',
    course VARCHAR(100),
    semester INT
);

-- ========== 6. GRIEVANCES ==========
CREATE TABLE grievances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sender_id BIGINT NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    sender_role ENUM('STUDENT', 'PARENT', 'FACULTY', 'ADMIN') NOT NULL,
    status ENUM('PENDING', 'RESOLVED') DEFAULT 'PENDING',
    resolved_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id)
);

-- ========== 7. NOTICES ==========
CREATE TABLE notices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    summary TEXT,                             -- AI-generated
    category VARCHAR(30),                    -- AI-determined: 'Exam', 'Academic', etc.
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'LOW',  -- AI-determined
    audience ENUM('STUDENT', 'PARENT', 'FACULTY', 'ALL') NOT NULL,
    author_id BIGINT NOT NULL,
    author_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- ========== 8. CHAT HISTORY (optional) ==========
CREATE TABLE chat_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2.3 Seed Data (`data.sql`)

```sql
-- Default Admin
INSERT INTO users (name, email, password, role, student_id, course) VALUES
('Admin', 'admin@university.edu', '$2a$10$...bcrypt_hash...', 'ADMIN', 'A-0001', 'University Administration');

-- Sample Student
INSERT INTO users (name, email, password, role, student_id, course) VALUES
('Alex Mercer', 'alex@gmail.com', '$2a$10$...bcrypt_hash...', 'STUDENT', '12102030', 'BTech. CSE');

-- Sample Parent
INSERT INTO users (name, email, password, role, student_id, course) VALUES
('Mr. Mercer', 'mercer.parent@gmail.com', '$2a$10$...bcrypt_hash...', 'PARENT', 'P-20301', 'Parent of Alex Mercer');

-- Sample Faculty
INSERT INTO users (name, email, password, role, student_id, course) VALUES
('Dr. Sarah Jenkins', 'sarah.jenkins@university.edu', '$2a$10$...bcrypt_hash...', 'FACULTY', 'F-1001', 'Dept. of CSE');

-- Attendance for Alex
INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color) VALUES
(2, 'Engineering Graphics', 14, 12, 'architecture', 'var(--color-primary)'),
(2, 'Mathematical Engineering', 29, 27, 'functions', 'var(--color-danger)'),
(2, 'Computer Architecture', 30, 27, 'computer', 'var(--color-success)'),
(2, 'Database Management', 25, 24, 'dns', 'var(--color-danger)'),
(2, 'Network Security', 27, 25, 'router', 'var(--color-primary)');

-- Timetable (Monday example)
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester) VALUES
(1, '9:00 - 10:00', '101', 'Engineering Graphics', 'Lecture', 'BTech CSE', 3),
(1, '10:00 - 11:00', '102', 'Mathematical Engineering', 'Lecture', 'BTech CSE', 3),
(1, '11:00 - 12:00', '103', 'Computer Architecture', 'Lecture', 'BTech CSE', 3),
(1, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3),
(1, '1:00 - 2:00', 'Lab 1', 'Database Management', 'Lab', 'BTech CSE', 3),
(1, '2:00 - 3:00', 'Lab 1', 'Database Management', 'Lab', 'BTech CSE', 3);
-- ... repeat for Tuesday–Friday (copy from timetable.js)

-- Exams
INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course) VALUES
('2026-06-01', 'Engineering Graphics', '09:00', '12:00', 'Hall A', 'Mid-Term', 'BTech CSE'),
('2026-06-03', 'Mathematical Engineering', '09:00', '12:00', 'Hall B', 'Mid-Term', 'BTech CSE'),
('2026-06-05', 'Computer Architecture', '14:00', '17:00', 'Hall A', 'Mid-Term', 'BTech CSE'),
('2026-06-07', 'Database Management', '09:00', '12:00', 'Hall C', 'Mid-Term', 'BTech CSE'),
('2026-06-09', 'Network Security', '14:00', '17:00', 'Hall B', 'Mid-Term', 'BTech CSE');

-- Notices (same as your noticeService.js SEED_DATA)
INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name) VALUES
('Mid-Term Examinations Instructions', 'All students must carry...', 'Critical guidelines...', 'Exam', 'HIGH', 'STUDENT', 1, 'Controller of Examinations'),
('Hackathon 2026 Registration Open', 'Registrations are now...', 'Annual Hackathon...', 'Co-curricular', 'MEDIUM', 'STUDENT', 1, 'Student Hackathon Club');
-- ... add all 6 notices from noticeService.js

-- Grievances (same as grievanceService.js SEED_DATA)
INSERT INTO grievances (title, description, sender_id, sender_name, sender_role, status) VALUES
('Wi-Fi connection is extremely slow in Hostel Block C', 'We are unable to access...', 2, 'Alex Mercer', 'STUDENT', 'PENDING'),
('DBMS Lecture slides not uploaded', 'Can you upload Lab 3-5 DBMS guides?...', 2, 'Alex Mercer', 'STUDENT', 'PENDING'),
('Request to check attendance error in Engineering Graphics', 'I was marked absent on May 20th...', 3, 'Mr. Mercer (Parent)', 'PARENT', 'PENDING');
```

---

## Phase 3 — Authentication & Security (JWT)

This replaces the current `useAuth.jsx` localStorage mock with real JWT token-based auth.

### 3.1 Key Files to Create

#### `entity/User.java`
```java
@Entity
@Table(name = "users")
@Data @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String phone;
    private String address;
    private String course;
    private String studentId;
    private String photoUrl;
}
```

#### `security/JwtUtil.java`
```java
@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String email, String role, String name) {
        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .claim("name", name)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }
    // + validateToken(), extractEmail(), extractRole() methods
}
```

#### `controller/AuthController.java`
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/signup")   // ← replaces Signup.jsx mock
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest req) { ... }

    @PostMapping("/login")    // ← replaces Login.jsx mock
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) { ... }
}
```

### 3.2 API Endpoints

| Method | Endpoint | Request Body | Response | Maps to Frontend |
|--------|----------|-------------|----------|-----------------|
| `POST` | `/api/auth/signup` | `{ name, email, password, role }` | `{ token, role, name }` | [Signup.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Signup.jsx) |
| `POST` | `/api/auth/login` | `{ email, password, role }` | `{ token, role, name }` | [Login.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Login.jsx) |
| `PUT` | `/api/users/password` | `{ currentPassword, newPassword }` | `{ message }` | [Password.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Password.jsx) |
| `GET` | `/api/users/profile` | — | `{ name, email, phone, ... }` | [Settings.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Settings.jsx) |
| `PUT` | `/api/users/profile` | `{ email, phone }` | `{ message }` | [Settings.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Settings.jsx) |

### 3.3 CORS Configuration

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")  // Vite dev server
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

---

## Phase 4 — Core REST APIs (Data Features)

### 4.1 Attendance API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/attendance/{studentId}` | Get all subjects + attended/total | [student/Dashboard.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Dashboard.jsx) |
| `PUT` | `/api/attendance/{id}` | Update attendance (faculty use) | Admin/Faculty |

**Replaces**: The hardcoded `subjects` array in `student/Dashboard.jsx`.

---

### 4.2 Timetable API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/timetable?day={0-6}` | Get timetable for a specific day | [student/Timetable.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Timetable.jsx), [parent/Timetable.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/parent/Timetable.jsx) |
| `POST` | `/api/timetable` | Create new slot (admin) | Admin panel |
| `DELETE` | `/api/timetable/{id}` | Delete a slot (admin) | Admin panel |

**Replaces**: The hardcoded arrays in [timetable.js](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/data/timetable.js).

---

### 4.3 Exam Schedule API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/exams` | Get all upcoming exams | [student/Exam.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Exam.jsx), [parent/Exam.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/parent/Exam.jsx) |
| `POST` | `/api/exams` | Create exam entry (admin) | Admin panel |

**Replaces**: The hardcoded `examSchedule` array.

---

### 4.4 Grievance API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/grievances` | Get all grievances (admin/faculty) | [admin/Dashboard.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/Dashboard.jsx), [admin/Queries.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/Queries.jsx) |
| `GET` | `/api/grievances/my` | Get logged-in user's grievances | [student/Grievances.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Grievances.jsx), [parent/Grievances.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/parent/Grievances.jsx) |
| `POST` | `/api/grievances` | Submit new grievance | [student/Grievances.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Grievances.jsx) |
| `PUT` | `/api/grievances/{id}/resolve` | Mark as resolved (admin/faculty) | [admin/Queries.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/Queries.jsx) |

**Replaces**: The entire [grievanceService.js](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/services/grievanceService.js) localStorage implementation.

---

### 4.5 Notice API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/notices?audience={role}` | Get notices filtered by audience | [student/Notices.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Notices.jsx), [parent/Notices.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/parent/Notices.jsx) |
| `POST` | `/api/notices` | Create notice (admin/faculty) | [admin/NoticeBuilder.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/NoticeBuilder.jsx) |
| `POST` | `/api/notices/analyze` | AI-analyze title + body → category, priority, summary | [admin/NoticeBuilder.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/NoticeBuilder.jsx) (AI Analysis Preview) |

**Replaces**: The entire [noticeService.js](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/services/noticeService.js) localStorage + mock `analyzeNotice()`.

---

### 4.6 Admin Stats API

| Method | Endpoint | Description | Frontend |
|--------|----------|-------------|----------|
| `GET` | `/api/admin/stats` | `{ totalStudents, totalFaculty, pendingGrievances }` | [admin/Dashboard.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/Dashboard.jsx) |

**Replaces**: The hardcoded `totalStudents = 1420` and `totalFaculty = 86`.

---

## Phase 5 — AI Integration (Google Gemini Free API)

### 5.1 Get Your Free API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **"Create API Key"**
3. Copy the key and paste it into `application.properties` as `gemini.api.key`

> [!IMPORTANT]
> Google Gemini offers a **free tier** with generous limits:
> - **Gemini 2.0 Flash**: 15 RPM (requests per minute), 1 million TPM (tokens per minute), 1,500 RPD (requests per day)
> - This is more than enough for a university portal with moderate traffic

### 5.2 Add Maven Dependency for HTTP Calls

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

### 5.3 `GeminiAIService.java` — Core AI Service

```java
@Service
public class GeminiAIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient = WebClient.create();

    /**
     * Used by: Notice Builder (AI Analysis Preview)
     * Replaces: analyzeNotice() in noticeService.js
     */
    public NoticeAnalysisResponse analyzeNotice(String title, String body) {
        String prompt = """
            Analyze this university notice and return JSON:
            {
              "category": one of [Exam, Academic, Co-curricular, General],
              "priority": one of [High, Medium, Low],
              "summary": a 1-2 sentence summary (max 120 chars)
            }

            Title: %s
            Body: %s
            """.formatted(title, body);

        String aiResponse = callGemini(prompt);
        // Parse JSON from response
        return parseAnalysis(aiResponse);
    }

    /**
     * Used by: ChatBot component
     * Replaces: getChatResponse() in ChatBot.jsx
     */
    public String chat(String userMessage, String role, String userName) {
        String systemContext = """
            You are a helpful AI assistant for a University Management System (UMS).
            The user's role is: %s
            The user's name is: %s
            You can help with: exam dates, timetable info, attendance queries,
            grievance status, notice info, and general academic guidance.
            Keep responses concise (2-3 sentences max).
            """.formatted(role, userName);

        String prompt = systemContext + "\nUser: " + userMessage;
        return callGemini(prompt);
    }

    /**
     * Used by: Statistics page (NL → SQL)
     * Replaces: hardcoded mock in Statistics.jsx
     */
    public Map<String, Object> naturalLanguageToSQL(String userPrompt) {
        String prompt = """
            You are a SQL generator for a university database with these tables:
            - users (id, name, email, role, student_id, course)
            - attendance (student_id, subject, total_lectures, attended_lectures)
            - exams (exam_date, subject, start_time, end_time, room)
            - grievances (title, description, sender_name, status)
            - notices (title, body, category, priority, audience)

            Convert this natural language query to MySQL:
            "%s"

            Return ONLY a JSON object: { "sql": "SELECT ..." }
            Only generate SELECT queries. Never generate UPDATE/DELETE/DROP.
            """.formatted(userPrompt);

        String aiResponse = callGemini(prompt);
        // Parse SQL, execute safely, return results
        return Map.of("sql", parseSql(aiResponse));
    }

    private String callGemini(String prompt) {
        String url = apiUrl + "?key=" + apiKey;

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of(
                "parts", List.of(Map.of("text", prompt))
            ))
        );

        String response = webClient.post()
            .uri(url)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(String.class)
            .block();

        // Extract text from Gemini response JSON
        return extractTextFromResponse(response);
    }
}
```

### 5.4 Three AI Features — Summary

| AI Feature | Frontend Component | Backend Endpoint | Gemini Prompt Type |
|---|---|---|---|
| **Notice Analyzer** | [NoticeBuilder.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/NoticeBuilder.jsx) → AI Analysis Preview panel | `POST /api/notices/analyze` | Classify → `{ category, priority, summary }` |
| **ChatBot** | [ChatBot.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/components/ChatBot/ChatBot.jsx) → AI Study Assistant | `POST /api/chat` | Conversational with role context |
| **NL → SQL** | [Statistics.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Statistics.jsx) → Prompt to SQL Generator | `POST /api/statistics/query` | Generate safe SELECT SQL → execute → return rows |

> [!WARNING]
> **NL → SQL Safety**: The backend must validate that Gemini only generates `SELECT` statements. Never execute `INSERT`, `UPDATE`, `DELETE`, or `DROP` from AI-generated SQL. Use a read-only database connection for this feature.

---

## Phase 6 — Frontend Integration (Modify React)

### 6.1 Create API Helper — `src/services/api.js`

```javascript
const API_BASE = 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('jwt_token');
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (res.status === 401) {
    localStorage.removeItem('jwt_token');
    window.location.href = '/login';
    return;
  }

  return res.json();
}

export const api = {
  // Auth
  login: (data) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),

  // Attendance
  getAttendance: (studentId) => apiRequest(`/attendance/${studentId}`),

  // Timetable
  getTimetable: (day) => apiRequest(`/timetable?day=${day}`),

  // Exams
  getExams: () => apiRequest('/exams'),

  // Grievances
  getMyGrievances: () => apiRequest('/grievances/my'),
  getAllGrievances: () => apiRequest('/grievances'),
  submitGrievance: (data) => apiRequest('/grievances', { method: 'POST', body: JSON.stringify(data) }),
  resolveGrievance: (id) => apiRequest(`/grievances/${id}/resolve`, { method: 'PUT' }),

  // Notices
  getNotices: (audience) => apiRequest(`/notices?audience=${audience}`),
  createNotice: (data) => apiRequest('/notices', { method: 'POST', body: JSON.stringify(data) }),
  analyzeNotice: (data) => apiRequest('/notices/analyze', { method: 'POST', body: JSON.stringify(data) }),

  // ChatBot
  chat: (data) => apiRequest('/chat', { method: 'POST', body: JSON.stringify(data) }),

  // Statistics
  queryStats: (data) => apiRequest('/statistics/query', { method: 'POST', body: JSON.stringify(data) }),

  // Profile
  getProfile: () => apiRequest('/users/profile'),
  updateProfile: (data) => apiRequest('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (data) => apiRequest('/users/password', { method: 'PUT', body: JSON.stringify(data) }),

  // Admin
  getAdminStats: () => apiRequest('/admin/stats'),
};
```

### 6.2 Update `useAuth.jsx` — Store JWT Token

```javascript
// Key changes:
const login = async (email, password, role) => {
  const res = await api.login({ email, password, role });
  localStorage.setItem('jwt_token', res.token);
  setUser({ role: res.role, name: res.name });
};

const logout = () => {
  localStorage.removeItem('jwt_token');
  setUser(null);
};
```

### 6.3 Files to Modify (Summary)

| Frontend File | What Changes |
|---|---|
| [useAuth.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/hooks/useAuth.jsx) | Replace localStorage mock → call `/api/auth/*` |
| [Login.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Login.jsx) | Call `api.login()` instead of direct `login(role, name)` |
| [Signup.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Signup.jsx) | Call `api.signup()` instead of direct `login(role, name)` |
| [student/Dashboard.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Dashboard.jsx) | `useEffect` → `api.getAttendance()` instead of hardcoded array |
| [student/Timetable.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Timetable.jsx) | `useEffect` → `api.getTimetable(day)` instead of static import |
| [student/Exam.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Exam.jsx) | `useEffect` → `api.getExams()` instead of hardcoded array |
| [student/Grievances.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Grievances.jsx) | Replace `grievanceService` imports → `api.getMyGrievances()`, `api.submitGrievance()` |
| [student/Notices.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/student/Notices.jsx) | Replace `noticeService` imports → `api.getNotices('student')` |
| [admin/Dashboard.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/Dashboard.jsx) | `api.getAdminStats()` + `api.getAllGrievances()` |
| [admin/NoticeBuilder.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/admin/NoticeBuilder.jsx) | Replace `analyzeNotice()` → `api.analyzeNotice()` (real AI) |
| [ChatBot.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/components/ChatBot/ChatBot.jsx) | Replace `getChatResponse()` → `api.chat()` (real AI) |
| [Statistics.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Statistics.jsx) | Replace mock switch → `api.queryStats()` (real NL→SQL) |
| [Settings.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Settings.jsx) | `api.getProfile()` / `api.updateProfile()` |
| [Password.jsx](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/pages/Password.jsx) | `api.changePassword()` |
| [grievanceService.js](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/services/grievanceService.js) | **Delete** (replaced by `api.js`) |
| [noticeService.js](file:///c:/Users/jayde/OneDrive/Desktop/Ai-Based%20Student-Connect%20portal/src/services/noticeService.js) | **Delete** (replaced by `api.js`) |

---

## Phase 7 — Step-by-Step Build Order

> [!TIP]
> Build in this exact order. Each step builds on the previous one. Test each API with Postman before moving to the next.

### Step 1: Skeleton + Database (Day 1)
- [ ] Install JDK 17, MySQL 8, IntelliJ IDEA
- [ ] Generate Spring Boot project from [start.spring.io](https://start.spring.io)
- [ ] Configure `application.properties` (MySQL + port 8080)
- [ ] Create `User` entity + `UserRepository`
- [ ] Run the app → confirm Hibernate creates the `users` table
- [ ] Run the full SQL schema to create remaining tables
- [ ] Insert seed data

### Step 2: Authentication (Day 2)
- [ ] Add `jjwt` dependency to `pom.xml`:
  ```xml
  <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-api</artifactId>
      <version>0.12.6</version>
  </dependency>
  <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-impl</artifactId>
      <version>0.12.6</version>
      <scope>runtime</scope>
  </dependency>
  <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-jackson</artifactId>
      <version>0.12.6</version>
      <scope>runtime</scope>
  </dependency>
  ```
- [ ] Create `JwtUtil`, `JwtAuthFilter`, `SecurityConfig`
- [ ] Create `AuthController` with `/signup` and `/login`
- [ ] Create `CorsConfig` to allow `http://localhost:5173`
- [ ] **Test**: Postman → `POST /api/auth/signup` → get JWT token
- [ ] **Test**: Postman → `POST /api/auth/login` → verify token works

### Step 3: Attendance + Timetable + Exam APIs (Day 3)
- [ ] Create entities: `Attendance`, `TimetableSlot`, `Exam`
- [ ] Create repositories: `AttendanceRepository`, `TimetableRepository`, `ExamRepository`
- [ ] Create services + controllers for all three
- [ ] **Test**: `GET /api/attendance/2` returns Alex's 5 subjects
- [ ] **Test**: `GET /api/timetable?day=1` returns Monday schedule
- [ ] **Test**: `GET /api/exams` returns 5 exam entries

### Step 4: Grievance + Notice APIs (Day 4)
- [ ] Create entities: `Grievance`, `Notice`
- [ ] Create repositories + services + controllers
- [ ] Implement role-based filtering (students see their own, admin sees all)
- [ ] **Test**: `POST /api/grievances` → create a grievance
- [ ] **Test**: `PUT /api/grievances/1/resolve` → mark resolved
- [ ] **Test**: `GET /api/notices?audience=student` → filtered results

### Step 5: AI Integration — Gemini API (Day 5)
- [ ] Get free API key from [Google AI Studio](https://aistudio.google.com/apikey)
- [ ] Add `spring-boot-starter-webflux` to `pom.xml`
- [ ] Create `GeminiAIService` with `callGemini()` method
- [ ] Implement `POST /api/notices/analyze` → AI categorization
- [ ] Implement `POST /api/chat` → AI chatbot
- [ ] Implement `POST /api/statistics/query` → NL-to-SQL
- [ ] **Test**: Postman → send notice text → get AI category/priority/summary
- [ ] **Test**: Postman → send chat message → get AI response

### Step 6: User Profile + Admin Stats (Day 6)
- [ ] Create `UserController` with profile CRUD + password change
- [ ] Create `AdminController` with `getStats()` (`COUNT` queries)
- [ ] **Test**: `GET /api/users/profile` → returns user info
- [ ] **Test**: `GET /api/admin/stats` → returns real counts

### Step 7: Frontend Integration (Day 7-8)
- [ ] Create `src/services/api.js` in the React project
- [ ] Update `useAuth.jsx` to use JWT tokens
- [ ] Update `Login.jsx` and `Signup.jsx` to call backend
- [ ] Replace all hardcoded data pages with `useEffect` + API calls
- [ ] Replace `grievanceService.js` and `noticeService.js` with API calls
- [ ] Update `ChatBot.jsx` to call `/api/chat`
- [ ] Update `Statistics.jsx` to call `/api/statistics/query`
- [ ] **Test**: Full end-to-end flow in browser

### Step 8: Polish + Deploy (Day 9-10)
- [ ] Add loading spinners for API calls
- [ ] Add error handling / toast notifications
- [ ] Add input validation (both frontend + backend)
- [ ] Test all 4 roles end-to-end
- [ ] Build production frontend: `npm run build`
- [ ] Package Spring Boot: `mvn clean package`
- [ ] Deploy (options below)

---

## Phase 8 — Deployment Options

| Option | Cost | Difficulty | Best For |
|--------|------|-----------|----------|
| **Local only** | Free | Easy | Development/Demo |
| **Railway.app** | Free tier | Easy | Quick cloud deploy |
| **Render.com** | Free tier | Easy | Spring Boot + MySQL |
| **AWS Free Tier** | Free 12 months | Medium | Production-ready |
| **Docker Compose** | Free (local) | Medium | Reproducible setup |

### Docker Compose Example

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: student_connect_db
    ports:
      - "3306:3306"

  backend:
    build: ./student-connect-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/student_connect_db

  frontend:
    build: ./Ai-Based Student-Connect portal
    ports:
      - "5173:80"
```

---

## Complete API Reference (All 15 Endpoints)

| # | Method | Endpoint | Auth | Role(s) | Purpose |
|---|--------|----------|------|---------|---------|
| 1 | `POST` | `/api/auth/signup` | ❌ | Any | Register new user |
| 2 | `POST` | `/api/auth/login` | ❌ | Any | Login → JWT token |
| 3 | `GET` | `/api/users/profile` | ✅ | Any | Get own profile |
| 4 | `PUT` | `/api/users/profile` | ✅ | Any | Update email/phone |
| 5 | `PUT` | `/api/users/password` | ✅ | Any | Change password |
| 6 | `GET` | `/api/attendance/{studentId}` | ✅ | Student, Parent | Attendance records |
| 7 | `GET` | `/api/timetable?day={0-6}` | ✅ | Student, Parent | Day's schedule |
| 8 | `GET` | `/api/exams` | ✅ | Student, Parent | Exam schedule |
| 9 | `GET` | `/api/grievances/my` | ✅ | Student, Parent | Own grievances |
| 10 | `GET` | `/api/grievances` | ✅ | Admin, Faculty | All grievances |
| 11 | `POST` | `/api/grievances` | ✅ | Student, Parent | Submit grievance |
| 12 | `PUT` | `/api/grievances/{id}/resolve` | ✅ | Admin, Faculty | Resolve grievance |
| 13 | `GET` | `/api/notices?audience={role}` | ✅ | Any | Filtered notices |
| 14 | `POST` | `/api/notices` | ✅ | Admin, Faculty | Create notice |
| 15 | `POST` | `/api/notices/analyze` | ✅ | Admin, Faculty | AI analyze notice |
| 16 | `POST` | `/api/chat` | ✅ | Any | AI chatbot |
| 17 | `POST` | `/api/statistics/query` | ✅ | Admin | NL → SQL query |
| 18 | `GET` | `/api/admin/stats` | ✅ | Admin | Dashboard stats |

---

## Open Questions

> [!IMPORTANT]
> 1. **Do you want me to build the Spring Boot backend project for you?** I can generate all the Java files, or you can follow the roadmap manually.
> 2. **Do you already have MySQL installed**, or do you need help setting it up on Windows?
> 3. **Have you used Spring Boot / Java before**, or should I include more detailed explanations in each step?
> 4. **For the parent-student link**: Should a parent be able to see attendance/grades for multiple children, or just one?
