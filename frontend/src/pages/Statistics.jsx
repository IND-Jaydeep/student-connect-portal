import { useState } from 'react';
import Layout from '../components/Layout/Layout';

export default function Statistics() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    const lower = prompt.trim().toLowerCase();
    if (!lower) return;

    let sqlQuery = '';
    let headers = [];
    let rows = [];

    if (lower.includes('highest grades') || lower.includes('top 5 students') || lower.includes('grade')) {
      sqlQuery = "SELECT name, roll_no, cgpa FROM students ORDER BY cgpa DESC LIMIT 5;";
      headers = ['Rank', 'Name', 'Roll No.', 'CGPA'];
      rows = [
        ['1', 'Alex Mercer', '12102030', '9.8 (A+)'],
        ['2', 'Sarah Miller', '12102035', '9.6 (A+)'],
        ['3', 'David Beckham', '12102048', '9.5 (A)'],
        ['4', 'Jane Doe', '12102011', '9.3 (A)'],
        ['5', 'Bob Johnson', '12102022', '9.2 (A)'],
      ];
    } else if (lower.includes('attendance') && (lower.includes('<') || lower.includes('less') || lower.includes('75'))) {
      sqlQuery = "SELECT name, roll_no, attendance_pct, course FROM students WHERE attendance_pct < 75;";
      headers = ['Name', 'Roll No.', 'Attendance', 'Course'];
      rows = [
        ['Charlie Brown', '12102066', '64%', 'BTech. CSE'],
        ['Lucy van Pelt', '12102078', '71%', 'BTech. CSE'],
      ];
    } else if (lower.includes('leave') || lower.includes('teachers on leave') || lower.includes('absent')) {
      sqlQuery = "SELECT name, department, leave_duration FROM teachers WHERE is_on_leave = TRUE;";
      headers = ['Teacher Name', 'Department', 'Leave Duration'];
      rows = [
        ['The Professor', 'Computer Science', 'Full Day'],
        ['Lisa Manobal', 'Computer Science', 'Half Day'],
        ['Himanshu Jindal', 'Mechanical Eng.', 'Full Day'],
      ];
    } else {
      sqlQuery = "SELECT student_id, name, course, email FROM students WHERE course = 'BTech. CSE' LIMIT 3;";
      headers = ['Student ID', 'Name', 'Course', 'Email'];
      rows = [
        ['12102030', 'Alex Mercer', 'BTech. CSE', 'alex@gmail.com'],
        ['12102031', 'Bob Smith', 'BTech. CSE', 'bob@gmail.com'],
        ['12102032', 'Charlie Davis', 'BTech. CSE', 'charlie@gmail.com'],
      ];
    }

    setResult({ sqlQuery, headers, rows });
  };

  return (
    <Layout gridSpan>
      <h1>Statistics & AI Query Tool</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Use natural language to query the university database</p>

      <div className="service-card">
        <h2>Prompt to SQL Generator</h2>
        <div className="form-group">
          <label>Enter your query in plain English</label>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <input
              type="text"
              placeholder="e.g. Show me top 5 students with highest grades"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              style={{ flex: 1 }}
            />
            <button className="btn" onClick={handleGenerate}>Generate</button>
          </div>
        </div>

        {!result ? (
          <div className="sql-placeholder">
            <span className="material-icons-sharp" style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>terminal</span>
            <p>Enter a natural language prompt above to generate SQL and see results.</p>
          </div>
        ) : (
          <div className="sql-result-container" style={{ display: 'block', marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Generated SQL:</h3>
            <div className="sql-query-box">
              <code>{result.sqlQuery}</code>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Results:</h3>
            <table className="sql-result-table">
              <thead>
                <tr>{result.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i}>{row.map((td, j) => <td key={j}>{td}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
