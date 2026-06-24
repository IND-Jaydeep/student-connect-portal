import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { getNotices } from '../../services/noticeService';

const CATEGORIES = ['All', 'Exam', 'Academic', 'Co-curricular', 'General'];

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const data = await getNotices();
        setNotices(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const studentNotices = notices.filter((n) => n.audience === 'student' || n.audience === 'all' || n.audience === 'STUDENT' || n.audience === 'ALL');
  const filtered = filter === 'All' ? studentNotices : studentNotices.filter((n) => n.category === filter);

  return (
    <Layout gridSpan>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1>Notices</h1>
          <p className="text-muted">Stay updated with the latest announcements</p>
        </div>
        <Link to="/student/notices/create" className="btn">
          <span className="material-icons-sharp" style={{ marginRight: '0.4rem', fontSize: '1rem', color: '#fff' }}>add</span>
          Post Notice
        </Link>
      </div>

      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted" style={{ padding: '1.5rem 0' }}>No active {filter.toLowerCase()} notices.</p>
      ) : (
        filtered.map((n) => {
          const priorityBadgeColor = n.priority === 'High' ? 'danger' : n.priority === 'Medium' ? 'warning' : 'primary';
          const isHighlight = n.priority === 'High' || n.priority === 'Medium';
          return (
            <div
              key={n.id}
              className={`notice-card ${isHighlight ? 'highlight' : ''}`}
              style={n.priority === 'Medium' ? { borderLeftColor: 'var(--color-warning)' } : undefined}
            >
              <div className="notice-header">
                <span className={`badge ${priorityBadgeColor}`}>{n.priority} Priority</span>
                <span className="date text-muted">
                  {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : n.time}
                </span>
              </div>
              <h3 style={{ fontWeight: 700 }}>{n.title}</h3>
              <p className="notice-body text-muted">{n.body}</p>
              <div className="author text-muted">— {n.authorName || n.author}</div>
            </div>
          );
        })
      )}
    </Layout>
  );
}
