import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";

const NotificationBell = ({ companies }) => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const isExpired = (dateStr) => dateStr && new Date(dateStr) < new Date();
  const daysLeft = (dateStr) =>
    dateStr ? Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24)) : null;

  const alerts = useMemo(() => {
    if (!companies) return [];
    return companies.flatMap((c) => {
      const hDays = daysLeft(c.hosting_expiry);
      const dDays = daysLeft(c.domain_expiry);
      const arr = [];

      if (isExpired(c.hosting_expiry))
        arr.push({ type: "danger", text: `${c.name} hosting expired`, link: `/companies/detail/${c.id}` });
      if (isExpired(c.domain_expiry))
        arr.push({ type: "danger", text: `${c.name} domain expired`, link: `/companies/detail/${c.id}` });

      if (hDays !== null && hDays > 0 && hDays <= 3)
        arr.push({ type: "warning", text: `${c.name} hosting expires in ${hDays} days`, link: `/companies/detail/${c.id}` });
      if (dDays !== null && dDays > 0 && dDays <= 3)
        arr.push({ type: "warning", text: `${c.name} domain expires in ${dDays} days`, link: `/companies/detail/${c.id}` });

      return arr;
    });
  }, [companies]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-white hover:text-gray-200"
      >
        <FiBell size={28} />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-2 rounded-full">
            {alerts.length}
          </span>
        )}
      </button>

      <div
        className={`absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg p-3 z-50 transform transition-all duration-200
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <h4 className="font-semibold mb-2">Notifications</h4>
        {alerts.length ? (
          alerts.map((a, i) => (
            <Link
              key={i}
              to={a.link}
              className={`block text-sm mb-2 p-2 rounded hover:bg-gray-700 ${
                a.type === "danger" ? "text-red-400" : a.type === "warning" ? "text-yellow-400" : "text-green-400"
              }`}
              onClick={() => setOpen(false)} // close on click
            >
              {a.text}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationBell;