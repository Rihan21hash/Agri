import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MobileSectionNav from "../components/MobileSectionNav";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50 overflow-hidden">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 min-h-[0px]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col relative h-[calc(100vh-73px)]">
          <MobileSectionNav />
          <main className="flex-1 overflow-y-auto px-4 pb-32 sm:px-6 lg:px-10 lg:pb-12 scroll-smooth">
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
