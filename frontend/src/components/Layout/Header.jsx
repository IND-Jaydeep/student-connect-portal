import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="logo" title="University Management System">
        <img src="/images/logo.png" alt="UMS Logo" />
        <h2>U<span className="danger">M</span>S</h2>
      </div>

      <Navbar />

      <ThemeToggle />


      <div className="settings-menu-container">
        <Link to="/settings" className="settings-btn" title="Settings">
          <span className="material-icons-sharp">settings</span>
        </Link>
        <div className="settings-dropdown">
          <h3>System Settings</h3>
          <ul>
            <li>
              <Link to="/statistics">
                <span className="material-icons-sharp">insights</span>
                <span>Statistics Page</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <span className="material-icons-sharp">manage_accounts</span>
                <span>Account Settings</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <span className="material-icons-sharp">logout</span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
