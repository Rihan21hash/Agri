import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MobileSectionNav from "../components/MobileSectionNav";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-earth-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 min-h-0">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <MobileSectionNav />
          <main className="flex-1 overflow-y-auto px-4 pb-24 sm:px-6 lg:px-10 lg:pb-10">
            <div className="mx-auto max-w-5xl animate-fade-up py-6 lg:py-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
