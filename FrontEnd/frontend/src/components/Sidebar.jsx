import React from "react";

/*
  Simple Sidebar component (Tailwind).
  Save this as src/components/Sidebar.jsx and import from Dashboard.
*/

const NavItem = ({ children, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2 rounded-md ${
      active ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800"
    }`}
    aria-current={active ? "page" : undefined}
  >
    <span className="w-5 h-5 text-gray-300">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M4 12h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span className="font-medium">{children}</span>
  </a>
);

export default function Sidebar() {
  const events = [
    { title: "Bear Hug: Live in Concert", date: "Fri, Feb 12 • 8:00pm" },
    { title: "Viking People", date: "Sun, Feb 14 • 7:00pm" },
    { title: "Six Fingers — DJ Set", date: "Sat, Feb 20 • 11:00pm" },
    { title: "We All Look The Same", date: "Thu, Mar 3 • 9:00pm" },
  ];

  return (
    <aside className="w-64 bg-[#0f1720] border-r border-gray-800 flex flex-col">
      {/* Top: logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12c4-4 8-4 12 0s8 4 12 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-lg font-semibold">Tailwind Labs</div>
        <button className="ml-auto text-gray-400 hover:text-gray-200" aria-label="More">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="px-2 py-3 space-y-1" role="navigation" aria-label="Main navigation">
        <NavItem>Dashboard</NavItem>
        <NavItem active>Events</NavItem>
        <NavItem>Orders</NavItem>
        <NavItem>Broadcasts</NavItem>
        <NavItem>Settings</NavItem>
      </nav>

      <div className="border-t border-gray-800 mt-3"></div>

      {/* scrollable list */}
      <div className="px-4 py-3 overflow-y-auto sidebar-scroll flex-1">
        <p className="text-sm text-gray-400 uppercase mb-3">Upcoming Events</p>

        <ul className="space-y-6">
          {events.map((e, idx) => (
            <li key={idx}>
              <a href="#" className="block text-white font-semibold hover:text-sky-300">
                {e.title}
              </a>
              <div className="text-xs text-gray-400">{e.date}</div>
            </li>
          ))}

          {/* filler items to show scrollbar */}
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={"f" + i}>
              <a className="text-gray-200 hover:text-white" href="#">
                Event {i + 5}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* pinned profile at bottom */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 text-left rounded-md hover:bg-gray-800 p-2">
          <img
            src="https://images.unsplash.com/photo-1542156822-6924d8e6f47b?auto=format&fit=crop&w=64&q=60"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="font-medium">Erica</div>
            <div className="text-xs text-gray-400">erica@example.com</div>
          </div>
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>
    </aside>
  );
}