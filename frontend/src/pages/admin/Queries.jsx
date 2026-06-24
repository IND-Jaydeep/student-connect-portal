import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { getGrievances, resolveGrievance } from '../../services/grievanceService';

export default function AdminQueries() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    getGrievances().then(data => setGrievances(data || []));
  }, []);

  const handleResolve = async (id) => {
    try {
      await resolveGrievance(id);
      const updated = await getGrievances();
      setGrievances(updated || []);
    } catch (err) {
      console.error(err);
    }
  };

  const pending = grievances.filter((g) => g.status === 'PENDING' || g.status === 'Pending');
  const resolved = grievances.filter((g) => g.status === 'RESOLVED' || g.status === 'Resolved');

  return (
    <Layout gridSpan>
      <h1>All Queries</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Manage grievances from students and parents</p>

      <h2 style={{ marginBottom: '1rem' }}>Pending ({pending.length})</h2>
      <div className="grievance-list" style={{ marginBottom: '2rem' }}>
        {pending.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>No pending queries!</p>
        ) : (
          pending.map((g) => {
            const roleLabel = g.role === 'student' ? 'Student Grievance' : 'Parent Query';
            const roleBadgeColor = g.role === 'student' ? 'danger' : 'info';
            return (
              <div key={g.id} className="grievance-ticket" style={{ border: '1px solid var(--color-light)', padding: '1rem', borderRadius: 'var(--border-radius-1)' }}>
                <div className="ticket-header">
                  <span className={`badge ${roleBadgeColor}`} style={{ fontSize: '0.7rem' }}>{roleLabel}</span>
                  <span className="text-muted" style={{ fontSize: '0.7rem' }}>{g.time}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{g.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                  <b>Sender:</b> {g.sender} — {g.desc}
                </p>
                <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn" onClick={() => handleResolve(g.id)} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', height: 'auto', margin: 0 }}>
                    Resolve Query
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Resolved ({resolved.length})</h2>
      <div className="grievance-list">
        {resolved.length === 0 ? (
          <p className="text-muted">No resolved queries yet.</p>
        ) : (
          resolved.map((g) => (
            <div key={g.id} className="grievance-ticket" style={{ border: '1px solid var(--color-light)', padding: '1rem', borderRadius: 'var(--border-radius-1)', opacity: 0.7 }}>
              <div className="ticket-header">
                <span className="badge success" style={{ fontSize: '0.7rem' }}>Resolved</span>
                <span className="text-muted" style={{ fontSize: '0.7rem' }}>{g.time}</span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{g.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>{g.desc}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
