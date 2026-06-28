import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { api } from '../../services/api';

export default function AdminAddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const roles = ['student', 'parent', 'faculty', 'admin'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await api.post('/auth/signup', { name, email, password, role });
      alert('User successfully created!');
      setMessage({ type: 'success', text: 'User successfully created!' });
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setRole('student');
    } catch (error) {
      alert("Failed to create user: " + (error.message || "Please try again."));
      setMessage({ type: 'danger', text: "Failed to create user: " + (error.message || "Please try again.") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout gridSpan>
      <h1>Add New User</h1>
      
      <div className="service-card" style={{ padding: '2rem', marginTop: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>User Registration</h2>
        
        {message && (
          <div className={`badge ${message.type}`} style={{ display: 'block', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Select Role</label>
            <div className="role-selector" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-option ${role === r ? 'selected' : ''}`}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--border-radius-1)',
                    border: '1px solid var(--color-primary)',
                    background: role === r ? 'var(--color-primary)' : 'transparent',
                    color: role === r ? 'white' : 'var(--color-primary)',
                    cursor: 'pointer',
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
              data-lpignore="true"
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--border-radius-1)', border: '1px solid var(--color-info-light)', background: 'var(--color-white)', color: 'var(--color-dark)' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email"
              data-lpignore="true"
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--border-radius-1)', border: '1px solid var(--color-info-light)', background: 'var(--color-white)', color: 'var(--color-dark)' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              data-lpignore="true"
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--border-radius-1)', border: '1px solid var(--color-info-light)', background: 'var(--color-white)', color: 'var(--color-dark)' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--border-radius-1)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating User...' : 'Add User'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
