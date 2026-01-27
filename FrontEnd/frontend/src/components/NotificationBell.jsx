import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const NotificationBell = ({ companies }) => {
  const [open, setOpen] = useState(false);

  // Helpers inside component
  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  const daysLeft = (dateStr) => {
    if (!dateStr) return null;
    return Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  };

  // Build alerts array using useMemo for efficiency
  const alerts = useMemo(() => {
    if (!companies || companies.length === 0) return [];

    return companies.flatMap((c) => {
      const hDays = daysLeft(c.hosting_expiry);
      const dDays = daysLeft(c.domain_expiry);

      const arr = [];

      // 🔴 Expired
      if (isExpired(c.hosting_expiry)) {
        arr.push({
          type: "danger",
          text: `${c.name} hosting expired`,
          link: `/companies/detail/${c.id}`,
        });
      }
      if (isExpired(c.domain_expiry)) {
        arr.push({
          type: "danger",
          text: `${c.name} domain expired`,
          link: `/companies/detail/${c.id}`,
        });
      }

      // 🟡 Expiring soon (1–3 days)
      if (hDays !== null && hDays > 0 && hDays <= 3) {
        arr.push({
          type: "warning",
          text: `${c.name} hosting expires in ${hDays} days`,
          link: `/companies/detail/${c.id}`,
        });
      }
      if (dDays !== null && dDays > 0 && dDays <= 3) {
        arr.push({
          type: "warning",
          text: `${c.name} domain expires in ${dDays} days`,
          link: `/companies/detail/${c.id}`,
        });
      }

      return arr;
    });
  }, [companies]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded">
            {alerts.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg p-3 z-50">
          <h4 className="font-semibold mb-2">Notifications</h4>

          {alerts.length ? (
            alerts.map((a, i) => (
              <Link
                key={i}
                to={a.link}
                className={`block text-sm mb-2 p-2 rounded hover:bg-gray-700
                  ${a.type === "danger"
                    ? "text-red-400"
                    : a.type === "warning"
                    ? "text-yellow-400"
                    : "text-green-400"}
                `}
              >
                {a.text}
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notifications 🎉</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
