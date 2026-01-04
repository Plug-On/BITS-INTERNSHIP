
import Header from "./header";
import Sidebar from "./components/Sidebar";
import Footer from "./footer";

/*
  Updated Dashboard layout:
  - Header at top (keeps your existing Header import)
  - Left Sidebar (new Sidebar component)
  - Right main content area with the same auth / axios logic you already had
  - Tailwind based dark UI
*/

const Dashboard = () => {
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Keep your existing Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        
      </div>

    <Footer/>

    </div>

    
  );
};

export default Dashboard;