import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRight, Leaf, ShieldCheck, Timer } from "lucide-react";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50 overflow-hidden font-sans selection:bg-agri-green-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pb-20 pt-16 lg:pb-32 lg:pt-28 isolate">
          {/* Background Image Layer */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
             <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          
          {/* Farm BG */}
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <img 
              src="/images/hero_farm_bg_1775016466746.png" 
              alt="Farm Background" 
              className="h-full w-full object-cover object-center opacity-25 scale-105"
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/100" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-3xl text-center animate-fade-up">
              <div className="mb-8 hidden sm:flex sm:justify-center">
                <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-soil-dark-600 ring-1 ring-soil-dark-900/10 hover:ring-soil-dark-900/20 bg-white/60 shadow-sm backdrop-blur-md">
                  Announcing new immediate payout network.{' '}
                  <Link to="/auth" className="font-semibold text-agri-green-600 ml-1">
                     <span className="absolute inset-0" aria-hidden="true" />
                     Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-display font-bold tracking-tight text-soil-dark-950 sm:text-7xl">
                Sell Your Harvest. <br/>
                <span className="text-agri-green-600">Faster Than Ever.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soil-dark-700">
                Direct from the field to local buyers. Post your urgent, time-sensitive crop listings and get offers immediately before anything spoils. 
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  to="/auth"
                  state={{ mode: "register" }}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-harvest-gold-500 px-8 py-4 text-sm font-bold text-white shadow-floating transition-all duration-300 hover:-translate-y-1 hover:bg-harvest-gold-600 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-harvest-gold-500 focus:ring-offset-2"
                >
                  Start Selling Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-soil-dark-900 shadow-sm ring-1 ring-inset ring-soil-dark-200 transition-all duration-300 hover:-translate-y-1 hover:bg-soil-dark-50 hover:shadow-card-hover"
                >
                  Browse Market
                </Link>
              </div>
              <p className="mt-6 text-sm font-medium text-soil-dark-500">
                Join 10,000+ farmers and buyers nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-bold leading-7 text-agri-green-600 tracking-wider uppercase">Built for the Field</h2>
            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-soil-dark-950 sm:text-4xl">
              Everything you need to move produce.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: "Real-Time Urgency",
                  desc: "Listings automatically sort by expiration time so buyers see the most critical harvests first.",
                  icon: Timer,
                  color: "bg-red-50 text-red-600 border-red-200",
                },
                {
                  title: "Direct Verified Buyers",
                  desc: "We verify contact details so you only deal with serious individuals who are ready to purchase.",
                  icon: ShieldCheck,
                  color: "bg-harvest-gold-50 text-harvest-gold-600 border-harvest-gold-200",
                },
                {
                  title: "Freshness Guaranteed",
                  desc: "Move inventory faster, reducing waste and ensuring your premium crops reach the table fresh.",
                  icon: Leaf,
                  color: "bg-agri-green-50 text-agri-green-600 border-agri-green-200",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col rounded-3xl bg-white p-8 shadow-card border border-soil-dark-100 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group">
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-transform group-hover:scale-150 ${feature.color.split(' ')[0]}`} />
                  <dt className="flex items-center gap-x-3 text-lg font-bold text-soil-dark-950">
                    <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl border ${feature.color}`}>
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-relaxed text-soil-dark-600">
                    <p className="flex-auto">{feature.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
