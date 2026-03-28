import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-white to-earth-50">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-earth-200/60">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234a3728' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:py-28 lg:text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-800">
              Field to table
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-earth-950 sm:text-5xl">
              Farmers selling directly.
              <span className="block text-accent-800">Buyers responding fast.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-earth-700">
              Post urgent crop listings with clear pricing and windows. Browse a live
              market of available harvest — same distress-sale workflow, refined for the
              field.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/auth"
                className="inline-flex min-w-[10rem] items-center justify-center rounded-xl bg-earth-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-earth-900/15 transition hover:-translate-y-0.5 hover:bg-earth-800 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
              >
                Login
              </Link>
              <Link
                to="/auth"
                state={{ mode: "register" }}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-xl border-2 border-accent-600 bg-white px-8 py-3.5 text-sm font-semibold text-accent-900 transition hover:-translate-y-0.5 hover:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
              >
                Get started
              </Link>
            </div>
            <p className="mt-8 text-sm text-earth-500">
              No account? Get started creates your seller profile in seconds.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Live market",
                body: "Real-time listings with urgency so buyers see what matters first.",
              },
              {
                title: "Trusted sellers",
                body: "Email sign-in and profiles keep the loop accountable.",
              },
              {
                title: "Close the loop",
                body: "Mark interest when a deal lands — listings update for everyone.",
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-earth-200/80 bg-white/80 p-6 shadow-soft"
              >
                <h3 className="font-display text-lg font-semibold text-earth-950">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-earth-600">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
