import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

function getChatResponse(query, role) {
  const lower = query.toLowerCase();

  if (role === 'student') {
    if (lower.includes('exam') || lower.includes('test')) {
      return "Mid-Term Examinations are scheduled to start next week (June 1st, 2026). You can find the dates for all 5 subjects under the 'Examination' tab in the navigation bar.";
    } else if (lower.includes('attendance') || lower.includes('class')) {
      return "You have excellent attendance! In Math, you are at 93%, Database Management is 96%, and Computer Architecture is 91%. Ensure you keep attendance above 75% to remain eligible for examinations.";
    } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('connection')) {
      return "Hostel Wi-Fi has a reported speed bottleneck. The administrative team has received multiple queries and is actively updating routers in Block C today.";
    } else if (lower.includes('slides') || lower.includes('dbms') || lower.includes('materials')) {
      return "DBMS Lecture slides can be requested from Dr. Jenkins. You can also file a query in the Grievance box to get direct links uploaded.";
    }
  } else if (role === 'parent') {
    if (lower.includes('attendance') || lower.includes('score')) {
      return "Your child, Alex Mercer, has an average attendance rate of 91.6% across BTech CSE classes, which is well above the threshold of 75%.";
    } else if (lower.includes('exam')) {
      return "Mid-term examinations start next Monday. Please review the details in the notices feed above.";
    }
  } else if (role === 'faculty') {
    if (lower.includes('meeting') || lower.includes('syllabus')) {
      return "A department meeting regarding syllabus progress is scheduled for tomorrow at 3 PM in Room 102. Be sure to compile your attendance sheet records beforehand.";
    } else if (lower.includes('notice') || lower.includes('publish')) {
      return "To publish a notice, fill in the notice broadcaster form on the right. The AI will summarize it and add tags automatically.";
    }
  } else if (role === 'admin') {
    if (lower.includes('db') || lower.includes('database') || lower.includes('status')) {
      return "The relational database clusters are healthy. Active records: 1,420 students and 86 faculty members. Daily automated backups are successfully running.";
    } else if (lower.includes('grievance') || lower.includes('query')) {
      return "There are currently active grievances listed below. You can resolve them instantly by checking details and clicking the 'Resolve Query' button.";
    }
  }

  return "I am a chatbot trained on the UMS portal database. I can assist you with information about exam dates, timetables, grievances, or course slides.";
}

export default function ChatBot({ greeting }) {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const name = user?.name || 'Alex';
  const [messages, setMessages] = useState([
    { type: 'ai', text: greeting || `Hi ${name}! I am your UMS AI Assistant. How can I help you today?`, time: 'Just now' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input.trim();
    setMessages((prev) => [...prev, { type: 'user', text: query, time: 'Just now' }]);
    setInput('');

    setTimeout(() => {
      const response = getChatResponse(query, role);
      setMessages((prev) => [...prev, { type: 'ai', text: response, time: 'Just now' }]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="service-card chat-box-card" style={{ width: '100%' }}>
      <h2>AI Study Assistant</h2>
      <p className="text-muted">Ask our AI chatbot anything about your courses, timetable, or exam dates.</p>
      <div className="chatbot-container" style={{ marginTop: '1rem' }}>
        <div className="chat-messages" style={{ maxHeight: '30rem' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type}`}>
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend}>
            <span className="material-icons-sharp">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
