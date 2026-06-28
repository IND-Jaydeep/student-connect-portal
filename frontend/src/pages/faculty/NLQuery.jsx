import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { executeNLQuery } from '../../services/statisticsService';

export default function FacultyNLQuery() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await executeNLQuery(prompt);
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while executing the query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout gridSpan>
      <h1>Natural Language Query</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        Use simple English to fetch information from the student database.
      </p>

      <div className="service-card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleQuery} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="e.g. Show me the average attendance of all students"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '0.8rem', 
              borderRadius: 'var(--border-radius-1)', 
              border: '1px solid var(--color-info-light)',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-dark)'
            }}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.8rem 1.5rem', whiteSpace: 'nowrap' }}>
            {loading ? 'Querying...' : 'Execute Query'}
          </button>
        </form>
        {error && <p style={{ color: 'var(--color-danger)', marginTop: '1rem' }}>{error}</p>}
      </div>

      {result && (
        <div className="service-card">
          <h2>Query Results</h2>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-1)', border: '1px solid var(--color-light)', overflowX: 'auto' }}>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--color-dark)' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </Layout>
  );
}
