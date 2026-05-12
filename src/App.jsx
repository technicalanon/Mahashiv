import React, { useEffect, useMemo, useRef, useState } from "react";

const brandLogo = "https://i.ibb.co/xtxpN5nL/Untitled-design-1.png";

const statsKey = "mahashiv-enterprises-stats";

const insuranceServices = [
  "Health Insurance",
  "Life Insurance",
  "Vehicle Insurance",
  "Travel Insurance",
  "Business Insurance",
  "Claim Assistance",
];

const loanServices = [
  "Personal Loan",
  "Home Loan",
  "Business Loan",
  "Vehicle Loan",
  "Education Loan",
  "Loan Balance Transfer",
];

const insuranceCompanies = [
  "HDFC Ergo",
  "ICICI Lombard",
  "Star Health",
  "LIC",
  "Bajaj Allianz",
  "Tata AIG",
];

const serviceCardsBase = [
  {
    title: "Insurance",
    description: "Health, life, vehicle, and business insurance guidance.",
    action: "View Insurance Services",
    icon: "🛡️",
    dark: true,
  },
  {
    title: "Loans",
    description: "Support for personal, home, business, and vehicle loans.",
    action: "Explore Loan Options",
    icon: "💰",
    dark: false,
  },
  {
    title: "RTO Help",
    description: "Vehicle registration, RC transfer, NOC, and challan support.",
    action: "Get RTO Assistance",
    icon: "🚗",
    dark: true,
  },
];

function shuffleCards(cards) {
  const copiedCards = [...cards];
  for (let i = copiedCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedCards[i], copiedCards[j]] = [copiedCards[j], copiedCards[i]];
  }
  return copiedCards;
}

