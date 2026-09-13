import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList } from 'recharts';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';
import { Bot, X, Sparkles } from 'lucide-react';

// --- DATA ARRAYS ---
const convergentData = [
  { name: 'STEM', Desired: 36.6, Aptitude: 20.0, Full: 9.8 },
  { name: 'ABM', Desired: 29.4, Aptitude: 15.1, Full: 6.0 },
  { name: 'HUMSS', Desired: 44.5, Aptitude: 42.6, Full: 12.8 },
  { name: 'GAS', Desired: 17.0, Aptitude: 14.3, Full: 3.8 },
  { name: 'Arts & Design', Desired: 15.1, Aptitude: 11.7, Full: 2.6 },
  { name: 'Sports', Desired: 12.1, Aptitude: 8.7, Full: 3.8 },
  { name: 'Home Econ.', Desired: 3.8, Aptitude: 3.4, Full: 0.8 },
  { name: 'ICT', Desired: 3.4, Aptitude: 2.6, Full: 1.5 },
  { name: 'Info. Arts', Desired: 2.3, Aptitude: 0.8, Full: 0.8 },
  { name: 'Agro', Desired: 0, Aptitude: 0, Full: 0 },
];

const humssData = [
  { name: 'Desired', Value: 44.5 },
  { name: 'Aptitude', Value: 42.6 },
  { name: 'Interest', Value: 14.7 },
  { name: 'Full Consistency', Value: 12.8 },
];

const divergentData = [
  { name: 'STEM', Desired: 47.9, Aptitude: 3.0 },
  { name: 'ABM', Desired: 38.1, Aptitude: 7.9 },
  { name: 'HUMSS', Desired: 4.5, Aptitude: 40.4 },
  { name: 'GAS', Desired: 1.5, Aptitude: 56.2 },
  { name: 'Arts', Desired: 5.7, Aptitude: 33.2 },
  { name: 'Sports', Desired: 17.0, Aptitude: 40.8 },
  { name: 'HE', Desired: 3.4, Aptitude: 44.9 },
  { name: 'ICT', Desired: 10.2, Aptitude: 20.8 },
  { name: 'Info. Arts', Desired: 3.8, Aptitude: 22.3 },
  { name: 'Agro', Desired: 1.9, Aptitude: 49.1 },
];

const stemData = [
  { name: 'Desired', Desired: 47.9, Aptitude: 0, Interest: 0 },
  { name: 'Aptitude', Desired: 0, Aptitude: 3.0, Interest: 0 },
  { name: 'Interest', Desired: 0, Aptitude: 0, Interest: 7.9 },
];

const gasData = [
  { name: 'Desired', Desired: 1.5, Aptitude: 0, Interest: 0 },
  { name: 'Aptitude', Desired: 0, Aptitude: 56.2, Interest: 0 },
  { name: 'Interest', Desired: 0, Aptitude: 0, Interest: 30.6 },
];

const untappedData = [
  { name: 'Sports', Desired: 17.0, Aptitude: 40.8 },
  { name: 'Agro-Fishery', Desired: 1.9, Aptitude: 49.1 },
];

const selStrengthsData = [
  { name: 'Grades 1-3', 'Teacher-Student': 4.10, 'Physical Surroundings': 4.04, 'Social Awareness': 3.91 },
  { name: 'Grades 4-6', 'Teacher-Student': 4.15, 'Physical Surroundings': 4.31, 'Social Awareness': 4.18 },
  { name: 'Grades 7-9', 'Teacher-Student': 3.88, 'Physical Surroundings': 4.07, 'Social Awareness': 4.05 },
];

const selGritData = [
  { name: 'Grades 1-3', 'Teacher-Student Connection': 4.10, 'Physical Surroundings': 4.04, 'Grit': 3.40 },
  { name: 'Grades 4-6', 'Teacher-Student Connection': 4.15, 'Physical Surroundings': 4.31, 'Grit': 3.60 },
  { name: 'Grades 7-9', 'Teacher-Student Connection': 3.88, 'Physical Surroundings': 4.07, 'Grit': 3.60 },
];

const selDipData = [
  { name: 'Grades 1-3', 'Sense of Belonging': 3.89, 'Self-Efficacy': 3.63 },
  { name: 'Grades 4-6', 'Sense of Belonging': 3.72, 'Self-Efficacy': 3.66 },
  { name: 'Grades 7-9', 'Sense of Belonging': 3.51, 'Self-Efficacy': 3.48 },
];

const selCyberData = [
  { name: 'Gr 1-3', Value: 3.62 },
  { name: 'Gr 4-6', Value: 4.01 },
  { name: 'Gr 7-9', Value: 3.66 },
];

// FIXED: Adjusted names to precisely match the filter state ('Sec A' instead of 'Section A')
const mathSectionData = [
  { name: 'Sec A', 'Not Met': 6, 'Progressing': 68, 'Proficient': 21, 'Highly Proficient': 6 },
  { name: 'Sec B', 'Not Met': 6, 'Progressing': 45, 'Proficient': 39, 'Highly Proficient': 10 },
  { name: 'Sec C', 'Not Met': 9, 'Progressing': 48, 'Proficient': 39, 'Highly Proficient': 3 },
  { name: 'Sec D', 'Not Met': 10, 'Progressing': 39, 'Proficient': 48, 'Highly Proficient': 3 },
];

const sciSectionData = [
  { name: 'Sec A', 'Not Met': 0, 'Progressing': 35, 'Proficient': 56, 'Highly Proficient': 9 },
  { name: 'Sec B', 'Not Met': 0, 'Progressing': 42, 'Proficient': 55, 'Highly Proficient': 3 },
  { name: 'Sec C', 'Not Met': 3, 'Progressing': 42, 'Proficient': 55, 'Highly Proficient': 0 },
  { name: 'Sec D', 'Not Met': 0, 'Progressing': 48, 'Proficient': 48, 'Highly Proficient': 3 },
];

const crossSubjectData = [
  { name: 'Not Met', Math: 7.8, Science: 0.8 },
  { name: 'Progressing', Math: 50.4, Science: 41.9 },
  { name: 'Proficient', Math: 36.4, Science: 53.5 },
  { name: 'Highly Proficient', Math: 5.4, Science: 3.9 },
];

