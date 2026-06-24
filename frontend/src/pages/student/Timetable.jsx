import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { ALL_DAYS, DAY_NAMES } from '../../data/timetable';

export default function Timetable() {
  const today = new Date().getDay();
  const [day, setDay] = useState(today);

  const schedule = ALL_DAYS[day] || [];

  const nextDay = () => setDay((prev) => (prev <= 5 ? prev + 1 : 0));
  const prevDay = () => setDay((prev) => (prev >= 1 ? prev - 1 : 6));

  return (
    <Layout gridSpan>
      <div className="timetable">
        <div>
          <span className="material-icons-sharp" onClick={prevDay} style={{ display: 'block', fontSize: '2rem', cursor: 'pointer', color: 'var(--color-dark)' }}>
            chevron_left
          </span>
          <h2>{DAY_NAMES[day]}</h2>
          <span className="material-icons-sharp" onClick={nextDay} style={{ display: 'block', fontSize: '2rem', cursor: 'pointer', color: 'var(--color-dark)' }}>
            chevron_right
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Room</th>
              <th>Subject</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-info)' }}>
                  No classes scheduled for {DAY_NAMES[day]}
                </td>
              </tr>
            ) : (
              schedule.map((sub, i) => (
                <tr key={i}>
                  <td>{sub.time}</td>
                  <td>{sub.roomNumber}</td>
                  <td>{sub.subject}</td>
                  <td>{sub.type || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
