import { useEffect, useMemo, useState } from 'react';
import { Calendar3, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { queryMember3Tasks } from '../services/member3Service';
import '../styles/member3.css';

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const statusText = { TODO: 'Chưa làm', DOING: 'Đang làm', DONE: 'Hoàn thành' };

function sameDate(dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();
}

export default function Member3CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    queryMember3Tasks({ keyword: '', categoryId: '', status: '' })
      .then((response) => setTasks(response.data))
      .catch((err) => setError(err.response?.data?.message || 'Không tải được lịch công việc'));
  }, []);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const mondayOffset = (first.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - mondayOffset);
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [cursor]);

  const selectedTasks = tasks.filter((task) => task.deadline && sameDate(new Date(task.deadline), selectedDate));
  const moveMonth = (amount) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + amount, 1));

  return (
    <main className="member3-page">
      <header className="member3-page-header member3-calendar-header">
        <div><span className="member3-eyebrow"><Calendar3 /> Theo dõi deadline</span><h1>Lịch làm việc</h1><p>Xem công việc theo ngày và không bỏ lỡ thời hạn quan trọng.</p></div>
        <button className="member3-secondary-button" onClick={() => { const today = new Date(); setCursor(today); setSelectedDate(today); }}>Hôm nay</button>
      </header>
      {error && <div className="member3-alert">{error}</div>}

      <div className="member3-calendar-layout">
        <section className="member3-calendar-card">
          <div className="member3-calendar-toolbar">
            <button onClick={() => moveMonth(-1)}><ChevronLeft /></button>
            <h3>Tháng {cursor.getMonth() + 1}, {cursor.getFullYear()}</h3>
            <button onClick={() => moveMonth(1)}><ChevronRight /></button>
          </div>
          <div className="member3-calendar-grid member3-weekdays">{weekdays.map((day) => <div key={day}>{day}</div>)}</div>
          <div className="member3-calendar-grid">
            {cells.map((date) => {
              const dayTasks = tasks.filter((task) => task.deadline && sameDate(new Date(task.deadline), date));
              const outside = date.getMonth() !== cursor.getMonth();
              const selected = sameDate(date, selectedDate);
              const today = sameDate(date, new Date());
              return (
                <button key={date.toISOString()} className={`member3-calendar-day ${outside ? 'outside' : ''} ${selected ? 'selected' : ''}`} onClick={() => setSelectedDate(date)}>
                  <span className={today ? 'today-number' : ''}>{date.getDate()}</span>
                  <div>{dayTasks.slice(0, 2).map((task) => <small key={task.id} className={`calendar-task status-${task.status.toLowerCase()}`}>{task.title}</small>)}</div>
                  {dayTasks.length > 2 && <em>+{dayTasks.length - 2} công việc</em>}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="member3-agenda-card">
          <h3>{selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</h3>
          <p>{selectedTasks.length} công việc</p>
          <div className="member3-agenda-list">
            {selectedTasks.length === 0 && <div className="member3-empty">Ngày này chưa có công việc.</div>}
            {selectedTasks.map((task) => (
              <article key={task.id}>
                <span className={`member3-agenda-dot status-${task.status.toLowerCase()}`} />
                <div><strong>{task.title}</strong><p>{new Date(task.deadline).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · {statusText[task.status]}</p></div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
