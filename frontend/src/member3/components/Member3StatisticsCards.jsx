import { Alarm, CheckCircle, ClipboardData, ExclamationTriangle } from 'react-bootstrap-icons';

const cards = [
  { key: 'totalTasks', label: 'Tổng công việc', icon: ClipboardData, className: 'stat-blue' },
  { key: 'dueTodayTasks', label: 'Đến hạn hôm nay', icon: Alarm, className: 'stat-orange' },
  { key: 'overdueTasks', label: 'Đã quá hạn', icon: ExclamationTriangle, className: 'stat-red' },
  { key: 'completedTasks', label: 'Đã hoàn thành', icon: CheckCircle, className: 'stat-green' },
];

export default function Member3StatisticsCards({ statistics }) {
  return (
    <div className="member3-stat-grid">
      {cards.map(({ key, label, icon: Icon, className }) => (
        <article className={`member3-stat-card ${className}`} key={key}>
          <div>
            <p>{label}</p>
            <strong>{statistics[key] ?? 0}</strong>
          </div>
          <span className="member3-stat-icon"><Icon /></span>
        </article>
      ))}
    </div>
  );
}
