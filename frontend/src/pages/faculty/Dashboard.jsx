import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/Layout/Layout';
import ChatBot from '../../components/ChatBot/ChatBot';

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <Layout gridSpan>
      <h1>Faculty Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Welcome, {user?.name || 'Dr. Jenkins'}</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <ChatBot greeting={`Hello Dr. ${user?.name || 'Jenkins'}! I can help with syllabus updates, meeting schedules, or notice publishing.`} />
      </div>
    </Layout>
  );
}
