import { useNavigate, useLocation } from "react-router";

export default function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Analytics", path: "/analytics" },
    { name: "Orders", path: "/orders" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-[#141418] text-white">
      <div className="p-4 font-bold">Admin Panel</div>

      <ul className="flex flex-col gap-2 p-2">
        {menu.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2 rounded-lg transition
                ${
                  location.pathname === item.path
                    ? "bg-violet-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-white/10"
                }
              `}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
