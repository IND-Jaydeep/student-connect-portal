import { useState } from 'react';
import Layout from '../components/Layout/Layout';

export default function Password() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirm) {
      alert('New password and confirm password do not match!');
      return;
    }
    alert('Password changed successfully!');
    setCurrent('');
    setNewPass('');
    setConfirm('');
  };

  return (
    <Layout gridSpan>
      <h1>Change Password</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Update your account password</p>

      <div className="service-card" style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Update Password</button>
        </form>
      </div>
    </Layout>
  );
}
