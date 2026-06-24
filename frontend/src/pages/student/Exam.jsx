import Layout from '../../components/Layout/Layout';

const examSchedule = [
  { date: 'June 1, 2026', subject: 'Engineering Graphics', time: '9:00 AM - 12:00 PM', room: 'Hall A' },
  { date: 'June 3, 2026', subject: 'Mathematical Engineering', time: '9:00 AM - 12:00 PM', room: 'Hall B' },
  { date: 'June 5, 2026', subject: 'Computer Architecture', time: '2:00 PM - 5:00 PM', room: 'Hall A' },
  { date: 'June 7, 2026', subject: 'Database Management', time: '9:00 AM - 12:00 PM', room: 'Hall C' },
  { date: 'June 9, 2026', subject: 'Network Security', time: '2:00 PM - 5:00 PM', room: 'Hall B' },
];

export default function Exam() {
  return (
    <Layout gridSpan>
      <h1>Examination Schedule</h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Mid-Term Examination — June 2026</p>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {examSchedule.map((exam, i) => (
              <tr key={i}>
                <td>{exam.date}</td>
                <td>{exam.subject}</td>
                <td>{exam.time}</td>
                <td>{exam.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
