-- =============================================
-- Student-Connect Portal — Seed Data
-- Only inserts if tables are empty
-- =============================================

-- Default Admin (password: admin123)
INSERT INTO users (name, email, password, role, student_id, course, photo_url, created_at, updated_at)
SELECT 'Admin', 'admin@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 'A-0001', 'University Administration', '/images/profile-1.jpg', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@university.edu');

-- Sample Student — Alex Mercer (password: student123)
INSERT INTO users (name, email, password, role, student_id, course, phone, photo_url, created_at, updated_at)
SELECT 'Alex Mercer', 'alex@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', '12102030', 'BTech. CSE', '9876543210', '/images/profile-1.jpg', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alex@gmail.com');

-- Sample Parent — Mr. Mercer (password: parent123)
INSERT INTO users (name, email, password, role, student_id, course, photo_url, created_at, updated_at)
SELECT 'Mr. Mercer', 'mercer.parent@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'PARENT', 'P-20301', 'Parent of Alex Mercer', '/images/profile-1.jpg', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'mercer.parent@gmail.com');

-- Sample Faculty — Dr. Sarah Jenkins (password: faculty123)
INSERT INTO users (name, email, password, role, student_id, course, photo_url, created_at, updated_at)
SELECT 'Dr. Sarah Jenkins', 'sarah.jenkins@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'FACULTY', 'F-1001', 'Dept. of CSE', '/images/profile-1.jpg', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sarah.jenkins@university.edu');

-- =============================================
-- Parent-Student Link
-- =============================================
INSERT INTO parent_student (parent_id, student_id)
SELECT 3, 2
WHERE NOT EXISTS (SELECT 1 FROM parent_student WHERE parent_id = 3 AND student_id = 2);

-- =============================================
-- Attendance for Alex (student_id = 2)
-- =============================================
INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color)
SELECT 2, 'Engineering Graphics', 14, 12, 'architecture', 'var(--color-primary)'
WHERE NOT EXISTS (SELECT 1 FROM attendance WHERE student_id = 2 AND subject = 'Engineering Graphics');

INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color)
SELECT 2, 'Mathematical Engineering', 29, 27, 'functions', 'var(--color-danger)'
WHERE NOT EXISTS (SELECT 1 FROM attendance WHERE student_id = 2 AND subject = 'Mathematical Engineering');

INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color)
SELECT 2, 'Computer Architecture', 30, 27, 'computer', 'var(--color-success)'
WHERE NOT EXISTS (SELECT 1 FROM attendance WHERE student_id = 2 AND subject = 'Computer Architecture');

INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color)
SELECT 2, 'Database Management', 25, 24, 'dns', 'var(--color-danger)'
WHERE NOT EXISTS (SELECT 1 FROM attendance WHERE student_id = 2 AND subject = 'Database Management');

INSERT INTO attendance (student_id, subject, total_lectures, attended_lectures, icon, color)
SELECT 2, 'Network Security', 27, 25, 'router', 'var(--color-primary)'
WHERE NOT EXISTS (SELECT 1 FROM attendance WHERE student_id = 2 AND subject = 'Network Security');

-- =============================================
-- Timetable — Monday (day_of_week = 1)
-- =============================================
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '9:00 - 10:00', '101', 'Engineering Graphics', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '9:00 - 10:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '10:00 - 11:00', '102', 'Mathematical Engineering', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '10:00 - 11:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '11:00 - 12:00', '103', 'Computer Architecture', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '11:00 - 12:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '12:00 - 1:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '1:00 - 2:00', 'Lab 1', 'Database Management', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '1:00 - 2:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 1, '2:00 - 3:00', 'Lab 1', 'Database Management', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 1 AND time_slot = '2:00 - 3:00' AND course = 'BTech CSE');

-- Timetable — Tuesday (day_of_week = 2)
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '9:00 - 10:00', '201', 'Database Management', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '9:00 - 10:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '10:00 - 11:00', '202', 'Network Security', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '10:00 - 11:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '11:00 - 12:00', '203', 'Engineering Graphics', 'Tutorial', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '11:00 - 12:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '12:00 - 1:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '1:00 - 2:00', '204', 'Mathematical Engineering', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '1:00 - 2:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 2, '2:00 - 3:00', 'Lab 2', 'Computer Architecture', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 2 AND time_slot = '2:00 - 3:00' AND course = 'BTech CSE');