const selTable = [
  { dim: 'Teacher-Student Connection', g1: '4.10', g4: '4.15', g7: '3.88', trend: 'Peaks mid, dips JHS' },
  { dim: 'Physical Surroundings', g1: '4.04', g4: '4.31', g7: '4.07', trend: 'Consistently high' },
  { dim: 'Social Awareness', g1: '3.91', g4: '4.18', g7: '4.05', trend: 'Strong throughout' },
  { dim: 'Self-Management', g1: '3.86', g4: '3.94', g7: '3.83', trend: 'Stable' },
  { dim: 'Sense of Belonging', g1: '3.89', g4: '3.72', g7: '3.51', trend: 'Linear decline' },
  { dim: 'School Safety', g1: '3.71', g4: '3.76', g7: '3.61', trend: 'Moderate-high' },
  { dim: 'Self-Awareness', g1: '3.68', g4: '3.77', g7: '3.67', trend: 'Stable' },
  { dim: 'Self-Efficacy', g1: '3.63', g4: '3.66', g7: '3.48', trend: 'Lowest in JHS' },
  { dim: 'Cyber & Social Media Safety', g1: '3.62', g4: '4.01', g7: '3.66', trend: 'U-shaped' },
  { dim: 'Growth Mindset', g1: '3.55', g4: '3.63', g7: '3.56', trend: 'Area for growth' },
  { dim: 'Grit', g1: '3.40', g4: '3.60', g7: '3.60', trend: 'Lowest overall' },
];

// --- CUSTOM COMPONENTS ---

const GlassTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/85 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 z-50 relative">
        <p className="font-bold text-slate-800 mb-2 border-b border-gray-200 pb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-semibold py-1">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BenchmarkGauge = ({ title, scoreText, scoreValue, benchValue, type }) => {
  const isStrength = type === 'strength';
  const fillColor = isStrength ? '#42825f' : '#db5a5a';
  const badgeText = isStrength ? 'Exceeding Benchmark' : 'Critical Intervention Gap';
  const badgeColor = isStrength ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200';

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative w-full bento-card hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="pr-4">
          <h4 className="font-bold text-gray-900 text-lg leading-tight">{title}</h4>
          <p className="text-sm text-gray-500 font-medium mt-1">Score: <span style={{ color: fillColor }} className="font-bold">{scoreText}</span></p>
        </div>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border whitespace-nowrap ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      <div className="relative mt-2 mb-6">
        <div className="relative h-6 bg-gray-100 rounded-md overflow-hidden shadow-inner">
          <div className="absolute top-0 left-0 h-full rounded-md transition-all duration-1000 ease-out" style={{ width: `${scoreValue}%`, backgroundColor: fillColor, opacity: 0.85 }}></div>
        </div>
        <div className="absolute top-0 w-[2px] h-10 z-10 transition-all duration-1000 ease-out" style={{ left: `${benchValue}%` }}>
          <div className="h-6 bg-slate-800 w-[2px] opacity-70"></div>
          <span className="absolute top-7 -translate-x-1/2 text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 whitespace-nowrap rounded border border-gray-200 shadow-sm">Nat: {benchValue}%</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const tabs = ['summary', 'shs', 'sel', 'sba', 'recs'];
  const [activeTab, setActiveTab] = useState('summary');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [sbaFilter, setSbaFilter] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = tabs.indexOf(activeTab);
      if (e.key === 'ArrowRight') {
        if (currentIndex < tabs.length - 1) handleTabChange(tabs[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) handleTabChange(tabs[currentIndex - 1]);
      } else if (e.key >= '1' && e.key <= '5') {
        handleTabChange(tabs[parseInt(e.key) - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const triggerSparks = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + (rect.width / 2)) / window.innerWidth;
    const y = (rect.top + (rect.height / 2)) / window.innerHeight;
    confetti({ particleCount: 80, spread: 80, origin: { x, y }, colors: ['#1a4331', '#f6b21c', '#42825f'], disableForReducedMotion: true, ticks: 150, gravity: 1.1 });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAIOpen(false);
    setSbaFilter('All');
  };

  const getAIInsight = () => {
    switch (activeTab) {
      case 'summary': return "Antigravity AI Insight: The overarching theme across all 1,300+ students is a 'readiness gap'. High aspirations (e.g., STEM) and highly supportive environments are not translating into objective aptitude or personal grit.";
      case 'shs': return "Antigravity AI Insight: Critical misalignment detected in the Grade 9 cohort. 47.9% desire STEM, but only 3.0% possess the objective aptitude. Recommend immediate bridging programs and redirecting guidance counseling toward high-aptitude tracks like GAS (56.2%).";
      case 'sel': return "Antigravity AI Insight: 'The Adolescent Dip' is the primary anomaly in this data. Self-efficacy and belonging drop significantly in Grades 7-9, while Grit remains stagnant across all cohorts. Cyber safety vulnerabilities are also highly pronounced in Grades 1-3.";
      case 'sba': return "Antigravity AI Insight: Grade 6 students demonstrate a strong cognitive bottleneck. They excel at concrete tasks (94-100% in graphing) but fail abstract application (0-3% in Conservation of Energy). This requires an immediate transition to manipulative-based learning.";
      case 'recs': return "Antigravity AI Insight: Implementation of these three priorities relies heavily on resolving procurement bottlenecks. Ensure internal vendor proposals for hardware are expedited to support the shift to hands-on, abstract reasoning scaffolding.";
      default: return "Antigravity AI Assistant ready.";
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col selection:bg-[#3b7b59] selection:text-white relative overflow-x-hidden">

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .bento-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bento-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px -12px rgba(59, 123, 89, 0.2);
        }
        
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.85); }
        }
        @keyframes float-blob-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-mesh-1 { animation: float-blob-1 18s infinite ease-in-out; }
        .animate-mesh-2 { animation: float-blob-2 22s infinite ease-in-out reverse; }
        .animate-mesh-3 { animation: float-blob-3 15s infinite ease-in-out; }
      `}</style>

      {/* ---------------- NAVIGATION BAR ---------------- */}
      <nav className="sticky top-0 z-50 bg-[#1a4331]/90 backdrop-blur-xl text-white shadow-xl transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-wrap justify-center md:justify-between items-center gap-4">
          <div className="font-serif font-bold text-xl hidden lg:block tracking-tight text-[#f6b21c] hover:scale-105 transition-transform cursor-default">DLSU IS Data Report</div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm font-semibold">
            {tabs.map((tab, idx) => {
              const labels = ['Executive Summary', '01. SHS Alignment', '02. SEL Profile', '03. Grade 6 SBA', '04. Recommendations'];
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-[#f6b21c] text-[#1a4331] shadow-[0_0_15px_rgba(246,178,28,0.4)] scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}
                >
                  {labels[idx]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-[4px] bg-white/10 relative">
          <div className="absolute top-0 left-0 h-full bg-[#f6b21c] shadow-[0_0_10px_#f6b21c] transition-all duration-700 ease-in-out" style={{ width: `${((tabs.indexOf(activeTab) + 1) / tabs.length) * 100}%` }}></div>
        </div>
      </nav>

      {/* CONTENT CONTAINER */}
      <main className="flex-grow bg-[#fafcfb]">

        {/* ---------------- TAB: EXECUTIVE SUMMARY ---------------- */}
        {activeTab === 'summary' && (
          <div className="animate-fade-in" key="summary">
            <section className="bg-[#1a4331] text-white p-12 md:p-20 flex flex-col justify-center relative overflow-hidden min-h-[500px]">
              <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#3b7b59] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-mesh-1 pointer-events-none"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#f6b21c] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-mesh-2 pointer-events-none"></div>

              <div className="relative z-10 max-w-6xl mx-auto w-full py-10">
                <h3 className="text-[#f6b21c] font-bold tracking-[0.2em] text-sm uppercase mb-6 drop-shadow-md">Academic Year 2025–2026</h3>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif leading-tight drop-shadow-lg">Student Assessment & <br />Development Report</h1>
                <p className="text-xl md:text-2xl font-light mb-10 text-gray-200 drop-shadow">Senior High School Track Alignment • Social-Emotional Learning • Grade 6 Standards-Based Assessment</p>
                <div className="w-48 h-1 bg-[#f6b21c] mb-20 shadow-[0_0_20px_rgba(246,178,28,0.8)]"></div>
                <div>
                  <h4 className="font-bold text-xl mb-2 tracking-wide">De La Salle University Integrated School – Laguna</h4>
                  <p className="text-sm text-gray-300 font-light tracking-wide">Office of the Vice Principal For Teaching & Learning • Data source: Asian Psychological Services & Assessment Inc. (APSA)</p>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto mb-10">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Executive Summary</h3>
              <h1 className="text-5xl font-bold text-[#1a1a1a] mb-6 font-serif tracking-tight">One Pattern Runs Through All Three Studies</h1>
              <p className="text-gray-600 text-lg mb-12 max-w-5xl">Across track choice, social-emotional development, and academic performance, DLSU IS students show strong institutional support and real strengths — but a recurring gap between what students want or believe about themselves, and what the data shows they are prepared for.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bento-card bg-gradient-to-b from-white to-[#f4f7f5] rounded-3xl overflow-hidden flex flex-col shadow-xl border border-gray-100">
                  <div className="bg-[#1a4331] text-white text-center py-5 font-bold tracking-wider uppercase text-sm">Track Alignment (Gr. 9)</div>
                  <div className="p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#1a4331] text-5xl font-bold mb-4 font-serif flex items-baseline drop-shadow-sm">
                        <CountUp end={47.9} decimals={1} duration={2.5} separator="," />% <span className="text-3xl mx-2 text-gray-300">→</span> <CountUp end={3.0} decimals={1} duration={2.5} />%
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">wanted STEM, but had matching aptitude</p>
                      <h2 className="text-[#1a4331] text-5xl font-bold mb-4 font-serif drop-shadow-sm">
                        <CountUp end={43.4} decimals={1} duration={2.5} />%
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">of students show motivational deficits</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-800 italic">Interest is not converging with readiness — especially in the most popular track.</p>
                    </div>
                  </div>
                </div>
                <div className="bento-card bg-gradient-to-b from-white to-[#f4f7f5] rounded-3xl overflow-hidden flex flex-col shadow-xl border border-gray-100 cursor-pointer relative" onClick={triggerSparks}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="bg-[#2a6a5a] text-white text-center py-5 font-bold tracking-wider uppercase text-sm">SEL (Gr. 1–9, N=1,308)</div>
                  <div className="p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#2a6a5a] text-5xl font-bold mb-4 font-serif drop-shadow-sm">
                        <CountUp end={3.40} decimals={2} duration={2.5} /> – <CountUp end={3.60} decimals={2} duration={2.5} />
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">Grit's range — the lowest-scoring dimension in every cohort</p>
                      <h2 className="text-[#2a6a5a] text-5xl font-bold mb-4 font-serif flex items-baseline drop-shadow-sm">
                        <CountUp end={3.89} decimals={2} duration={2.5} /> <span className="text-3xl mx-2 text-gray-300">→</span> <CountUp end={3.51} decimals={2} duration={2.5} />
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">Sense of Belonging falls into Grades 7–9</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-800 italic">A strong, caring environment hasn't yet translated into student perseverance or belonging.</p>
                    </div>
                  </div>
                </div>
                <div className="bento-card bg-gradient-to-b from-white to-[#f4f7f5] rounded-3xl overflow-hidden flex flex-col shadow-xl border border-gray-100">
                  <div className="bg-[#42825f] text-white text-center py-5 font-bold tracking-wider uppercase text-sm">Grade 6 SBA (Math & Sci.)</div>
                  <div className="p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#42825f] text-5xl font-bold mb-4 font-serif drop-shadow-sm">
                        <CountUp end={50.4} decimals={1} duration={2.5} />%
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">of Math students are only "Progressing", not yet Proficient</p>
                      <h2 className="text-[#42825f] text-5xl font-bold mb-4 font-serif drop-shadow-sm">
                        <CountUp end={53.5} decimals={1} duration={2.5} />%
                      </h2>
                      <p className="text-gray-600 mb-10 font-medium text-lg">of Science students are Proficient or above</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-800 italic">Concrete, observable skills are strong; abstract reasoning (geometry, physical laws) lags.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- TAB: SHS ALIGNMENT ---------------- */}
        {activeTab === 'shs' && (
          <div className="animate-fade-in pb-20" key="shs">
            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-serif">01. SHS Potential & Track Alignment</h2>
              <p className="text-gray-600 mb-8 text-lg">Grade 9 cohort — desired tracks vs. aptitude and interest test results</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="p-4 hover:bg-[#f4f7f5] rounded-2xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">A. Desired Track Survey:</strong> Self-reported student preference — what the student wants to pursue.</div>
                <div className="p-4 hover:bg-[#f4f7f5] rounded-2xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">B. Aptitude Tests:</strong> Objective, standardized measures of cognitive competency and subject mastery.</div>
                <div className="p-4 hover:bg-[#f4f7f5] rounded-2xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">C. Interest Inventory:</strong> Behavioral mapping of natural inclinations, career interest, and success motivators.</div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Convergent Profiles</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">Where Student Choice Matches the Data</h1>
              <div className="h-[450px] w-full mt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={convergentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} interval={0} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 50]} axisLine={false} tickLine={false} tick={{ fill: '#4b5563' }} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(59, 123, 89, 0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '30px' }} />
                    <Bar dataKey="Desired" name="Desired Track (A)" fill="#1a4331" radius={[6, 6, 0, 0]} animationDuration={1500} />
                    <Bar dataKey="Aptitude" name="Aptitude Match (B)" fill="#42825f" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={300} />
                    <Bar dataKey="Full" name="Full Consistency (A+B+C)" fill="#f6b21c" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={600} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Best-Aligned Track</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">HUMSS: The Strongest Convergence in the Cohort</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bento-card bg-[#1a4331] rounded-3xl p-12 text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#f6b21c] rounded-full filter blur-[100px] opacity-20 animate-mesh-3"></div>
                  <h2 className="text-8xl font-bold text-[#f6b21c] mb-6 font-serif drop-shadow-md"><CountUp end={12.8} decimals={1} duration={2.5} />%</h2>
                  <p className="text-xl leading-relaxed mb-10 relative z-10">of the entire Grade 9 cohort (34 students) wanted HUMSS AND had matching aptitude AND matching interest.</p>
                  <div className="border-t border-[#347b59] pt-6 relative z-10"><p className="italic text-gray-200">44.5% desired HUMSS • 42.6% were aptitude-matched</p></div>
                </div>
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={humssData} margin={{ top: 40, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 50]} axisLine={false} tickLine={false} />
                      <Bar dataKey="Value" fill="#42825f" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500}>
                        <LabelList dataKey="Value" position="top" fill="#1a4331" fontSize={18} fontWeight="bold" formatter={(val) => `${val}%`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Divergent Profiles</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">Where Student Choice Diverges from the Data</h1>
              <div className="h-[450px] w-full mt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divergentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} interval={0} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 60]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(219, 90, 90, 0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '30px' }} />
                    <Bar dataKey="Desired" name="Desired Track" fill="#db5a5a" radius={[6, 6, 0, 0]} animationDuration={1500} />
                    <Bar dataKey="Aptitude" name="Aptitude-Recommended" fill="#42825f" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={400} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Largest Gap</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">STEM: Highest Desire, Lowest Aptitude Match</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stemData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 60]} axisLine={false} tickLine={false} />
                      <Bar dataKey="Desired" fill="#db5a5a" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500}>
                        <LabelList dataKey="Desired" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Aptitude" fill="#db5a5a" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={300}>
                        <LabelList dataKey="Aptitude" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Interest" fill="#db5a5a" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={600}>
                        <LabelList dataKey="Interest" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-gradient-to-br from-white to-[#fff5f5] border border-[#fecaca] rounded-3xl p-12 flex flex-col justify-center shadow-xl">
                  <h2 className="text-6xl font-bold text-[#db5a5a] mb-6 font-serif drop-shadow-sm">47.9% → 3.0%</h2>
                  <p className="text-xl text-gray-800 leading-relaxed mb-10 font-medium">127 students (47.9%) desired STEM despite a divergent profile. Only 8 of them (3.0%) tested with matching aptitude.</p>
                  <div className="border-t border-[#fca5a5] pt-6"><p className="italic text-gray-700">This is the single largest desire-vs-readiness gap of any track in the cohort — the report attributes it to prestige, parental pressure, or perceived economic value rather than measured cognitive readiness.</p></div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Inverse Pattern</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">GAS: Under-Desired Despite Broad Aptitude Fit</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gasData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 60]} axisLine={false} tickLine={false} />
                      <Bar dataKey="Desired" fill="#42825f" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500}>
                        <LabelList dataKey="Desired" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Aptitude" fill="#42825f" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={300}>
                        <LabelList dataKey="Aptitude" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Interest" fill="#42825f" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={600}>
                        <LabelList dataKey="Interest" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-gradient-to-br from-white to-[#f0f4f2] border border-[#bbf7d0] rounded-3xl p-12 flex flex-col justify-center shadow-xl">
                  <h2 className="text-6xl font-bold text-[#42825f] mb-6 font-serif drop-shadow-sm">1.5% → 56.2%</h2>
                  <p className="text-xl text-gray-800 leading-relaxed mb-10 font-medium">Only 4 students actively chose GAS — yet 149 students (56.2%) had the aptitude profile that would recommend it.</p>
                  <div className="border-t border-[#86efac] pt-6"><p className="italic text-gray-700">The reverse of the STEM pattern: GAS appears to be perceived as a low-prestige "fallback" option rather than the flexible, generalist pathway the aptitude data suggests it actually is for this group.</p></div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Untapped Potential</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">Physical-Spatial Aptitude Nobody Is Choosing</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={untappedData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 60]} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 15, fontWeight: 600, fill: '#1a1a1a' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Desired" name="Student Desire" fill="#db5a5a" radius={[0, 6, 6, 0]} animationDuration={1500} />
                      <Bar dataKey="Aptitude" name="Aptitude-Recommended" fill="#42825f" radius={[0, 6, 6, 0]} animationDuration={1500} animationBegin={300} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-white rounded-3xl p-12 flex flex-col justify-center shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1a4331] mb-6 font-serif">What this means</h3>
                  <ul className="space-y-5 text-gray-700 text-base list-disc pl-5 font-medium">
                    <li>108 students (40.8%) test as aptitude-fit for Sports, but only 45 (17.0%) desire it.</li>
                    <li>130 students (49.1%) test as aptitude-fit for Agro-Fishery — the single highest aptitude match rate of any track — yet only 5 students (1.9%) want it.</li>
                    <li>This points to strong physical-spatial and kinesthetic intelligence in the cohort that current guidance conversations aren't surfacing as a viable, prestigious option.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-16 max-w-7xl mx-auto bg-[#1a4331] text-white rounded-[2.5rem] my-16 shadow-[0_30px_60px_-15px_rgba(26,67,49,0.4)] relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-[#f6b21c] rounded-full filter blur-[150px] opacity-10 animate-mesh-3 pointer-events-none"></div>

              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-4 relative z-10">Track Alignment — Behavioral Readiness</h3>
              <h1 className="text-5xl font-bold mb-16 font-serif relative z-10 drop-shadow-md">Below-Majority Self-Motivation Compounds the Risk</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="flex justify-center">
                  <div className="w-80 h-80 rounded-full border-[10px] border-[#f6b21c] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(246,178,28,0.4)] bg-[#1a4331]/80 backdrop-blur-sm">
                    <h2 className="text-8xl font-bold text-[#f6b21c] font-serif mb-2 drop-shadow-lg"><CountUp end={43.4} decimals={1} duration={2.5} />%</h2>
                    <p className="text-white text-sm tracking-widest uppercase font-bold">of the Grade 9 cohort</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-2xl font-medium mb-8 leading-relaxed text-gray-100">Grade 9 students show notable motivational issues or an absolute lack of motivation regarding academic task completion.</p>
                  <ul className="space-y-6 text-gray-300 list-disc pl-6 text-lg">
                    <li>Below-majority of students in the cohort are organically self-motivated.</li>
                    <li>Motivated or not, students may still insist on tracks where they lack technical readiness — this is exactly the STEM pattern.</li>
                    <li>The report recommends this be read alongside track choice: technical readiness AND motivation both need to be present for a track assignment to be sustainable through Senior High School.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Track Alignment — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Proposed Interventions Before SHS Enrollment</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bento-card flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div className="bg-[#1a4331] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">1</div><div><h4 className="font-bold text-xl mb-2 text-gray-900">Academic Bridge Programs</h4><p className="text-gray-600">For students who insist on tracks (e.g. STEM) where they lack tested technical readiness.</p></div></div>
                <div className="bento-card flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div className="bg-[#1a4331] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">2</div><div><h4 className="font-bold text-xl mb-2 text-gray-900">Systematic Motivation Reinforcement</h4><p className="text-gray-600">Re-engineer curricular frameworks to sustain internal learner drive.</p></div></div>
                <div className="bento-card flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div className="bg-[#1a4331] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">3</div><div><h4 className="font-bold text-xl mb-2 text-gray-900">Attitude-Based Training</h4><p className="text-gray-600">Institutionalize behavioral workshops ahead of SHS.</p></div></div>
                <div className="bento-card flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div className="bg-[#1a4331] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">4</div><div><h4 className="font-bold text-xl mb-2 text-gray-900">Elevate Under-Chosen Tracks</h4><p className="text-gray-600">Build explicit counseling around GAS, Sports, and Agro-Fishery.</p></div></div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- TAB: SEL PROFILE ---------------- */}
        {activeTab === 'sel' && (
          <div className="animate-fade-in pb-20" key="sel">
            <section className="p-12 max-w-7xl mx-auto bg-gray-50 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-serif">02. Social-Emotional Learning (SEL)</h2>
              <p className="text-gray-600 mb-8 text-lg">Grades 1–9 • N = 1,308 students • 11 developmental dimensions</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center">
                <div className="p-4"><strong className="text-3xl text-[#1a4331] font-serif block mb-2">Grades 1-3</strong><span className="text-base text-gray-500 font-medium uppercase tracking-widest">301 students</span></div>
                <div className="p-4 border-l border-r border-gray-100"><strong className="text-3xl text-[#1a4331] font-serif block mb-2">Grades 4-6</strong><span className="text-base text-gray-500 font-medium uppercase tracking-widest">321 students</span></div>
                <div className="p-4"><strong className="text-3xl text-[#1a4331] font-serif block mb-2">Grades 7-9</strong><span className="text-base text-gray-500 font-medium uppercase tracking-widest">686 students</span></div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">SEL — Institutional Strengths</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">A Strong, Caring, Physically Safe Environment</h1>
              <div className="h-[450px] w-full mt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selStrengthsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[3, 4.5]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(59, 123, 89, 0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '30px' }} />
                    <Bar dataKey="Teacher-Student" fill="#1a4331" radius={[6, 6, 0, 0]} animationDuration={1500} />
                    <Bar dataKey="Physical Surroundings" fill="#42825f" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={300} />
                    <Bar dataKey="Social Awareness" fill="#f6b21c" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={600} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">SEL — The Perseverance Gap</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Grit Is the Lowest-Scoring Dimension — Every Cohort</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selGritData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 14, fontWeight: 'bold' }} />
                      <YAxis domain={[3, 4.4]} axisLine={false} tickLine={false} />
                      <Tooltip content={<GlassTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: '30px' }} />
                      <Line type="monotone" dataKey="Teacher-Student Connection" stroke="#42825f" strokeWidth={5} dot={{ r: 7, fill: '#42825f' }} activeDot={{ r: 10 }} animationDuration={2500} />
                      <Line type="monotone" dataKey="Physical Surroundings" stroke="#f6b21c" strokeWidth={5} dot={{ r: 7, fill: '#f6b21c' }} activeDot={{ r: 10 }} animationDuration={2500} animationBegin={300} />
                      <Line type="monotone" dataKey="Grit" stroke="#db5a5a" strokeWidth={5} dot={{ r: 7, fill: '#db5a5a' }} activeDot={{ r: 10 }} animationDuration={2500} animationBegin={600} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-gradient-to-br from-white to-[#fff5f5] rounded-3xl p-12 flex flex-col justify-center shadow-xl border border-[#fecaca] cursor-pointer" onClick={triggerSparks}>
                  <h2 className="text-7xl font-bold text-[#db5a5a] mb-6 font-serif tracking-tighter drop-shadow-sm">
                    <CountUp end={3.40} decimals={2} duration={2.5} /> – <CountUp end={3.60} decimals={2} duration={2.5} />
                  </h2>
                  <p className="text-xl text-gray-800 leading-relaxed mb-8 font-medium">Grit's range across all cohorts — students rate themselves as only "somewhat focused and persistent" toward long-term goals.</p>
                  <div className="pt-6 border-t border-[#fca5a5]">
                    <p className="text-gray-700 italic">A supportive, resource-rich environment does not automatically build personal resilience — grit requires its own, distinct cultivation.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#1a4331] text-white rounded-3xl my-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f6b21c] rounded-full filter blur-[150px] opacity-10 animate-mesh-3 pointer-events-none"></div>
              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-2 relative z-10">SEL — The Adolescent Dip</h3>
              <h1 className="text-5xl font-bold mb-12 font-serif relative z-10 drop-shadow-md">Grades 7–9 Show a Clear Contraction</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selDipData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#fff" tick={{ fontWeight: 'bold', fontSize: 13 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[3, 4.2]} stroke="#fff" axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(26,67,49,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '12px' }} />
                      <Legend wrapperStyle={{ paddingTop: '30px' }} />
                      <Bar dataKey="Sense of Belonging" fill="#f6b21c" radius={[6, 6, 0, 0]} animationDuration={1500} />
                      <Bar dataKey="Self-Efficacy" fill="#e2e8f0" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={300} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-8 bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Sense of Belonging</h4>
                    <p className="text-5xl text-[#f6b21c] font-bold font-serif"><CountUp end={3.89} decimals={2} duration={2} /> → <CountUp end={3.51} decimals={2} duration={2} /></p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Self-Efficacy</h4>
                    <p className="text-5xl text-gray-100 font-bold font-serif"><CountUp end={3.63} decimals={2} duration={2} /> → <CountUp end={3.48} decimals={2} duration={2} /></p>
                    <span className="text-sm font-medium text-gray-300 uppercase tracking-widest mt-2 block">Institutional Low</span>
                  </div>
                  <p className="text-base text-gray-200 pt-6 border-t border-white/20 italic">As students enter junior high, heightened sensitivity to peer status and social validation coincides with declining institutional belonging and academic confidence.</p>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">SEL — Early-Grade Vulnerability</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Youngest Students Are Least Cyber-Prepared</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selCyberData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 600, fill: '#4b5563' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[3, 4.2]} axisLine={false} tickLine={false} />
                      <Bar dataKey="Value" fill="#f6b21c" barSize={80} radius={[8, 8, 0, 0]} animationDuration={1500}>
                        <LabelList dataKey="Value" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-[#fffcf5] border border-[#fef08a] rounded-3xl p-12 flex flex-col justify-center shadow-xl">
                  <h3 className="font-bold text-xl mb-4 text-[#1a4331]">Within Grades 1–3 specifically:</h3>
                  <p className="text-[#1a4331] font-bold text-2xl mb-8 border-b border-[#fef08a] pb-6">Grade 1: 3.52 • Grade 2: 3.51 • Grade 3: 3.81</p>
                  <ul className="space-y-5 text-gray-800 text-base list-disc pl-5 font-medium">
                    <li>Primary students actively navigate online platforms but score lowest institution-wide on data-privacy and online-risk literacy.</li>
                    <li>The intermediate cohort (Grades 4–6) peaks at 4.01, then dips again by Grades 7–9 (3.66) as digital exposure and complexity increase.</li>
                    <li>Recommendation: introduce formal, scenario-based digital citizenship modules starting in Grades 1–3, not just at the JHS level.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">SEL — Full Dimensional Comparison</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">All 11 Dimensions, Side by Side</h1>
              <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-sm text-[#1a4331] uppercase bg-[#f4f7f5] border-b border-gray-200">
                    <tr><th className="px-8 py-6 tracking-wider font-bold">Dimension</th><th className="px-8 py-6 tracking-wider font-bold">Grades 1-3</th><th className="px-8 py-6 tracking-wider font-bold">Grades 4-6</th><th className="px-8 py-6 tracking-wider font-bold">Grades 7-9</th><th className="px-8 py-6 tracking-wider font-bold">Trend</th></tr>
                  </thead>
                  <tbody>
                    {selTable.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-[#edf5f0] transition-colors duration-200 text-base">
                        <td className="px-8 py-5 font-bold text-gray-900">{row.dim}</td><td className="px-8 py-5">{row.g1}</td><td className="px-8 py-5">{row.g4}</td><td className="px-8 py-5 font-bold text-[#db5a5a]">{row.g7}</td><td className="px-8 py-5 italic text-gray-500">{row.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">SEL — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Proposed Interventions for SEL Development</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bento-card bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-start gap-6">
                  <div className="bg-[#2a6a5a] text-[#f6b21c] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg">1</div>
                  <div><h3 className="font-bold text-2xl mb-4 text-gray-900">Evidence-Based Grit & Resilience Curriculum</h3><p className="text-gray-600 text-lg leading-relaxed">Embed goal-setting exercises, mistake-normalization strategies, and extended project milestones into the core curriculum.</p></div>
                </div>
                <div className="bento-card bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-start gap-6">
                  <div className="bg-[#2a6a5a] text-[#f6b21c] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg">2</div>
                  <div><h3 className="font-bold text-2xl mb-4 text-gray-900">Junior High Transition Support Systems</h3><p className="text-gray-600 text-lg leading-relaxed">Intentional socio-emotional check-ins, peer mentorship, and small-group advisory sessions to counter the Grades 7–9 dip in belonging.</p></div>
                </div>
                <div className="bento-card bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-start gap-6">
                  <div className="bg-[#2a6a5a] text-[#f6b21c] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg">3</div>
                  <div><h3 className="font-bold text-2xl mb-4 text-gray-900">Early Digital Citizenship Frameworks</h3><p className="text-gray-600 text-lg leading-relaxed">Introduce formal internet-safety and digital-literacy modules starting in Grades 1–3, not only at the JHS level.</p></div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- TAB: SBA ---------------- */}
        {activeTab === 'sba' && (
          <div className="animate-fade-in pb-20" key="sba">
            <section className="p-12 max-w-7xl mx-auto bg-gray-50 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-serif">03. Grade 6 Standards-Based Assessment</h2>
              <p className="text-gray-600 mb-8 text-lg">Mathematics and Science • 129 students, 4 sections • Tested January 19, 2026</p>

              {/* Feature 3: Interactive Section Filter */}
              <div className="flex flex-wrap gap-4 mb-10 bg-white p-4 rounded-3xl shadow-sm border border-gray-200 inline-flex">
                {['All', 'Sec A', 'Sec B', 'Sec C', 'Sec D'].map(sec => {
                  const filterVal = sec === 'All' ? 'All' : sec;
                  const label = sec === 'All' ? 'All Sections' : sec.replace('Sec', 'Section');
                  return (
                    <button
                      key={sec}
                      onClick={() => setSbaFilter(filterVal)}
                      className={`px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 ${sbaFilter === filterVal ? 'bg-[#1a4331] text-[#f6b21c] shadow-lg scale-105' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"><strong className="text-[#42825f] text-lg block">Section A</strong><span className="text-gray-500">34 students</span></div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"><strong className="text-[#42825f] text-lg block">Section B</strong><span className="text-gray-500">31 students</span></div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"><strong className="text-[#42825f] text-lg block">Section C</strong><span className="text-gray-500">33 students</span></div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"><strong className="text-[#42825f] text-lg block">Section D</strong><span className="text-gray-500">31 students</span></div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Mathematics</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 font-serif">Mathematics: Proficiency by Section</h1>
              <p className="text-gray-600 mb-10 text-lg">Mean Scaled Ability Score — Section A: 77 • Section B: 81 • Section C: 77 • Section D: 78 | Cohort mean: 78.25</p>
              <div className="h-[550px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mathSectionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontWeight: 'bold', fontSize: 14 }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Legend wrapperStyle={{ paddingTop: '30px' }} />
                    <Bar dataKey="Not Met" stackId="a" animationDuration={1000}>
                      {mathSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#db5a5a" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Progressing" stackId="a" animationDuration={1000}>
                      {mathSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#f6b21c" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Proficient" stackId="a" animationDuration={1000}>
                      {mathSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#42825f" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Highly Proficient" stackId="a" radius={[6, 6, 0, 0]} animationDuration={1000}>
                      {mathSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#1a4331" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Mathematics</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Math: Where Students Excel vs. Struggle</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#f0f4f2] p-10 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-[#42825f] text-3xl font-bold mb-8 flex items-center font-serif"><div className="w-4 h-4 rounded-full bg-[#42825f] mr-4 shadow-md"></div>STRENGTHS</h2>
                  <div className="space-y-6">
                    <BenchmarkGauge title="Understanding graph types & purposes" scoreText="94-100%" scoreValue={97} benchValue={80} type="strength" />
                    <BenchmarkGauge title="Reading & interpreting charts/tables" scoreText="87-100%" scoreValue={93} benchValue={80} type="strength" />
                    <BenchmarkGauge title="Base & exponent concepts" scoreText="85-100%" scoreValue={92} benchValue={87} type="strength" />
                  </div>
                </div>
                <div className="bg-[#fcf3f3] p-10 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-[#db5a5a] text-3xl font-bold mb-8 flex items-center font-serif"><div className="w-4 h-4 rounded-full bg-[#db5a5a] mr-4 shadow-md"></div>GAPS</h2>
                  <div className="space-y-6">
                    <BenchmarkGauge title="Listing outcomes (probability)" scoreText="3-10%" scoreValue={6} benchValue={20} type="gap" />
                    <BenchmarkGauge title="Corresponding angles on parallel lines" scoreText="3-13%" scoreValue={8} benchValue={19} type="gap" />
                    <BenchmarkGauge title="Calculating circumference of a circle" scoreText="18-19%" scoreValue={18} benchValue={29} type="gap" />
                  </div>
                </div>
              </div>
              <div className="mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-lg text-gray-800">
                <p className="italic font-medium text-center">Applied geometry, probability, and advanced fractions consistently trail the national benchmark — aligning with Piaget's account of the Grade 6 shift from concrete to formal-operational reasoning.</p>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Science</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 font-serif">Science: Proficiency by Section</h1>
              <p className="text-gray-600 mb-10 text-lg">Mean Scaled Ability Score — Section A: 82 • Section B: 81 • Section C: 80 • Section D: 80 | Cohort mean: 80.75</p>
              <div className="h-[550px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sciSectionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontWeight: 'bold', fontSize: 14 }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Legend wrapperStyle={{ paddingTop: '30px' }} />
                    <Bar dataKey="Not Met" stackId="a" animationDuration={1000}>
                      {sciSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#db5a5a" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Progressing" stackId="a" animationDuration={1000}>
                      {sciSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#f6b21c" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Proficient" stackId="a" animationDuration={1000}>
                      {sciSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#42825f" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                    <Bar dataKey="Highly Proficient" stackId="a" radius={[6, 6, 0, 0]} animationDuration={1000}>
                      {sciSectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#1a4331" opacity={sbaFilter === 'All' || sbaFilter === entry.name ? 1 : 0.15} style={{ transition: 'opacity 0.4s ease' }} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Science</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Science: Where Students Excel vs. Struggle</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#f0f4f2] p-10 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-[#42825f] text-3xl font-bold mb-8 flex items-center font-serif"><div className="w-4 h-4 rounded-full bg-[#42825f] mr-4 shadow-md"></div>STRENGTHS</h2>
                  <div className="space-y-6">
                    <BenchmarkGauge title="Interpreting graphs" scoreText="97-100%" scoreValue={98} benchValue={92} type="strength" />
                    <BenchmarkGauge title="Identifying tropical rainforest ecosystems" scoreText="97-100%" scoreValue={98} benchValue={86} type="strength" />
                    <BenchmarkGauge title="Demonstrating basic measurement skills" scoreText="88-97%" scoreValue={92} benchValue={81} type="strength" />
                  </div>
                </div>
                <div className="bg-[#fcf3f3] p-10 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-[#db5a5a] text-3xl font-bold mb-8 flex items-center font-serif"><div className="w-4 h-4 rounded-full bg-[#db5a5a] mr-4 shadow-md"></div>GAPS</h2>
                  <div className="space-y-6">
                    <BenchmarkGauge title="Stating the Law of Conservation of Energy" scoreText="0-3%" scoreValue={2} benchValue={30} type="gap" />
                    <BenchmarkGauge title="Properties of homogeneous mixtures" scoreText="6-16%" scoreValue={11} benchValue={23} type="gap" />
                    <BenchmarkGauge title="Explaining the process of digestion" scoreText="9-15%" scoreValue={12} benchValue={20} type="gap" />
                  </div>
                </div>
              </div>
              <div className="mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-lg text-gray-800">
                <p className="italic font-medium text-center">Higher-order, abstract physical-science concepts (unseen forces, systemic processes) lag well behind concrete, observable skills like reading graphs or identifying ecosystems.</p>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Cross-Subject</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Science Outperforms Math at the Cohort Level</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={crossSubjectData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 600, fill: '#4b5563' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 60]} axisLine={false} tickLine={false} />
                      <Tooltip content={<GlassTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: '30px' }} />
                      <Bar dataKey="Math" fill="#42825f" radius={[6, 6, 0, 0]} animationDuration={1500} />
                      <Bar dataKey="Science" fill="#1a4331" radius={[6, 6, 0, 0]} animationDuration={1500} animationBegin={300} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card flex flex-col justify-center space-y-8 bg-gradient-to-br from-[#f0f4f2] to-white p-12 rounded-3xl shadow-xl border border-[#3b7b59]/20">
                  <div>
                    <h4 className="text-3xl font-bold mb-2 font-serif text-[#1a4331]">78.25 <span className="text-gray-400 mx-2">vs.</span> 80.75</h4>
                    <p className="text-base font-medium text-gray-500 uppercase tracking-widest">Mean Scaled Ability Score, Math vs. Science</p>
                  </div>
                  <p className="text-gray-800 font-medium text-xl leading-relaxed">57.4% of students are Proficient or Highly Proficient in Science, vs. 41.8% in Math.</p>
                  <p className="text-gray-800 text-lg leading-relaxed">Math's largest cluster (50.4%) sits in "Progressing" — the widest single gap-closing opportunity across both subjects.</p>
                  <div className="pt-6 border-t border-gray-300">
                    <p className="text-gray-700 italic font-medium">Both subjects show the same underlying pattern: concrete/observable skills are strong, abstract/multi-step reasoning needs scaffolding.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Grade 6 SBA — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">Targeted, Tiered Interventions</h1>
              <div className="space-y-6">
                <div className="bento-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                  <div className="bg-[#42825f] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-md">1</div>
                  <div><h3 className="font-bold text-2xl mb-2 text-gray-900">Re-anchor Geometric & Spatial Reasoning</h3><p className="text-gray-600 text-lg">Shift from formula memorization to hands-on manipulation — physical models and visual tools for angle relationships and circular measurement.</p></div>
                </div>
                <div className="bento-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                  <div className="bg-[#42825f] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-md">2</div>
                  <div><h3 className="font-bold text-2xl mb-2 text-gray-900">Concrete Probability & Outcome Tracking</h3><p className="text-gray-600 text-lg">Tree diagrams, grid charts, and hands-on outcome experiments to make sample spaces tangible.</p></div>
                </div>
                <div className="bento-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                  <div className="bg-[#42825f] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-md">3</div>
                  <div><h3 className="font-bold text-2xl mb-2 text-gray-900">Interactive Physical Science Activities</h3><p className="text-gray-600 text-lg">Lab experiments and simulations for energy conservation, mixture separation, and digestive processes.</p></div>
                </div>
                <div className="bento-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                  <div className="bg-[#42825f] text-[#f6b21c] rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shrink-0 shadow-md">4</div>
                  <div><h3 className="font-bold text-2xl mb-2 text-gray-900">Differentiate by Tier</h3><p className="text-gray-600 text-lg">Small-group remediation for Not Met Standards (10 in Math, 1 in Science); weekly spiral review for the Progressing "middle majority" (65 in Math, 54 in Science); enrichment tasks for Highly Proficient students.</p></div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- TAB: RECOMMENDATIONS ---------------- */}
        {activeTab === 'recs' && (
          <div className="animate-fade-in pb-20" key="recs">
            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Cross-Cutting Themes</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">What the Three Studies Say Together</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bento-card flex gap-6 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm"><div className="text-[#42825f] font-serif font-bold text-4xl">1</div><div><h4 className="font-bold text-xl mb-3 text-gray-900">Environment is a genuine strength</h4><p className="text-base text-gray-600 leading-relaxed">High Teacher-Student Connection and Physical Surroundings scores, plus strong Science and HUMSS performance, show DLSU IS's institutional foundation is solid.</p></div></div>
                <div className="bento-card flex gap-6 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm"><div className="text-[#42825f] font-serif font-bold text-4xl">2</div><div><h4 className="font-bold text-xl mb-3 text-gray-900">Desire and readiness don't always meet</h4><p className="text-base text-gray-600 leading-relaxed">Grade 9 STEM desire vs. aptitude, and Grade 6 Math's "Progressing" cluster, are two versions of the same story: aspiration outpacing demonstrated readiness.</p></div></div>
                <div className="bento-card flex gap-6 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm"><div className="text-[#42825f] font-serif font-bold text-4xl">3</div><div><h4 className="font-bold text-xl mb-3 text-gray-900">The junior high years are the pressure point</h4><p className="text-base text-gray-600 leading-relaxed">The SEL "Adolescent Dip" (Grades 7–9) and the persistent Grit gap both concentrate exactly where students are also choosing SHS tracks — these are not separate problems.</p></div></div>
                <div className="bento-card flex gap-6 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm"><div className="text-[#42825f] font-serif font-bold text-4xl">4</div><div><h4 className="font-bold text-xl mb-3 text-gray-900">Abstract reasoning is the shared skill gap</h4><p className="text-base text-gray-600 leading-relaxed">Grade 6 Math and Science both show strength in concrete/observable tasks and weakness in abstract, multi-step, or unseen-mechanism reasoning.</p></div></div>
              </div>
            </section>

            <section className="p-16 max-w-7xl mx-auto bg-[#1a4331] text-white relative overflow-hidden rounded-[2.5rem] my-16 shadow-[0_30px_60px_-15px_rgba(26,67,49,0.5)]">
              <div className="absolute top-[-40%] left-[-20%] w-[800px] h-[800px] bg-[#2a5a41] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-mesh-1 pointer-events-none"></div>
              <div className="absolute bottom-[-30%] right-[-20%] w-[900px] h-[900px] bg-[#f6b21c] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-mesh-2 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-4 drop-shadow-md">Closing — Consolidated Recommendations</h3>
                <h1 className="text-5xl font-bold mb-16 font-serif drop-shadow-lg">Three Priorities for the Coming Year</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="bento-card bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-3xl mb-8 shadow-[0_0_20px_rgba(246,178,28,0.4)]">1</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Bridge the Readiness Gap</h3>
                    <p className="text-gray-200 leading-relaxed text-lg">Academic bridge programs for over-desired, under-ready tracks (STEM); elevate under-chosen, high-aptitude pathways (GAS, Sports, Agro-Fishery) in guidance counseling.</p>
                  </div>
                  <div className="bento-card bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-3xl mb-8 shadow-[0_0_20px_rgba(246,178,28,0.4)]">2</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Invest in Grit & JHS Transition</h3>
                    <p className="text-gray-200 leading-relaxed text-lg">Institution-wide grit/resilience curriculum plus dedicated Grades 7–9 advisory and peer-mentorship structures to counter the Adolescent Dip.</p>
                  </div>
                  <div className="bento-card bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-3xl mb-8 shadow-[0_0_20px_rgba(246,178,28,0.4)]">3</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Scaffold Abstract Reasoning</h3>
                    <p className="text-gray-200 leading-relaxed text-lg">Hands-on, manipulative-based instruction for geometry, probability, and physical science concepts.</p>
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-sm text-[#f6b21c] font-medium leading-relaxed bg-[#1a4331]/40 p-4 rounded-xl border border-white/10 shadow-inner">Operational Note: To execute this effectively, institutional hardware procurement workflows must be streamlined, ensuring internal vendor proposals are processed without administrative delay.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-20 mb-10 text-center animate-fade-in delay-200 relative">
              <h2 className="text-5xl font-serif font-bold text-[#1a4331] mb-4">Thank You</h2>
              <p className="text-xl mb-12 text-gray-500">Questions and Discussion</p>
              <div className="inline-block border-t-2 border-gray-200 pt-8 px-12">
                <p className="text-sm font-bold uppercase tracking-widest text-[#42825f]">OFFICE OF THE VICE PRINCIPAL FOR TEACHING & LEARNING • DE LA SALLE UNIVERSITY INTEGRATED SCHOOL – LAGUNA</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ---------------- FLOATING AI COMMAND CENTER ---------------- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isAIOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 animate-fade-in origin-bottom-right">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center text-[#1a4331] font-bold text-lg font-serif">
                <Sparkles size={22} className="mr-3 text-[#f6b21c]" />
                Google Antigravity AI
              </div>
              <button onClick={() => setIsAIOpen(false)} className="text-gray-400 hover:text-[#db5a5a] transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full">
                <X size={18} />
              </button>
            </div>
            <p className="text-base text-gray-700 leading-relaxed font-medium">
              {getAIInsight()}
            </p>
          </div>
        )}

        <button
          onClick={() => setIsAIOpen(!isAIOpen)}
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(26,67,49,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 ${isAIOpen ? 'bg-[#f6b21c] text-[#1a4331] border-[#f6b21c]' : 'bg-[#1a4331] text-white border-white/20 hover:bg-[#2a5a41]'}`}
        >
          {isAIOpen ? <X size={32} /> : <Bot size={32} />}
        </button>
      </div>

    </div>
  );
}