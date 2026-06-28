import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { getNotices } from '../../services/noticeService';

export default function FacultyNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotices().then(data => setNotices(data || []));
  }, []);

  const facultyNotices = notices.filter((n) => n.audience === 'faculty' || n.audience === 'all' || n.audience === 'FACULTY' || n.audience === 'ALL');

  return (
    <Layout gridSpan>
      <h1>Notices</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>View the latest announcements and notices relevant to you.</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr' }}>
        <div className="service-card">
          <h2>Faculty Notices</h2>
          <div style={{ marginTop: '1rem', maxHeight: '25rem', overflowY: 'auto' }}>
            {facultyNotices.length === 0 ? (
              <p className="text-muted" style={{ textAlign: 'center', padding: '1.5rem 0' }}>No notices available.</p>
            ) : (
              facultyNotices.map((n) => {
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
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
