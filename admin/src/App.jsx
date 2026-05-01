import { useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    dashboard: <Dashboard />,
    users : <Users />,
    analytics: <Analytics />,
    orders : <Orders/>,
    settings: <Settings />
  };

  return (
    <div className="flex h-screen bg-[#0f0f13] text-white overflow-hidden font-sans">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0f0f13]">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
}

export default App;
