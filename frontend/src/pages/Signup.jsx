import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password, role });
      navigate(`/${role}`);
    } catch (error) {
      alert("Signup failed: " + (error.message || "Please try again."));
    }
  };

  const roles = ['student', 'parent', 'faculty', 'admin'];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/images/logo.png" alt="UMS Logo" style={{ width: '3rem', margin: '0 auto 0.8rem' }} />
          <h1>Create Account</h1>
          <p className="text-muted">Register for your UMS portal access</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Role</label>
            <div className="role-selector">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-option ${role === r ? 'selected' : ''}`}
                  onClick={() => setRole(r)}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Create Account</button>
        </form>

        <Link to="/login" className="auth-link">Already have an account? Sign In</Link>
      </div>
    </div>
  );
}
