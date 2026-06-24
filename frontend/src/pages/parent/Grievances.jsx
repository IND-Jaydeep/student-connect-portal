import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getGrievances, addGrievance } from '../../services/grievanceService';

export default function ParentGrievances() {
  const { user } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    getGrievances().then(data => setGrievances(data || []));
  }, []);

  const myGrievances = grievances.filter((g) => g.role === 'parent' || g.senderRole === 'PARENT');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      title,
      description: desc,
      senderName: `${user?.name || 'Parent'}`,
      senderRole: 'PARENT',
      status: 'PENDING',
    };
    try {
      await addGrievance(newTicket);
      const updated = await getGrievances();
      setGrievances(updated || []);
      setTitle('');
      setDesc('');
      alert('Query submitted successfully! The administration will resolve it soon.');
    } catch (err) {
      console.error(err);
      alert('Failed to submit query');
    }
  };

  return (
    <Layout gridSpan>
      <h1>Parent Queries</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Submit queries regarding your child's academics</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="service-card">
          <h2>Submit a Query</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Brief title of your query"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Describe your query in detail..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Submit Query</button>
          </form>
        </div>

        <div className="service-card">
          <h2>My Queries</h2>
          <div className="grievance-list" style={{ marginTop: '0.5rem' }}>
            {myGrievances.length === 0 ? (
              <p className="text-muted">No queries submitted yet.</p>
            ) : (
              myGrievances.map((t) => (
                <div key={t.id} className="grievance-ticket">
                  <div className="ticket-header">
                    <span className={`badge ${t.status === 'Resolved' ? 'success' : 'warning'}`}>{t.status}</span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{t.time}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{t.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