-- Timetable — Wednesday (day_of_week = 3)
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '9:00 - 10:00', '301', 'Computer Architecture', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '9:00 - 10:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '10:00 - 11:00', '302', 'Network Security', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '10:00 - 11:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '11:00 - 12:00', '303', 'Mathematical Engineering', 'Tutorial', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '11:00 - 12:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '12:00 - 1:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '1:00 - 2:00', 'Lab 3', 'Network Security', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '1:00 - 2:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 3, '2:00 - 3:00', 'Lab 3', 'Network Security', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 3 AND time_slot = '2:00 - 3:00' AND course = 'BTech CSE');

-- Timetable — Thursday (day_of_week = 4)
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '9:00 - 10:00', '101', 'Engineering Graphics', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '9:00 - 10:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '10:00 - 11:00', '102', 'Database Management', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '10:00 - 11:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '11:00 - 12:00', '103', 'Computer Architecture', 'Tutorial', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '11:00 - 12:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '12:00 - 1:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '1:00 - 2:00', '204', 'Mathematical Engineering', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '1:00 - 2:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 4, '2:00 - 3:00', 'Lab 2', 'Engineering Graphics', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 4 AND time_slot = '2:00 - 3:00' AND course = 'BTech CSE');

-- Timetable — Friday (day_of_week = 5)
INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '9:00 - 10:00', '301', 'Network Security', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '9:00 - 10:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '10:00 - 11:00', '302', 'Mathematical Engineering', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '10:00 - 11:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '11:00 - 12:00', '303', 'Database Management', 'Tutorial', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '11:00 - 12:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '12:00 - 1:00', '-', 'Lunch Break', '', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '12:00 - 1:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '1:00 - 2:00', '204', 'Engineering Graphics', 'Lecture', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '1:00 - 2:00' AND course = 'BTech CSE');

INSERT INTO timetable_slots (day_of_week, time_slot, room_number, subject, slot_type, course, semester)
SELECT 5, '2:00 - 3:00', 'Lab 1', 'Computer Architecture', 'Lab', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM timetable_slots WHERE day_of_week = 5 AND time_slot = '2:00 - 3:00' AND course = 'BTech CSE');

-- =============================================
-- Exams
-- =============================================
INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course, semester)
SELECT '2026-07-01', 'Engineering Graphics', '09:00:00', '12:00:00', 'Hall A', 'Mid-Term', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM exams WHERE subject = 'Engineering Graphics' AND exam_type = 'Mid-Term');

INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course, semester)
SELECT '2026-07-03', 'Mathematical Engineering', '09:00:00', '12:00:00', 'Hall B', 'Mid-Term', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM exams WHERE subject = 'Mathematical Engineering' AND exam_type = 'Mid-Term');

INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course, semester)
SELECT '2026-07-05', 'Computer Architecture', '14:00:00', '17:00:00', 'Hall A', 'Mid-Term', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM exams WHERE subject = 'Computer Architecture' AND exam_type = 'Mid-Term');

INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course, semester)
SELECT '2026-07-07', 'Database Management', '09:00:00', '12:00:00', 'Hall C', 'Mid-Term', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM exams WHERE subject = 'Database Management' AND exam_type = 'Mid-Term');

INSERT INTO exams (exam_date, subject, start_time, end_time, room, exam_type, course, semester)
SELECT '2026-07-09', 'Network Security', '14:00:00', '17:00:00', 'Hall B', 'Mid-Term', 'BTech CSE', 3
WHERE NOT EXISTS (SELECT 1 FROM exams WHERE subject = 'Network Security' AND exam_type = 'Mid-Term');

