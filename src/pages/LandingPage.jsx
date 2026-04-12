
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import PriceCard from "../components/PriceCard";
import SchemeCard from "../components/SchemeCard";
import { ArrowRight, Leaf, ShieldCheck, Timer, TrendingUp, Users, Truck, IndianRupee } from "lucide-react";
import mockMarketPrices from "../data/mockMarketPrices";
import governmentSchemes from "../data/governmentSchemes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function LandingPage() {
  const topPrices = mockMarketPrices.slice(0, 6);
  const topSchemes = governmentSchemes.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-cream-50 overflow-hidden font-sans selection:bg-agri-green-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative w-full pb-20 pt-16 lg:pb-32 lg:pt-28 isolate">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-agri-green-300 to-harvest-gold-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <img src="/images/hero_farm_bg_1775016466746.png" alt="" className="h-full w-full object-cover opacity-25 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream-50/95 via-cream-50/90 to-cream-50/100" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-8 hidden sm:flex sm:justify-center">
                <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-soil-dark-600 ring-1 ring-soil-dark-900/10 bg-white/60 shadow-sm backdrop-blur-md">
                  📊 Live mandi prices now available!{" "}
                  <Link to="/market-prices" className="font-semibold text-agri-green-600 ml-1">
                    Check prices &rarr;
                  </Link>
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl font-display font-bold tracking-tight text-soil-dark-950 sm:text-7xl">
                <span className="inline-block">Sell Fast.</span>{" "}
                <span className="inline-block text-agri-green-600">Buy Smart.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soil-dark-700">
                Direct from the field to local buyers. Post your urgent, time-sensitive crop listings and get offers immediately before anything spoils.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link to="/auth" state={{ mode: "register" }} className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-harvest-gold-500 px-8 py-4 text-sm font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-harvest-gold-600">
                  Start Selling Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/dashboard" className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-soil-dark-900 shadow-sm ring-1 ring-inset ring-soil-dark-200 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  Browse Market
                </Link>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-6 text-sm font-medium text-soil-dark-500">
                Join 10,000+ farmers and buyers nationwide.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────── */}
        <section className="relative py-16 bg-soil-dark-950 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-agri-green-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-harvest-gold-500 rounded-full blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <motion.div className="grid grid-cols-2 gap-8 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {[
                { value: "10,000+", label: "Active Farmers", icon: Users },
                { value: "₹4.2Cr+", label: "Produce Traded", icon: IndianRupee },
                { value: "94%", label: "Sell-Through Rate", icon: TrendingUp },
                { value: "<4 hrs", label: "Avg. Sale Time", icon: Timer },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center text-center gap-3">
                  <stat.icon className="h-8 w-8 text-harvest-gold-400" />
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm font-bold text-soil-dark-400 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MANDI PRICES PREVIEW ───────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-base font-bold text-agri-green-600 uppercase tracking-wider">Live Market Data</h2>
              <p className="mt-2 font-display text-3xl font-bold text-soil-dark-950 sm:text-4xl">
                📊 Today's Mandi Prices
              </p>
              <p className="mt-3 text-soil-dark-500 max-w-xl mx-auto">
                Real-time wholesale prices from mandis across India. All prices in ₹/quintal.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topPrices.map((p, i) => (
                <motion.div key={`${p.commodity}-${p.market}-${i}`} variants={fadeUp}>
                  <PriceCard data={p} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link to="/market-prices" className="inline-flex items-center gap-2 rounded-2xl bg-agri-green-600 px-8 py-4 text-sm font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700">
                View All Prices <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── GOVT SCHEMES PREVIEW ───────────────────────── */}
        <section className="bg-gradient-to-b from-soil-dark-50/50 to-cream-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center mb-12">
                <h2 className="text-base font-bold text-harvest-gold-600 uppercase tracking-wider">Farmer Benefits</h2>
                <p className="mt-2 font-display text-3xl font-bold text-soil-dark-950 sm:text-4xl">
                  🏛️ Government Schemes
                </p>
                <p className="mt-3 text-soil-dark-500 max-w-xl mx-auto">
                  Benefits you deserve. PM-KISAN, crop insurance, loans, and more.
                </p>
              </motion.div>
              <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {topSchemes.map((s) => (
                  <motion.div key={s.id} variants={fadeUp}>
                    <SchemeCard scheme={s} onAskBot={(scheme) => window.__kisanMitraAsk?.(`Tell me about ${scheme.name}`)} />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="text-center mt-10">
                <Link to="/government-schemes" className="inline-flex items-center gap-2 rounded-2xl border-2 border-soil-dark-200 bg-white px-8 py-4 text-sm font-bold text-soil-dark-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  View All Schemes <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ───────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-bold text-agri-green-600 uppercase tracking-wider">Built for the Field</h2>
              <p className="mt-2 font-display text-3xl font-bold text-soil-dark-950 sm:text-4xl">Everything you need to move produce.</p>
            </motion.div>
            <motion.div variants={stagger} className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 mx-auto">
              {[
                { title: "Real-Time Urgency", desc: "Listings sort by expiration so buyers see critical harvests first.", icon: Timer, color: "bg-red-50 text-red-600 border-red-200" },
                { title: "Direct Verified Buyers", desc: "Only serious individuals ready to purchase contact you.", icon: ShieldCheck, color: "bg-harvest-gold-50 text-harvest-gold-600 border-harvest-gold-200" },
                { title: "Freshness Guaranteed", desc: "Move inventory faster, reducing waste and ensuring fresh delivery.", icon: Leaf, color: "bg-agri-green-50 text-agri-green-600 border-agri-green-200" },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col rounded-3xl bg-white p-8 shadow-card border border-soil-dark-100 hover:shadow-card-hover transition-all duration-300 group">
                  <dt className="flex items-center gap-x-3 text-lg font-bold text-soil-dark-950">
                    <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl border ${f.color}`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    {f.title}
                  </dt>
                  <dd className="mt-6 text-base leading-relaxed text-soil-dark-600">{f.desc}</dd>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────── */}
        <section className="bg-gradient-to-b from-agri-green-50/50 to-cream-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-base font-bold text-agri-green-600 uppercase tracking-wider">How It Works</h2>
                <p className="mt-2 font-display text-3xl font-bold text-soil-dark-950 sm:text-4xl">From field to buyer in three easy steps.</p>
              </motion.div>
              <div className="grid gap-8 md:grid-cols-3 relative">
                <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-agri-green-300 via-harvest-gold-400 to-agri-green-300" aria-hidden />
                {[
                  { step: "01", title: "Post Your Listing", desc: "Type a product name, auto-detect image, set your price in ₹, and define urgency.", gradient: "from-agri-green-500 to-agri-green-700" },
                  { step: "02", title: "Buyers See & Bid", desc: "Local buyers see your listing. Chat directly and receive offers within minutes.", gradient: "from-harvest-gold-500 to-harvest-gold-700" },
                  { step: "03", title: "Quick Pickup & Pay", desc: "Coordinate pickup, hand over produce, get paid. Share details via WhatsApp.", gradient: "from-agri-green-600 to-agri-green-800" },
                ].map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="relative flex flex-col items-center text-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${s.gradient} text-white font-display text-2xl font-bold shadow-floating mb-6 relative z-10`}>
                      {s.step}
                    </div>
                    <div className="rounded-3xl bg-white p-8 shadow-card border border-soil-dark-100 hover:shadow-card-hover transition-all w-full">
                      <h3 className="font-display text-xl font-bold text-soil-dark-950 mb-3">{s.title}</h3>
                      <p className="text-base leading-relaxed text-soil-dark-600">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-soil-dark-950 via-soil-dark-900 to-agri-green-950" />
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-agri-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-harvest-gold-500/10 rounded-full blur-3xl" />
          </div>
          <motion.div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <Truck className="mx-auto h-14 w-14 text-harvest-gold-400 mb-6" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Don't Let Your Harvest <br className="hidden sm:block" />
              <span className="text-harvest-gold-400">Go to Waste.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-soil-dark-300">
              Every hour counts. Join thousands of farmers who've discovered a faster, smarter way to sell.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link to="/auth" state={{ mode: "register" }} className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-harvest-gold-500 px-10 py-5 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-harvest-gold-600">
                Create Free Account <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/dashboard" className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md px-10 py-5 text-base font-bold text-white ring-1 ring-inset ring-white/20 transition-all hover:-translate-y-1 hover:bg-white/20">
                Explore Listings
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
