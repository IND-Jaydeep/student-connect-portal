import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { DEFAULT_PROFILES } from '../config/navigation';

export default function Settings() {
  const { user, updateProfile, getProfileField } = useAuth();
  const role = user?.role || 'student';
  const profile = DEFAULT_PROFILES[role] || DEFAULT_PROFILES.student;

  const [email, setEmail] = useState(getProfileField('email', profile.email));
  const [phone, setPhone] = useState(getProfileField('phone', profile.contact));
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile('email', email);
    updateProfile('phone', phone);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout gridSpan>
      <h1>Account Settings</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Manage your profile and preferences</p>

      <div className="settings-page">
        <div className="service-card">
          <h2>Profile Information</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={user?.name || profile.name} disabled style={{ opacity: 0.6 }} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" value={role.charAt(0).toUpperCase() + role.slice(1)} disabled style={{ opacity: 0.6 }} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="service-card">
          <h2>Preferences</h2>
          <div className="form-group">
            <label>Theme</label>
            <p className="text-muted">Use the theme toggle in the header to switch between light and dark mode. Your preference is saved automatically.</p>
          </div>
          <div className="form-group">
            <label>Notifications</label>
            <p className="text-muted">Email notifications are enabled by default. Contact administration to change notification preferences.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
