import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { getNotices } from '../../services/noticeService';

export default function ParentNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotices().then(data => setNotices(data || []));
  }, []);

  const parentNotices = notices.filter((n) => n.audience === 'parent' || n.audience === 'all' || n.audience === 'PARENT' || n.audience === 'ALL');

  return (
    <Layout gridSpan>
      <h1>Notices for Parents</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Stay updated with announcements from the university</p>

      {parentNotices.length === 0 ? (
        <p className="text-muted" style={{ padding: '1.5rem 0' }}>No notices available.</p>
      ) : (
        parentNotices.map((n) => {
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
    </Layout>
  );
}
