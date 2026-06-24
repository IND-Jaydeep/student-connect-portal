import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import ChatBot from '../../components/ChatBot/ChatBot';
import { useAuth } from '../../hooks/useAuth';
import { getGrievances, resolveGrievance } from '../../services/grievanceService';
import { getNotices } from '../../services/noticeService';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getGrievances().then(data => setGrievances(data || []));
    getNotices().then(data => setNotices(data || []));
  }, []);

  // Faculty sees DBMS/slides related queries
  const facultyTickets = grievances.filter(
    (g) => (g.status === 'PENDING' || g.status === 'Pending') && (g.title.toLowerCase().includes('slides') || g.title.toLowerCase().includes('dbms'))
  );

  const facultyNotices = notices.filter((n) => n.audience === 'faculty' || n.audience === 'all' || n.audience === 'FACULTY' || n.audience === 'ALL');

  const handleResolve = async (id) => {
    try {
      await resolveGrievance(id);
      const updated = await getGrievances();
      setGrievances(updated || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout gridSpan>
      <h1>Faculty Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Welcome, {user?.name || 'Dr. Jenkins'}</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Assigned Queries */}
        <div className="service-card">
          <h2>Assigned Queries ({facultyTickets.length})</h2>
          <div className="grievance-list" style={{ marginTop: '1rem' }}>
            {facultyTickets.length === 0 ? (
              <p className="text-muted" style={{ textAlign: 'center', padding: '1.5rem 0' }}>No pending queries assigned to you.</p>
            ) : (
              facultyTickets.map((g) => (
                <div key={g.id} className="grievance-ticket" style={{ border: '1px solid var(--color-light)', padding: '1rem', borderRadius: 'var(--border-radius-1)' }}>
                  <div className="ticket-header">
                    <span className="badge warning" style={{ fontSize: '0.7rem' }}>Pending</span>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>{g.time}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{g.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                    Asked by {g.sender} ({g.role}): {g.desc}
                  </p>
                  <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn" onClick={() => handleResolve(g.id)} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', height: 'auto', margin: 0 }}>
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Faculty Notices */}
        <div className="service-card">
          <h2>Faculty Notices</h2>
          <div style={{ marginTop: '1rem', maxHeight: '25rem', overflowY: 'auto' }}>
            {facultyNotices.map((n) => {
              const priorityBadgeColor = n.priority === 'High' ? 'danger' : n.priority === 'Medium' ? 'warning' : 'primary';
              return (
                <div key={n.id} className={`notice-card ${n.priority === 'High' ? 'highlight' : ''}`}>
                  <div className="notice-header">
                    <span className={`badge ${priorityBadgeColor}`}>{n.priority} Priority</span>
                    <span className="date text-muted">{n.time}</span>
                  </div>
                  <h3 style={{ fontWeight: 700 }}>{n.title}</h3>
                  <p className="summary"><b>AI Summary:</b> {n.summary}</p>
                  <p className="notice-body text-muted">{n.body}</p>
                  <div className="author text-muted">— {n.author}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="student-services" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <ChatBot greeting={`Hello Dr. ${user?.name || 'Jenkins'}! I can help with syllabus updates, meeting schedules, or notice publishing.`} />
      </div>
    </Layout>
  );
}
