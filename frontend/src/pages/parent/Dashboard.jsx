import Layout from '../../components/Layout/Layout';
import ChatBot from '../../components/ChatBot/ChatBot';
import { useAuth } from '../../hooks/useAuth';

const childAttendance = [
  { subject: 'Engineering Graphics', attended: '12/14', percentage: '85.7%' },
  { subject: 'Mathematical Engineering', attended: '27/29', percentage: '93.1%' },
  { subject: 'Computer Architecture', attended: '27/30', percentage: '90.0%' },
  { subject: 'Database Management', attended: '24/25', percentage: '96.0%' },
  { subject: 'Network Security', attended: '25/27', percentage: '92.6%' },
];

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <Layout gridSpan>
      <h1>Child's Academic Overview</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Monitor your child's attendance and performance</p>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Lectures Attended</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {childAttendance.map((sub, i) => (
              <tr key={i}>
                <td>{sub.subject}</td>
                <td>{sub.attended}</td>
                <td>{sub.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="student-services" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <ChatBot greeting={`Hello ${user?.name || 'Parent'}! I can help you track your child's academic progress. Ask me about attendance, exam dates, or notices.`} />
      </div>
    </Layout>
  );
}