function loadStats() {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(statsKey);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

const defaultStats = {
  clicks: { Insurance: 0, Loans: 0, "RTO Help": 0 },
  focusSeconds: { Insurance: 0, Loans: 0, "RTO Help": 0 },
  leads: 0,
};

function BrandLogo({ className = "", compact = false }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-slate-900 to-slate-950 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm ${className}`}>
      <img
        src={brandLogo}
        alt="logombs Mahashiv Business Group logo"
        className={`h-full w-full object-contain scale-[1.35] opacity-95 mix-blend-screen drop-shadow-[0_0_45px_rgba(255,255,255,0.35)] contrast-125 brightness-125 saturate-150 transition-all duration-500 ${compact ? "p-0" : "p-1"}`}
      />
    </div>
  );
}

function SectionPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
      {children}
    </span>
  );
}


function ServiceDetailPanel({ selectedService, onClose }) {
  if (!selectedService) return null;

  const services = selectedService === "Insurance" ? insuranceServices : loanServices;
  const description =
    selectedService === "Insurance"
      ? "Compare plans, renew policies, get claim guidance, and choose suitable coverage from multiple insurance partners."
      : "Get support for loan eligibility, documents, application process, and bank/NBFC options based on your requirement.";

  return (
    <section id="service-details" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Selected Service</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{selectedService} Services</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                ✓
              </div>
              <h3 className="text-lg font-extrabold text-slate-950">{service}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Professional guidance, document support, and quick assistance for your requirement.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RtoHelpForm({ onLead }) {
  const [form, setForm] = useState({ name: "", mobile: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) return;
    setSubmitted(true);
    onLead();
    setForm({ name: "", mobile: "", description: "" });
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="rto-form" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-950 p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">RTO Help Desk</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Need RTO assistance?</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Submit your details and our team will help you with vehicle transfer, registration, renewal, challan, NOC, and other RTO-related support.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl bg-white/10 p-4">Vehicle Transfer Support</div>
            <div className="rounded-2xl bg-white/10 p-4">RC, NOC & Documentation</div>
            <div className="rounded-2xl bg-white/10 p-4">Fast Guidance & Follow-up</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-10">
          {submitted && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
              Thank you! Your RTO help request has been captured.
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
            <input
              value={form.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/[^A-Za-z ]/.test(value)) {
                  setNameError('Please enter a valid name using letters only');
                } else {
                  setNameError('');
                }
                setForm({ ...form, name: value.replace(/[^A-Za-z ]/g, '') });
              }}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:bg-white ${nameError ? 'border-red-500 bg-red-50 text-red-600 focus:border-red-500' : 'border-slate-200 bg-slate-50 focus:border-slate-950'}`}
              placeholder="Enter your full name"
              required
            />
            {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Mobile Number</label>
            <input
              value={form.mobile}
              onChange={(e) => {
                const value = e.target.value;
                if (/[^0-9]/.test(value)) {
                  setMobileError('Please enter a valid mobile number');
                } else {
                  setMobileError('');
                }
                setForm({ ...form, mobile: value.replace(/[^0-9]/g, '').slice(0,10) });
              }}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:bg-white ${mobileError ? 'border-red-500 bg-red-50 text-red-600 focus:border-red-500' : 'border-slate-200 bg-slate-50 focus:border-slate-950'}`}
              placeholder="Enter 10-digit mobile number"
              inputMode="numeric" pattern="[6-9]{1}[0-9]{9}"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-950 focus:bg-white"
              placeholder="Tell us what help you need..."
            />
          </div>
          <button className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:shadow-xl">
            Submit RTO Request
          </button>
        </form>
      </div>
    </section>
  );
}

function InsuranceCalculator() {
  const [calc, setCalc] = useState({
    type: "Health Insurance",
    cover: 500000,
    age: 30,
    years: 1,
    members: 1,
    vehicleValue: 500000,
  });
  const [premiumResult, setPremiumResult] = useState(null);
  const [apiStatus, setApiStatus] = useState("idle");

  function calculateLocalPremium(values) {
    const age = Number(values.age) || 30;
    const cover = Number(values.cover) || 0;
    const years = Number(values.years) || 1;
    const members = Number(values.members) || 1;
    const vehicleValue = Number(values.vehicleValue) || 0;

    let basePremium = 0;
    let note = "Estimated premium based on selected details.";

    if (values.type === "Health Insurance") {
      const ageRate = age <= 25 ? 0.008 : age <= 35 ? 0.011 : age <= 45 ? 0.016 : age <= 55 ? 0.024 : 0.035;
      const familyFactor = members <= 1 ? 1 : members === 2 ? 1.55 : members === 3 ? 1.95 : 2.35;
      basePremium = cover * ageRate * familyFactor;
      note = "Health estimate changes with age, members, city, medical history, and insurer.";
    }

    if (values.type === "Life Insurance") {
      const ageRate = age <= 30 ? 0.0045 : age <= 40 ? 0.0065 : age <= 50 ? 0.0105 : 0.0175;
      const termFactor = years >= 20 ? 1.25 : years >= 10 ? 1.1 : 1;
      basePremium = cover * ageRate * termFactor;
      note = "Life insurance estimate depends on age, term, income, health, smoking status, and underwriting.";
    }

    if (values.type === "Vehicle Insurance") {
      const vehicleRate = vehicleValue <= 300000 ? 0.028 : vehicleValue <= 800000 ? 0.032 : 0.038;
      basePremium = vehicleValue * vehicleRate;
      note = "Vehicle estimate depends on IDV, model, fuel type, RTO city, NCB, add-ons, and insurer.";
    }

    const gst = basePremium * 0.18;
    const total = Math.round(basePremium + gst);
    const monthly = Math.round(total / 12);

    return {
      yearlyPremium: total,
      monthlyPremium: monthly,
      basePremium: Math.round(basePremium),
      gst: Math.round(gst),
      note,
    };
  }

  async function handleCalculatePremium() {
    setApiStatus("loading");
    setPremiumResult(null);

    try {
      // Free public API call used only to simulate an API-connected calculator.
      // Real insurance premium APIs are usually paid/private and require an insurer or aggregator API key.
      const response = await fetch("https://dummyjson.com/http/200/insurance-premium-calculated");
      if (!response.ok) throw new Error("Free API unavailable");

      const result = calculateLocalPremium(calc);
      setPremiumResult({ ...result, source: "Free API connected + local estimate" });
      setApiStatus("success");
    } catch (error) {
      const result = calculateLocalPremium(calc);
      setPremiumResult({ ...result, source: "Fallback estimate" });
      setApiStatus("fallback");
    }
  }

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Insurance Calculator</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Calculate estimated premium with API flow.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Select insurance type and enter details. The calculator connects with a free public API for demo flow and then shows a practical estimated premium.
          </p>

          <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
            <p className="text-sm font-bold text-slate-300">Estimated Premium</p>
            {premiumResult ? (
              <>
                <p className="mt-2 text-5xl font-black">₹{premiumResult.yearlyPremium.toLocaleString("en-IN")}</p>
                <p className="mt-3 text-sm text-slate-300">Approx. yearly premium • ₹{premiumResult.monthlyPremium.toLocaleString("en-IN")}/month</p>
                <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4">Base: ₹{premiumResult.basePremium.toLocaleString("en-IN")}</div>
                  <div className="rounded-2xl bg-white/10 p-4">GST 18%: ₹{premiumResult.gst.toLocaleString("en-IN")}</div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-400">{premiumResult.note}</p>
                <p className="mt-2 text-xs font-bold text-emerald-300">Source: {premiumResult.source}</p>
              </>
            ) : (
              <>
                <p className="mt-2 text-4xl font-black">Click Calculate</p>
                <p className="mt-3 text-sm text-slate-300">Enter details and get estimated premium.</p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Insurance Type</label>
              <select
                value={calc.type}
                onChange={(e) => setCalc({ ...calc, type: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
              >
                <option>Health Insurance</option>
                <option>Life Insurance</option>
                <option>Vehicle Insurance</option>
              </select>
            </div>

            {calc.type !== "Vehicle Insurance" && (
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Coverage Amount</label>
                <input
                  type="number"
                  min="100000"
                  value={calc.cover}
                  onChange={(e) => setCalc({ ...calc, cover: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  placeholder="Example: 500000"
                />
              </div>
            )}

            {calc.type === "Vehicle Insurance" && (
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Vehicle Value / IDV</label>
                <input
                  type="number"
                  min="50000"
                  value={calc.vehicleValue}
                  onChange={(e) => setCalc({ ...calc, vehicleValue: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  placeholder="Example: 500000"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Age</label>
              <input
                type="number"
                min="18"
                max="80"
                value={calc.age}
                onChange={(e) => setCalc({ ...calc, age: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                placeholder="Example: 30"
              />
            </div>

            {calc.type === "Health Insurance" && (
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Members Covered</label>
                <select
                  value={calc.members}
                  onChange={(e) => setCalc({ ...calc, members: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                >
                  <option value="1">1 Member</option>
                  <option value="2">2 Members</option>
                  <option value="3">3 Members</option>
                  <option value="4">4+ Members</option>
                </select>
              </div>
            )}

            {calc.type === "Life Insurance" && (
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Policy Term / Years</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={calc.years}
                  onChange={(e) => setCalc({ ...calc, years: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  placeholder="Example: 20"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleCalculatePremium}
              disabled={apiStatus === "loading"}
              className="mt-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
            >
              {apiStatus === "loading" ? "Calculating..." : "Calculate Premium"}
            </button>

            {apiStatus === "success" && <p className="text-sm font-semibold text-emerald-700">API connected successfully.</p>}
            {apiStatus === "fallback" && <p className="text-sm font-semibold text-amber-700">Free API was unavailable, fallback estimate is shown.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MahashivEnterprisesLandingPage() {
  const insuranceRef = useRef(null);
  const loansRef = useRef(null);
  const rtoRef = useRef(null);

  const [serviceCards, setServiceCards] = useState(serviceCardsBase);
  const [selectedService, setSelectedService] = useState(null);
  const [showRtoForm, setShowRtoForm] = useState(false);
  const [stats, setStats] = useState(() => loadStats() || defaultStats);
  const [contact, setContact] = useState({ name: "", phone: "", service: "Insurance", budget: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactNameError, setContactNameError] = useState('');
  const [contactPhoneError, setContactPhoneError] = useState('');
  

  useEffect(() => {
    window.localStorage.setItem(statsKey, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setServiceCards((currentCards) => shuffleCards(currentCards));
    }, 4500);

    return () => clearInterval(shuffleInterval);
  }, []);

  useEffect(() => {
    const sections = [
      { name: "Insurance", ref: insuranceRef },
      { name: "Loans", ref: loansRef },
      { name: "RTO Help", ref: rtoRef },
    ];

    let visibleSection = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) visibleSection = visible.target.getAttribute("data-section");
      },
      { threshold: [0.35, 0.5, 0.75] }
    );

    sections.forEach(({ ref }) => ref.current && observer.observe(ref.current));

    const interval = setInterval(() => {
      if (visibleSection) {
        setStats((prev) => ({
          ...prev,
          focusSeconds: {
            ...prev.focusSeconds,
            [visibleSection]: (prev.focusSeconds[visibleSection] || 0) + 1,
          },
        }));
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const smartInsight = useMemo(() => {
    const scores = Object.keys(stats.clicks).map((key) => ({
      name: key,
      score: stats.clicks[key] * 3 + Math.round((stats.focusSeconds[key] || 0) / 5),
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores[0]?.score > 0 ? scores[0].name : "No clear winner yet";
  }, [stats]);

  const maxClicks = Math.max(1, ...Object.values(stats.clicks));
  const maxFocus = Math.max(1, ...Object.values(stats.focusSeconds));

  function trackClick(section) {
    setStats((prev) => ({
      ...prev,
      clicks: { ...prev.clicks, [section]: prev.clicks[section] + 1 },
    }));
  }

  function getSectionRef(section) {
    if (section === "Insurance") return insuranceRef;
    if (section === "Loans") return loansRef;
    return rtoRef;
  }

  function handleCardClick(section) {
    trackClick(section);
    if (section === "Insurance" || section === "Loans") {
      setSelectedService(section);
      setShowRtoForm(false);
      setTimeout(() => document.getElementById("service-details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
    if (section === "RTO Help") {
      setShowRtoForm(true);
      setSelectedService(null);
      setTimeout(() => document.getElementById("rto-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }

  function manualShuffleCards() {
    setServiceCards((currentCards) => shuffleCards(currentCards));
  }

  async function handleContactSubmit(e) {
  e.preventDefault();

  if (!contact.name.trim() || !contact.phone.trim()) return;

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxJlpQvQk5FldhL7Ul9cuEare_Puzw_yWf4mdevQ6G23r_XcmGcv5E_1kssB3exGnMdLQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          service: contact.service,
          budget: contact.budget,
          message: contact.message,
        }),
      }
    );

    setContactSuccess(true);

    setStats((prev) => ({
      ...prev,
      leads: prev.leads + 1,
    }));

    setContact({
      name: "",
      phone: "",
      service: "Insurance",
      budget: "",
      message: "",
    });

    setTimeout(() => setContactSuccess(false), 3000);

  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
}

  function resetAnalytics() {
    setStats(defaultStats);
    window.localStorage.removeItem(statsKey);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <style>{`
        html, body, * { cursor: auto; }
        .cursor-shadow {
          position: fixed;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          pointer-events: none;
          background: rgba(0,0,0,0.18);
          filter: blur(10px);
          transform: translate(-50%, -50%);
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .click-hover:hover ~ .cursor-shadow {
          opacity: 1;
        }
        html { scroll-behavior: smooth; }
        button, a, select, input, textarea { 
          cursor: pointer; 
          position: relative; 
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        button:hover {
          box-shadow: 0 8px 18px rgba(140,140,140,0.16);
          transition: all 0.25s ease;
        }
        p:hover, h1:hover, h2:hover, h3:hover, h4:hover, span:hover {
          color: #1e293b;
          transition: color 0.2s ease;
        }
        nav a:hover {
          text-shadow: 0 0 8px rgba(180,180,180,0.35);
          color: #0f172a;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes shufflePop { 0% { opacity: 0; transform: translateY(18px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .shuffle-card { animation: shufflePop 0.55s ease both; }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <BrandLogo className="h-16 w-32" compact />
            <div>
              <p className="text-lg font-black leading-none tracking-tight">Mahashiv Enterprises</p>
              <p className="text-xs font-semibold text-slate-500">Insurance • Loans • RTO Help</p>
            </div>
          </a>
          <div className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <a className="hover:text-slate-950" href="#about">About</a>
            <a className="hover:text-slate-950" href="#services">Services</a>
            <a className="hover:text-slate-950" href="#calculator">Calculator</a>
            <a className="hover:text-slate-950" href="#why">Why Us</a>
            <a className="hover:text-slate-950" href="#contact">Contact</a>
          </div>
          <a href="#contact" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg">
            Get Help
          </a>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden bg-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-slate-200 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap gap-3">
              <SectionPill>Trusted Business Assistance</SectionPill>
              <SectionPill>Fast Support</SectionPill>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Simple help for <span className="rounded-3xl bg-slate-950 px-3 text-white">Insurance</span>, Loans & RTO work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Mahashiv Enterprises provides professional assistance for insurance plans, loan guidance, and RTO-related support with quick response and clear documentation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#services" className="rounded-2xl bg-slate-950 px-7 py-4 text-center text-base font-black text-white transition hover:-translate-y-1 hover:shadow-xl">
                Explore Services
              </a>
              <a href="#contact" className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center text-base font-black text-slate-950 transition hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl">
                Contact Now
              </a>
              <a href="#calculator" className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center text-base font-black text-slate-950 transition hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl">
                Insurance Calculator
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-5 shadow-2xl shadow-slate-200/70">
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <BrandLogo className="h-32 w-full sm:w-80" />
                <span className="rounded-full bg-white/10 px-4 py-2 text-center text-xs font-bold">Live Business Desk</span>
              </div>
              <h2 className="text-3xl font-black">One place for your daily financial & vehicle service needs.</h2>
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-white p-5 text-slate-950">
                  <p className="text-sm font-bold text-slate-500">Main Services</p>
                  <p className="mt-1 text-2xl font-black">Insurance • Loans • RTO</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-black">12+</p>
                    <p className="text-xs text-slate-300">Insurance Types</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-black">10+</p>
                    <p className="text-xs text-slate-300">Loan Options</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-black">3</p>
                    <p className="text-xs text-slate-300">Core Services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Choose a service</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Main Service Sections</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Cards auto-shuffle every few seconds. Click any card to open the related service details or inquiry form.</p>
          </div>
          <button
            type="button"
            onClick={manualShuffleCards}
            className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl"
          >
            Shuffle Cards 🔄
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {serviceCards.map((card, index) => (
            <button
              key={card.title}
              ref={getSectionRef(card.title)}
              data-section={card.title}
              onClick={() => handleCardClick(card.title)}
              className={`shuffle-card group min-h-80 rounded-[2rem] p-8 text-left shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                card.dark
                  ? "border border-slate-950 bg-slate-950 text-white shadow-slate-300/60"
                  : "border border-slate-200 bg-white text-slate-950 shadow-slate-200/50 hover:border-slate-950"
              }`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`mb-10 flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${card.dark ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}>
                {card.icon}
              </div>
              <h3 className={`text-5xl font-black tracking-tight ${card.dark ? "text-white" : "text-slate-950"}`}>{card.title}</h3>
              <p className={`mt-5 text-base leading-7 ${card.dark ? "text-slate-300" : "text-slate-600"}`}>{card.description}</p>
              <p className={`mt-8 text-sm font-black uppercase tracking-[0.2em] ${card.dark ? "text-white" : "text-slate-950"}`}>{card.action}</p>
            </button>
          ))}
        </div>
      </section>

      <ServiceDetailPanel selectedService={selectedService} onClose={() => setSelectedService(null)} />
      {showRtoForm && <RtoHelpForm onLead={() => setStats((prev) => ({ ...prev, leads: prev.leads + 1 }))} />}

      <InsuranceCalculator />

      <section className="overflow-hidden bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Insurance tie-ups</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Insurance company logo section</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">Replace these placeholder names with actual company logo images later. Main business logo is already added from your uploaded image.</p>
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee-track flex w-max gap-4 px-4">
            {[...insuranceCompanies, ...insuranceCompanies].map((company, index) => (
              <div key={`${company}-${index}`} className="flex h-24 min-w-52 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 text-center text-lg font-black text-slate-700">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">About Mahashiv Enterprises</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Professional support with simple process and clear guidance.</h2>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/50">
            <p className="text-lg leading-8 text-slate-600">
              Mahashiv Enterprises helps customers with insurance, loan, and RTO-related services. Our goal is to make the process easy, transparent, and quick by guiding customers through options, documentation, and next steps.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-black">Quick</p>
                <p className="mt-1 text-sm text-slate-500">Response</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-black">Clear</p>
                <p className="mt-1 text-sm text-slate-500">Guidance</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-black">Easy</p>
                <p className="mt-1 text-sm text-slate-500">Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">Why Choose Us</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Built for trust, speed, and support.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Multiple Options", "Tie-ups and assistance across many insurance and finance partners."],
              ["Documentation Help", "Step-by-step guidance for required documents and process."],
              ["Personal Support", "Direct communication and follow-up for your requirement."],
              ["Simple Process", "Easy inquiry forms and clean service flow for faster action."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/10 p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-slate-950">✓</div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Contact Mahashiv Enterprises</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Tell us what service you need.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Fill the contact box and our team in Indore will connect with you for insurance, loan, or RTO-related assistance.
            </p>
            <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <BrandLogo className="h-24 w-full sm:w-64" compact />
                <div>
                  <p className="text-xl font-black">Mahashiv Enterprises</p>
                  <a className="text-sm text-slate-300 hover:text-white" href="tel:+918982251114">Call: +91 8982251114</a>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">Email: mahashiv.ent14@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            {contactSuccess && (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                Thank you! Your message has been submitted successfully.
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
                <input
                  value={contact.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^A-Za-z ]/.test(value)) {
                      setContactNameError('Please enter a valid name using letters only');
                    } else {
                      setContactNameError('');
                    }
                    setContact({ ...contact, name: value.replace(/[^A-Za-z ]/g, '') });
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  placeholder="Your name"
                  required
                />
                {contactNameError && <p className="mt-1 text-sm text-red-500">{contactNameError}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Phone Number</label>
                <input
                  value={contact.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^0-9]/.test(value)) {
                      setContactPhoneError('Please enter a valid mobile number');
                    } else {
                      setContactPhoneError('');
                    }
                    setContact({ ...contact, phone: value.replace(/[^0-9]/g, '').slice(0,10) });
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  placeholder="Enter 10-digit Indian mobile number"
                  inputMode="numeric" pattern="[6-9]{1}[0-9]{9}"
                  required
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">Service Selection</label>
              <select
                value={contact.service}
                onChange={(e) => setContact({ ...contact, service: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
              >
                <option>Insurance</option>
                <option>Loans</option>
                <option>RTO Help</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">Client Budget</label>
              <select
                value={contact.budget}
                onChange={(e) => setContact({ ...contact, budget: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                required
              >
                <option value="">Select client budget</option>
                <option>Below ₹10,000</option>
                <option>₹10,000 - ₹50,000</option>
                <option>₹50,000 - ₹1,00,000</option>
                <option>₹1,00,000 - ₹5,00,000</option>
                <option>Above ₹5,00,000</option>
                <option>Need guidance</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">Message</label>
              <textarea
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                placeholder="Write your requirement..."
              />
            </div>
            <button className="mt-6 w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:shadow-xl">
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <BrandLogo className="h-24 w-full sm:w-64" compact />
              <div>
                <p className="text-xl font-black">Mahashiv Enterprises</p>
                <p className="text-sm text-slate-400">Insurance • Loans • RTO Help</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">
              Mahashiv Enterprises is a proud part of the Mahashiv Business Group, focused on providing trusted assistance in Insurance, Loans, and RTO-related services with transparency, reliability, and customer-first support.</p>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Services</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <button type="button" onClick={() => handleCardClick("Insurance")} className="text-left hover:text-white">Insurance</button>
              <button type="button" onClick={() => handleCardClick("Loans")} className="text-left hover:text-white">Loans</button>
              <button type="button" onClick={() => handleCardClick("RTO Help")} className="text-left hover:text-white">RTO Help</button>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Contact</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <a className="hover:text-white" href="tel:+918982251114">+91 8982251114</a>
              <a className="hover:text-white" href="mailto:mahashiv.ent14@gmail.com">mahashiv.ent14@gmail.com</a>
              <p>Madhya Pradesh, India</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Mahashiv Enterprises. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