-- =============================================
-- Notices
-- =============================================
INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Mid-Term Examinations Instructions',
       'All students must carry their university ID cards to the examination hall. No electronic devices are permitted. Seating arrangements will be displayed outside the exam halls 30 minutes before the exam. Students arriving more than 15 minutes late will not be allowed to enter.',
       'Critical guidelines for upcoming mid-term exams including ID requirements and timing rules.',
       'Exam', 'HIGH', 'STUDENT', 1, 'Controller of Examinations', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Mid-Term Examinations Instructions');

INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Hackathon 2026 Registration Open',
       'Registrations are now open for the annual University Hackathon 2026. Teams of 2-4 members can register before June 30th. Prizes worth Rs. 1,00,000 to be won! Register at the Student Activities Center or online through the portal.',
       'Annual Hackathon 2026 registration open until June 30th with exciting prizes.',
       'Co-curricular', 'MEDIUM', 'STUDENT', 1, 'Student Hackathon Club', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Hackathon 2026 Registration Open');

INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Library Extended Hours During Exams',
       'The Central Library will remain open from 7 AM to 11 PM during the examination period (July 1-15). Additional reading rooms in Block C will also be available. WiFi access has been upgraded for better connectivity.',
       'Library hours extended to 7 AM - 11 PM during exam period.',
       'Academic', 'MEDIUM', 'STUDENT', 1, 'Chief Librarian', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Library Extended Hours During Exams');

INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Parent-Teacher Meeting Schedule',
       'The semester PTM is scheduled for July 20th, 2026. Parents can book time slots with faculty members through this portal. Meeting will be held in the Main Auditorium from 10 AM to 4 PM.',
       'PTM scheduled for July 20th in Main Auditorium, slot booking available online.',
       'Academic', 'HIGH', 'PARENT', 1, 'Dean of Student Affairs', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Parent-Teacher Meeting Schedule');

INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Faculty Development Workshop',
       'A 3-day workshop on "AI in Education" will be conducted from July 25-27. All faculty members are encouraged to attend. Registration is mandatory through the HR portal by July 15th.',
       'AI in Education workshop for faculty from July 25-27, registration by July 15th.',
       'Academic', 'MEDIUM', 'FACULTY', 1, 'Director IQAC', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Faculty Development Workshop');

INSERT INTO notices (title, body, summary, category, priority, audience, author_id, author_name, created_at)
SELECT 'Campus Maintenance Notice',
       'Scheduled maintenance of the electrical systems in Blocks A and B will take place on June 28th from 6 AM to 12 PM. Power supply will be temporarily disrupted. All departments are requested to plan accordingly.',
       'Power disruption in Blocks A & B on June 28th for scheduled maintenance.',
       'General', 'LOW', 'STUDENT', 1, 'Estate Office', NOW()
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title = 'Campus Maintenance Notice');

-- =============================================
-- Grievances
-- =============================================
INSERT INTO grievances (title, description, sender_id, sender_name, sender_role, status, created_at)
SELECT 'Wi-Fi connection is extremely slow in Hostel Block C',
       'We are unable to access online study materials and attend live lectures due to extremely poor Wi-Fi connectivity in Hostel Block C. This has been an issue for the past two weeks. Kindly look into this urgently.',
       2, 'Alex Mercer', 'STUDENT', 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM grievances WHERE title = 'Wi-Fi connection is extremely slow in Hostel Block C');

INSERT INTO grievances (title, description, sender_id, sender_name, sender_role, status, created_at)
SELECT 'DBMS Lecture slides not uploaded',
       'Can you upload Lab 3-5 DBMS guides? The practical exam is approaching and we need the reference materials. The slides from last three lectures are also missing from the portal.',
       2, 'Alex Mercer', 'STUDENT', 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM grievances WHERE title = 'DBMS Lecture slides not uploaded');

INSERT INTO grievances (title, description, sender_id, sender_name, sender_role, status, created_at)
SELECT 'Request to check attendance error in Engineering Graphics',
       'I was marked absent on May 20th and May 22nd in Engineering Graphics, but my son Alex was present in class on both days. He has confirmed this with his classmates. Please review and correct the attendance records.',
       3, 'Mr. Mercer', 'PARENT', 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM grievances WHERE title = 'Request to check attendance error in Engineering Graphics');
