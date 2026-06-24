import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      <span className={`material-icons-sharp ${!isDark ? 'active' : ''}`}>light_mode</span>
      <span className={`material-icons-sharp ${isDark ? 'active' : ''}`}>dark_mode</span>
    </div>
  );
}
