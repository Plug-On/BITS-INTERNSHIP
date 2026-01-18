
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
    <div> 
      {/* <Header/> */}

    <div className="flex flex-1">

      {/* LEFT SIDE – Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar/>
      </div>

      {/* RIGHT SIDE – Content */}
        <div className="flex-1 overflow-auto bg-gray-900 p-6">
            <div className="bg-gray-800 rounded shadow p-6 min-h-[80vh]">
                <h2 className="text-2xl text-white font-semibold mb-4">
                  Dashboard
                </h2>

                <p className="text-white">
                  Your main page content goes here.
                </p>
            </div>
        </div>
    </div>
    {/* <Footer/> */}
    </div>
    
  );
};

export default Dashboard;