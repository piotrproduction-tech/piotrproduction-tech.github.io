


// FE_FESTIVAL_NOTIFICATIONS_COMPONENT
import React from "react";
import "./FestivalNotifications.css";

export function FestivalNotifications({ notifications }) {
  return (
    <div className="festival-notifications">
      {notifications.map((n, i) => (
        <div key={i} className={"notif notif-" + n.type}>
          <div className="notif-title">{n.title}</div>
          <div className="notif-body">{n.message}</div>
        </div>
      ))}
    </div>
  );
}
