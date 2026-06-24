import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import { addNotice, analyzeNotice } from '../../services/noticeService';

export default function NoticeBuilder() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('student');
  const [preview, setPreview] = useState(null);

  const handleAnalyze = async () => {
    if (title || body) {
      const analysis = await analyzeNotice(title, body);
      setPreview(analysis);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const analysis = await analyzeNotice(title, body);
    const newNotice = {
      title,
      body,
      summary: analysis?.summary || 'No summary',
      category: analysis?.category || 'General',
      priority: analysis?.priority || 'Low',
      audience,
      time: 'Just now',
      authorName: user?.role === 'ADMIN' ? 'Administrator' : `Dr. ${user?.name || 'Faculty'}`,
    };
    try {
      await addNotice(newNotice);
      setTitle('');
      setBody('');
      setPreview(null);
      alert('Notice broadcast successfully across designated portals!');
    } catch (err) {
      console.error(err);
      alert('Failed to broadcast notice');
    }
  };

  return (
    <Layout gridSpan>
      <h1>Notice Builder</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Create and broadcast notices with AI-powered categorization</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="service-card">
          <h2>Compose Notice</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Notice Title</label>
              <input
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => { setTitle(e.target.value); handleAnalyze(); }}
                required
              />
            </div>
            <div className="form-group">
              <label>Notice Body</label>
              <textarea
                rows="6"
                placeholder="Write your notice content..."
                value={body}
                onChange={(e) => { setBody(e.target.value); handleAnalyze(); }}
                required
              />
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option value="student">Students</option>
                <option value="parent">Parents</option>
                <option value="faculty">Faculty</option>
                <option value="all">Everyone</option>
              </select>
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Broadcast Notice</button>
          </form>
        </div>

        <div className="service-card">
          <h2>AI Analysis Preview</h2>
          {preview ? (
            <div className="ai-notice-preview" style={{ marginTop: '1rem' }}>
              <p><b>AI Category:</b> {preview.category}</p>
              <p>
                <b>AI Priority:</b>{' '}
                <span className={preview.priority === 'High' ? 'danger' : preview.priority === 'Medium' ? 'warning' : 'primary'}>
                  {preview.priority}
                </span>
              </p>
              <p><b>AI Summary Draft:</b> {preview.summary}</p>
            </div>
          ) : (
            <div className="sql-placeholder" style={{ marginTop: '1rem' }}>
              <span className="material-icons-sharp" style={{ fontSize: '3rem', color: 'var(--color-info)', display: 'block', marginBottom: '0.5rem' }}>auto_awesome</span>
              <p className="text-muted">Start typing in the notice form to see AI-generated category, priority, and summary.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
