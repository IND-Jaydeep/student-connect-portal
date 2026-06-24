import Layout from '../../components/Layout/Layout';
import ChatBot from '../../components/ChatBot/ChatBot';

export default function AdminChatBot() {
  return (
    <Layout gridSpan>
      <h1>AI Assistant</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Chat with the UMS AI to manage tasks and analyze data</p>

      <div className="student-services" style={{ gridTemplateColumns: '1fr' }}>
        <ChatBot greeting="Hello Admin! I can provide database status, grievance summaries, and system analytics." />
      </div>
    </Layout>
  );
}
