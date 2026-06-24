import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getGrievances, addGrievance } from '../../services/grievanceService';

export default function Grievances() {
  const { user } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGrievances() {
      try {
        // GrievanceController GET /api/grievances/my would be better, but the service calls GET /api/grievances
        // Let's rely on filtering or update service later.
        const data = await getGrievances();
        setGrievances(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadGrievances();
  }, []);

  // Use optional chaining carefully since user might be null initially
  const userRoleStr = (user?.role || 'student').toUpperCase();
  const myGrievances = grievances.filter((g) => g.senderRole === userRoleStr || g.role === user?.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      title,
      description: desc, // Note: backend uses 'description', our state is 'desc'
    };
    try {
      const added = await addGrievance(newTicket);
      setGrievances([added, ...grievances]);
      setTitle('');
      setDesc('');
      alert('Grievance / query submitted successfully! The administration will resolve it soon.');
    } catch (e) {
      alert('Failed to submit grievance.');
    }
  };

  return (
    <Layout gridSpan>
      <h1>Grievances</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Submit and track your grievances</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="service-card">
          <h2>Submit a Grievance</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Brief title of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Describe your grievance in detail..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Submit Grievance</button>
          </form>
        </div>

        <div className="service-card">
          <h2>My Grievances</h2>
          <div className="my-grievances" style={{ borderTop: 'none', marginTop: '0.5rem', paddingTop: 0 }}>
            <div className="grievance-list">
              {myGrievances.length === 0 ? (
                <p className="text-muted">No grievances submitted yet.</p>
              ) : (
                myGrievances.map((t) => (
                  <div key={t.id} className="grievance-ticket">
                    <div className="ticket-header">
                      <span className={`badge ${t.status === 'RESOLVED' ? 'success' : 'warning'}`}>{t.status}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : t.time}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t.title}</h4>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      {t.description || t.desc}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
