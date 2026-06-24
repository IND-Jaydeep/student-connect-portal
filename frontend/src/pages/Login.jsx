import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      navigate(`/${role}`);
    } catch (error) {
      alert("Login failed: " + (error.message || "Please check your credentials."));
    }
  };

  const roles = ['student', 'parent', 'faculty', 'admin'];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/images/logo.png" alt="UMS Logo" style={{ width: '3rem', margin: '0 auto 0.8rem' }} />
          <h1>Welcome Back</h1>
          <p className="text-muted">Sign in to your UMS account</p>
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
            <label>Email / Username</label>
            <input
              type="text"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Sign In</button>
        </form>

        <Link to="/signup" className="auth-link">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
}
