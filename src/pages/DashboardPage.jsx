import AuthSection from "../components/AuthSection";
import BuyerFeed from "../components/BuyerFeed";
import FarmerForm from "../components/FarmerForm";
import SectionPanel from "../components/SectionPanel";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div className="rounded-2xl border border-accent-200/60 bg-gradient-to-br from-accent-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">
          Operations console
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Run your distress sale in one place
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Authenticate, publish urgent listings, and monitor the live buyer feed
          — same workflow you rely on, with a clearer layout.
        </p>
      </div>

      <SectionPanel title="Login / Signup" anchorId="account">
        <AuthSection />
      </SectionPanel>
      <SectionPanel title="Farmer Post" anchorId="post">
        <FarmerForm />
      </SectionPanel>
      <SectionPanel title="Buyer Flash Feed" anchorId="feed">
        <BuyerFeed />
      </SectionPanel>
    </div>
  );
}

export default DashboardPage;
