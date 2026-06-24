import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import { addNotice } from '../../services/noticeService';

export default function CreateNotice() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = {
      id: 'n_' + Date.now(),
      title,
      body,
      summary: body.substring(0, 80) + (body.length > 80 ? '...' : ''),
      category,
      priority,
      audience: 'student',
      time: 'Just now',
      author: `${user?.name || 'Student'} (Student)`,
    };
    addNotice(newNotice);
    alert('Notice posted successfully!');
    navigate('/student/notices');
  };

  return (
    <Layout gridSpan>
      <h1>Post a Notice</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Share information with fellow students</p>

      <div className="service-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Notice Title</label>
            <input
              type="text"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Notice Body</label>
            <textarea
              rows="5"
              placeholder="Write your notice content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Exam">Exam</option>
              <option value="Co-curricular">Co-curricular</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Publish Notice</button>
        </form>
      </div>
    </Layout>
  );
}
