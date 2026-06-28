import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { getGrievances, resolveGrievance } from '../../services/grievanceService';

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    getGrievances().then(data => {
      setGrievances(data || []);
    });
  }, []);

  const pendingGrievances = grievances.filter((g) => g.status === 'PENDING' || g.status === 'Pending');

  const handleResolve = async (id) => {
    try {
      await resolveGrievance(id);
      const updated = await getGrievances();
      setGrievances(updated || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Stats
  const totalStudents = 1420;
  const totalFaculty = 86;
  const pendingCount = pendingGrievances.length;

  return (
    <Layout gridSpan>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <button 
          className="btn" 
          onClick={() => window.location.href='/admin/add-user'}
          style={{ background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span className="material-icons-sharp">person_add</span>
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="subjects" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '2rem' }}>
        <div className="eg">
          <span className="material-icons-sharp" style={{ background: 'transparent', color: 'var(--color-primary)', fontSize: '1.5rem', padding: 0, width: 'auto', height: 'auto' }}>people</span>
          <h3 style={{ margin: '0.6rem 0 0.3rem' }}>Total Students</h3>
          <h2>{totalStudents.toLocaleString()}</h2>
        </div>
        <div className="mth">
          <span className="material-icons-sharp" style={{ background: 'transparent', color: 'var(--color-success)', fontSize: '1.5rem', padding: 0, width: 'auto', height: 'auto' }}>school</span>
          <h3 style={{ margin: '0.6rem 0 0.3rem' }}>Total Faculty</h3>
          <h2>{totalFaculty}</h2>
        </div>
        <div className="cs">
          <span className="material-icons-sharp" style={{ background: 'transparent', color: 'var(--color-warning)', fontSize: '1.5rem', padding: 0, width: 'auto', height: 'auto' }}>report_problem</span>
          <h3 style={{ margin: '0.6rem 0 0.3rem' }}>Pending Queries</h3>
          <h2>{pendingCount}</h2>
        </div>
      </div>

      {/* Pending Grievances */}
      <div className="service-card" style={{ marginBottom: '2rem' }}>
        <h2>Pending Grievances</h2>
        <div className="grievance-list" style={{ marginTop: '1rem' }}>
          {pendingGrievances.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>No pending grievances. All systems clear!</p>
          ) : (
            pendingGrievances.map((g) => {
              const roleLabel = g.role === 'student' ? 'Student Grievance' : 'Parent Query';
              const roleBadgeColor = g.role === 'student' ? 'danger' : 'info';
              return (
                <div key={g.id} className="grievance-ticket" style={{ border: '1px solid var(--color-light)', padding: '1rem', borderRadius: 'var(--border-radius-1)' }}>
                  <div className="ticket-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className={`badge ${roleBadgeColor}`} style={{ fontSize: '0.7rem' }}>{roleLabel}</span>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>{g.time}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{g.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.4, margin: '0.2rem 0 0.6rem 0' }}>
                    <b>Sender:</b> {g.sender}<br />{g.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                    <button className="btn" onClick={() => handleResolve(g.id)} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', height: 'auto', margin: 0 }}>
                      Resolve Query
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </Layout>
  );
}
