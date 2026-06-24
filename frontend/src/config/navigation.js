// Single source of truth for all role-based navigation.
// To add/remove/reorder nav items for ANY role, edit ONLY this file.

export const NAV_CONFIG = {
  student: [
    { label: 'Home', icon: 'home', path: '/student' },
    { label: 'Time Table', icon: 'today', path: '/student/timetable' },
    { label: 'Grievances', icon: 'question_answer', path: '/student/grievances' },
    { label: 'Notices', icon: 'campaign', path: '/student/notices' },
    { label: 'Examination', icon: 'grid_view', path: '/student/exam' },
  ],
  parent: [
    { label: 'Home', icon: 'home', path: '/parent' },
    { label: 'Time Table', icon: 'today', path: '/parent/timetable' },
    { label: 'Examination', icon: 'grid_view', path: '/parent/exam' },
    { label: 'Grievances', icon: 'question_answer', path: '/parent/grievances' },
    { label: 'Notices', icon: 'campaign', path: '/parent/notices' },
  ],
  faculty: [
    { label: 'Home', icon: 'home', path: '/faculty' },
  ],
  admin: [
    { label: 'Home', icon: 'home', path: '/admin' },
    { label: 'Queries', icon: 'question_answer', path: '/admin/queries' },
    { label: 'Notice Builder', icon: 'campaign', path: '/admin/notices' },
    { label: 'ChatBot', icon: 'smart_toy', path: '/admin/chatbot' },
  ],
};

// Role display names
export const ROLE_LABELS = {
  student: 'Student',
  parent: 'Parent',
  faculty: 'Faculty',
  admin: 'Administrator',
};

// Default profile data per role
export const DEFAULT_PROFILES = {
  student: {
    name: 'Alex',
    id: '12102030',
    course: 'BTech. Computer Science & Engineering',
    dob: '29-Feb-2020',
    contact: '1234567890',
    email: 'alex@gmail.com',
    address: 'Ghost town Road, New York, America',
    photo: '/images/profile-1.jpg',
  },
  parent: {
    name: 'Mr. Mercer',
    id: 'P-20301',
    course: 'Parent of Alex Mercer (BTech CSE)',
    dob: '',
    contact: '9876543210',
    email: 'mercer.parent@gmail.com',
    address: 'Ghost town Road, New York, America',
    photo: '/images/profile-1.jpg',
  },
  faculty: {
    name: 'Dr. Sarah Jenkins',
    id: 'F-1001',
    course: 'Dept. of Computer Science & Engineering',
    dob: '',
    contact: '5551234567',
    email: 'sarah.jenkins@university.edu',
    address: 'Faculty Block A, University Campus',
    photo: '/images/profile-1.jpg',
  },
  admin: {
    name: 'Admin',
    id: 'A-0001',
    course: 'University Administration',
    dob: '',
    contact: '5559876543',
    email: 'admin@university.edu',
    address: 'Admin Block, University Campus',
    photo: '/images/profile-1.jpg',
  },
};
