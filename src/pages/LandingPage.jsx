import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRight, Leaf, ShieldCheck, Timer, TrendingUp, Users, Truck, IndianRupee } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      delay: 0,
    });
    // Refresh on window resize for responsive accuracy
    window.addEventListener("resize", () => AOS.refresh());
    return () => window.removeEventListener("resize", () => AOS.refresh());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream-50 overflow-hidden font-sans selection:bg-agri-green-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pb-20 pt-16 lg:pb-32 lg:pt-28 isolate">
          {/* Background Blob Layer */}
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
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 hidden sm:flex sm:justify-center" data-aos="fade-down" data-aos-delay="100">
                <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-soil-dark-600 ring-1 ring-soil-dark-900/10 hover:ring-soil-dark-900/20 bg-white/60 shadow-sm backdrop-blur-md">
                  Announcing new immediate payout network.{' '}
                  <Link to="/auth" className="font-semibold text-agri-green-600 ml-1">
                     <span className="absolute inset-0" aria-hidden="true" />
                     Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-display font-bold tracking-tight text-soil-dark-950 sm:text-7xl" data-aos="fade-up" data-aos-delay="200">
                Sell Your Harvest. <br/>
                <span className="text-agri-green-600">Faster Than Ever.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soil-dark-700" data-aos="fade-up" data-aos-delay="350">
                Direct from the field to local buyers. Post your urgent, time-sensitive crop listings and get offers immediately before anything spoils. 
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="500">
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
              <p className="mt-6 text-sm font-medium text-soil-dark-500" data-aos="fade-up" data-aos-delay="600">
                Join 10,000+ farmers and buyers nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="relative py-16 bg-soil-dark-950 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-agri-green-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-harvest-gold-500 rounded-full blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {[
                { value: "", label: "Active Farmers", icon: Users },
                { value: "", label: "Produce Traded", icon: IndianRupee },
                { value: "", label: "Sell-Through Rate", icon: TrendingUp },
                { value: "", label: "Avg. Sale Time", icon: Timer },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center gap-3"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100 + 100}
                >
                  <stat.icon className="h-8 w-8 text-harvest-gold-400" />
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-sm font-bold text-soil-dark-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16" data-aos="fade-up">
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
                <div
                  key={idx}
                  className="flex flex-col rounded-3xl bg-white p-8 shadow-card border border-soil-dark-100 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150 + 100}
                >
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

        {/* HOW IT WORKS SECTION */}
        <section className="bg-gradient-to-b from-agri-green-50/50 to-cream-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16" data-aos="fade-up">
              <h2 className="text-base font-bold leading-7 text-agri-green-600 tracking-wider uppercase">How It Works</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-soil-dark-950 sm:text-4xl">
                From field to buyer in three easy steps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-agri-green-300 via-harvest-gold-400 to-agri-green-300" aria-hidden="true" />
              
              {[
                {
                  step: "01",
                  title: "Post Your Listing",
                  desc: "Snap a photo, set your price in ₹, and define the urgency window. Your listing goes live instantly.",
                  gradient: "from-agri-green-500 to-agri-green-700",
                },
                {
                  step: "02",
                  title: "Buyers See & Bid",
                  desc: "Local buyers see your listing ordered by urgency. Serious buyers contact you directly within minutes.",
                  gradient: "from-harvest-gold-500 to-harvest-gold-700",
                },
                {
                  step: "03",
                  title: "Quick Pickup & Pay",
                  desc: "Coordinate pickup, hand over the produce, and get paid. Our platform ensures secure, verified transactions.",
                  gradient: "from-agri-green-600 to-agri-green-800",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center text-center"
                  data-aos="fade-up"
                  data-aos-delay={idx * 200 + 100}
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} text-white font-display text-2xl font-bold shadow-floating mb-6 relative z-10`}>
                    {step.step}
                  </div>
                  <div className="rounded-3xl bg-white p-8 shadow-card border border-soil-dark-100 hover:shadow-card-hover transition-all duration-300 w-full">
                    <h3 className="font-display text-xl font-bold text-soil-dark-950 mb-3">{step.title}</h3>
                    <p className="text-base leading-relaxed text-soil-dark-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-soil-dark-950 via-soil-dark-900 to-agri-green-950" />
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-agri-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-harvest-gold-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
            <div data-aos="zoom-in" data-aos-duration="600">
              <Truck className="mx-auto h-14 w-14 text-harvest-gold-400 mb-6" />
            </div>
            <h2
              className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Don't Let Your Harvest <br className="hidden sm:block" />
              <span className="text-harvest-gold-400">Go to Waste.</span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soil-dark-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Every hour counts when dealing with perishable produce. Join thousands of farmers who've already discovered a faster, smarter way to sell.
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <Link
                to="/auth"
                state={{ mode: "register" }}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-harvest-gold-500 px-10 py-5 text-base font-bold text-white shadow-floating transition-all duration-300 hover:-translate-y-1 hover:bg-harvest-gold-600 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-harvest-gold-500 focus:ring-offset-2 focus:ring-offset-soil-dark-950"
              >
                Create Free Account
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md px-10 py-5 text-base font-bold text-white ring-1 ring-inset ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-card-hover"
              >
                Explore Listings
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
