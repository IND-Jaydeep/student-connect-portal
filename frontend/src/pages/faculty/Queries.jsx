import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { getGrievances, resolveGrievance } from '../../services/grievanceService';

export default function FacultyQueries() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    getGrievances().then(data => setGrievances(data || []));
  }, []);

  const facultyTickets = grievances.filter(
    (g) => (g.status === 'PENDING' || g.status === 'Pending') && (g.title.toLowerCase().includes('slides') || g.title.toLowerCase().includes('dbms'))
  );

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
      <h1>Assigned Queries</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>View and resolve student queries related to your courses.</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr' }}>
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
      </div>
    </Layout>
  );
}
