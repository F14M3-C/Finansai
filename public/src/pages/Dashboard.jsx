import TransactionsList from "../components/TranscationsList";
import CoreMetricsGrid from "../components/CoreMetricsGrid";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import RightSidebar from "../components/RightSidebar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import DashboardHero from "../components/DashboardHero";

function Dashboard() {

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <div className="drawer lg:drawer-open">
        <input className="drawer-toggle" id="my-drawer-2" type="checkbox" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Mobile Navbar */}
          <MobileNavbar />

          {/* Top Header */}
            <Header />

          <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
            
            {/* Dashboard Hero */}
            <DashboardHero />

              {/* Core Metrics Grid */}
              <CoreMetricsGrid />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Transactions List */}
              <TransactionsList />
              
              {/* Right Sidebar: Categories & Insight */}
              <RightSidebar />

            </div>
          </main>
        
        <Footer />
        </div>
        {/* Navigation Drawer (Sidebar) */}
        <SideBar />

      </div>
    </div>
  );
}


export default Dashboard;