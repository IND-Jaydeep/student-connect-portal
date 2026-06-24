import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import Password from './pages/Password';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentTimetable from './pages/student/Timetable';
import StudentExam from './pages/student/Exam';
import StudentGrievances from './pages/student/Grievances';
import StudentNotices from './pages/student/Notices';
import StudentCreateNotice from './pages/student/CreateNotice';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ParentTimetable from './pages/parent/Timetable';
import ParentExam from './pages/parent/Exam';
import ParentGrievances from './pages/parent/Grievances';
import ParentNotices from './pages/parent/Notices';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminQueries from './pages/admin/Queries';
import AdminNoticeBuilder from './pages/admin/NoticeBuilder';
import AdminChatBot from './pages/admin/ChatBotPage';

// Route guard
import ProtectedRoute from './components/common/ProtectedRoute';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Root redirect */}
      <Route path="/" element={
        user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
      } />

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/timetable" element={<ProtectedRoute role="student"><StudentTimetable /></ProtectedRoute>} />
      <Route path="/student/exam" element={<ProtectedRoute role="student"><StudentExam /></ProtectedRoute>} />
      <Route path="/student/grievances" element={<ProtectedRoute role="student"><StudentGrievances /></ProtectedRoute>} />
      <Route path="/student/notices" element={<ProtectedRoute role="student"><StudentNotices /></ProtectedRoute>} />
      <Route path="/student/notices/create" element={<ProtectedRoute role="student"><StudentCreateNotice /></ProtectedRoute>} />

      {/* Parent Routes */}
      <Route path="/parent" element={<ProtectedRoute role="parent"><ParentDashboard /></ProtectedRoute>} />
      <Route path="/parent/timetable" element={<ProtectedRoute role="parent"><ParentTimetable /></ProtectedRoute>} />
      <Route path="/parent/exam" element={<ProtectedRoute role="parent"><ParentExam /></ProtectedRoute>} />
      <Route path="/parent/grievances" element={<ProtectedRoute role="parent"><ParentGrievances /></ProtectedRoute>} />
      <Route path="/parent/notices" element={<ProtectedRoute role="parent"><ParentNotices /></ProtectedRoute>} />

      {/* Faculty Routes */}
      <Route path="/faculty" element={<ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/queries" element={<ProtectedRoute role="admin"><AdminQueries /></ProtectedRoute>} />
      <Route path="/admin/notices" element={<ProtectedRoute role="admin"><AdminNoticeBuilder /></ProtectedRoute>} />
      <Route path="/admin/chatbot" element={<ProtectedRoute role="admin"><AdminChatBot /></ProtectedRoute>} />

      {/* Shared Routes (accessible by any logged-in user) */}
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
      <Route path="/password" element={<ProtectedRoute><Password /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
