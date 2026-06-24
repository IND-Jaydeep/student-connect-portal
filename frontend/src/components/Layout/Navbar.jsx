import { NavLink } from 'react-router-dom';
import { NAV_CONFIG } from '../../config/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || 'student';
  const navItems = NAV_CONFIG[role] || [];

  return (
    <div className="navbar">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === `/${role}`}
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <span className="material-icons-sharp">{item.icon}</span>
          <h3>{item.label}</h3>
        </NavLink>
      ))}
    </div>
  );
}
