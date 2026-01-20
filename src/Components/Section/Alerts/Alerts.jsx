"use client";
import "./alerts.css";

export default function Alerts() {
  const notifications = [
    {
      id: 1,
      type: "Payment",
      icon: "✓",
      title: "Payment",
      message: "Payment of 2.500 KWD successful.",
      date: "2025-11-15",
      read: false,
      color: "#00B074",
    },
    {
      id: 2,
      type: "Promotion",
      icon: "🔔",
      title: "Promotion",
      message: "Payment of 2.500 KWD successful.",
      date: "2025-11-10",
      read: false,
      color: "#EF4444",
    },
    {
      id: 3,
      type: "System",
      icon: "✓",
      title: "System",
      message: "Your ride to Salmiya has been scheduled.",
      date: "2025-04-16",
      read: true,
      color: "#00B074",
    },
    {
      id: 4,
      type: "Promotion",
      icon: "✓",
      title: "Promotion",
      message: "Your ride to Salmiya has been scheduled.",
      date: "2024-11-28",
      read: true,
      color: "#00B074",
    },
    {
      id: 5,
      type: "Trip Update",
      icon: "🔔",
      title: "Trip Update",
      message: "Your weekly report is ready to view.",
      date: "2024-04-22",
      read: false,
      color: "#EF4444",
    },
    {
      id: 6,
      type: "System",
      icon: "✓",
      title: "System",
      message: "Your weekly report is ready to view.",
      date: "2024-03-26",
      read: true,
      color: "#00B074",
    },
    {
      id: 7,
      type: "Promotion",
      icon: "📧",
      title: "Promotion",
      message: "Payment of 2.500 KWD successful.",
      date: "2024-03-28",
      read: true,
      color: "#7C3AED",
    },
    {
      id: 8,
      type: "System",
      icon: "⚠️",
      title: "System",
      message: "New discount available: 20% off next ride!",
      date: "2024-02-25",
      read: true,
      color: "#FFB800",
    },
  ];

  return (
    <div className="alerts-section">
      <div className="alerts-header">
        <h2>Notifications</h2>
        <button className="mark-read-btn">Mark all as read</button>
      </div>

      <div className="notifications-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-item ${!notif.read ? "unread" : "read"}`}
          >
            <div
              className="notif-icon"
              style={{
                backgroundColor: `${notif.color}20`,
                color: notif.color,
              }}
            >
              {notif.icon}
            </div>
            <div className="notif-content">
              <h3 className="notif-title">{notif.title}</h3>
              <p className="notif-message">{notif.message}</p>
            </div>
            <p className="notif-date">{notif.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
