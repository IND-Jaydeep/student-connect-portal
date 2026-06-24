import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, showSidebar = true, gridSpan = false }) {
  return (
    <>
      <Header />
      <div className="container">
        {showSidebar && <Sidebar />}
        <main style={gridSpan ? { gridColumn: 'span 2' } : undefined}>
          {children}
        </main>
      </div>
    </>
  );
}
