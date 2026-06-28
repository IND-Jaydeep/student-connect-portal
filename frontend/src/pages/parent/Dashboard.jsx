import Layout from '../../components/Layout/Layout';
import ChatBot from '../../components/ChatBot/ChatBot';
import { useAuth } from '../../hooks/useAuth';

const childAttendance = [
  { className: 'eg', icon: 'architecture', color: 'var(--color-primary)', name: 'Engineering Graphics', attended: '12/14' },
  { className: 'mth', icon: 'functions', color: 'var(--color-danger)', name: 'Mathematical Engineering', attended: '27/29' },
  { className: 'cs', icon: 'computer', color: 'var(--color-success)', name: 'Computer Architecture', attended: '27/30' },
  { className: 'cg', icon: 'dns', color: 'var(--color-danger)', name: 'Database Management', attended: '24/25' },
  { className: 'net', icon: 'router', color: 'var(--color-primary)', name: 'Network Security', attended: '25/27' },
];

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <Layout gridSpan>
      <h1>Child's Academic Overview</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Monitor your child's attendance and performance</p>

      <div className="subjects">
        {childAttendance.map((sub) => (
          <div key={sub.className} className={sub.className}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span
                className="material-icons-sharp"
                style={{
                  background: 'transparent',
                  color: sub.color,
                  fontSize: '1.5rem',
                  padding: 0,
                  width: 'auto',
                  height: 'auto',
                  flexShrink: 0,
                }}
              >
                {sub.icon}
              </span>
              <h3 style={{ fontSize: '0.85rem', margin: 0, lineHeight: '1.2' }}>{sub.name}</h3>
            </div>
            <h2>
              <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--color-info)' }}>
                lectures attended:{' '}
              </span>
              {sub.attended}
            </h2>
          </div>
        ))}
      </div>

      <div className="student-services" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <ChatBot greeting={`Hello ${user?.name || 'Parent'}! I can help you track your child's academic progress. Ask me about attendance, exam dates, or notices.`} />
      </div>
    </Layout>
  );
}
