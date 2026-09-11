import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList } from 'recharts';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';
import { Bot, X, Sparkles } from 'lucide-react'; // Added icons for the AI Assistant

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

// --- CUSTOM GLASSMORPHIC TOOLTIP ---
const GlassTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200">
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

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isAIOpen, setIsAIOpen] = useState(false); // AI Panel State

  const triggerSparks = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + (rect.width / 2)) / window.innerWidth;
    const y = (rect.top + (rect.height / 2)) / window.innerHeight;
    confetti({ particleCount: 80, spread: 80, origin: { x, y }, colors: ['#1a4331', '#f6b21c', '#42825f'], disableForReducedMotion: true, ticks: 150, gravity: 1.1 });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAIOpen(false); // Auto-close AI panel when switching tabs
  };

  // Dynamic AI Insights based on the active tab
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
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col selection:bg-[#3b7b59] selection:text-white relative">

      {/* CSS ANIMATIONS */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .bento-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bento-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(59, 123, 89, 0.2);
        }
      `}</style>

      {/* ---------------- NAVIGATION BAR ---------------- */}
      <nav className="sticky top-0 z-40 bg-[#1a4331]/95 backdrop-blur-md text-white shadow-lg border-b-[4px] border-[#f6b21c] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-wrap justify-center md:justify-between items-center gap-4">
          <div className="font-serif font-bold text-xl hidden lg:block tracking-tight text-[#f6b21c] hover:scale-105 transition-transform">DLSU IS Data Report</div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm font-semibold">
            <button onClick={() => handleTabChange('summary')} className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'summary' ? 'bg-[#f6b21c] text-[#1a4331] shadow-md scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}>Executive Summary</button>
            <button onClick={() => handleTabChange('shs')} className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'shs' ? 'bg-[#f6b21c] text-[#1a4331] shadow-md scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}>01. SHS Alignment</button>
            <button onClick={() => handleTabChange('sel')} className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'sel' ? 'bg-[#f6b21c] text-[#1a4331] shadow-md scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}>02. SEL Profile</button>
            <button onClick={() => handleTabChange('sba')} className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'sba' ? 'bg-[#f6b21c] text-[#1a4331] shadow-md scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}>03. Grade 6 SBA</button>
            <button onClick={() => handleTabChange('recs')} className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'recs' ? 'bg-[#f6b21c] text-[#1a4331] shadow-md scale-105' : 'hover:bg-[#2a5a41] hover:text-[#f6b21c]'}`}>04. Recommendations</button>
          </div>
        </div>
      </nav>

      {/* CONTENT CONTAINER */}
      <main className="flex-grow">

        {/* ---------------- TAB: EXECUTIVE SUMMARY ---------------- */}
        {activeTab === 'summary' && (
          <div className="animate-fade-in" key="summary">
            {/* Title Slide */}
            <section className="bg-[#1a4331] text-white p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2a5a41] rounded-full opacity-50 pointer-events-none transition-transform duration-1000 hover:scale-110"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#3b7b59] rounded-full opacity-50 pointer-events-none"></div>

              <div className="relative z-10 max-w-6xl mx-auto w-full py-10">
                <h3 className="text-[#f6b21c] font-bold tracking-[0.2em] text-sm uppercase mb-6 drop-shadow-md">Academic Year 2025–2026</h3>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Student Assessment & <br />Development Report</h1>
                <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">Senior High School Track Alignment • Social-Emotional Learning • Grade 6 Standards-Based Assessment</p>
                <div className="w-48 h-1 bg-[#f6b21c] mb-20 shadow-[0_0_15px_rgba(246,178,28,0.5)]"></div>
                <div>
                  <h4 className="font-bold text-xl mb-2">De La Salle University Integrated School – Laguna</h4>
                  <p className="text-sm text-gray-400">Prepared for the Administrators' Meeting with the Provost • Data source: Asian Psychological Services & Assessment Inc. (APSA)</p>
                </div>
              </div>
            </section>

            {/* Executive Summary */}
            <section className="p-12 max-w-7xl mx-auto mb-10">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Executive Summary</h3>
              <h1 className="text-5xl font-bold text-[#1a1a1a] mb-6 font-serif tracking-tight">One Pattern Runs Through All Three Studies</h1>
              <p className="text-gray-600 text-lg mb-10 max-w-5xl">Across track choice, social-emotional development, and academic performance, DLSU IS students show strong institutional support and real strengths — but a recurring gap between what students want or believe about themselves, and what the data shows they are prepared for.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 - BENTO CARD */}
                <div className="bento-card bg-gradient-to-b from-[#f4f7f5] to-white rounded-2xl overflow-hidden flex flex-col shadow-lg border border-gray-100">
                  <div className="bg-[#1a4331] text-white text-center py-4 font-bold tracking-wide">Track Alignment (Gr. 9)</div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#1a4331] text-5xl font-bold mb-4 font-serif flex items-baseline">
                        <CountUp end={47.9} decimals={1} duration={2} separator="," />% <span className="text-3xl mx-2 text-gray-400">→</span> <CountUp end={3.0} decimals={1} duration={2} />%
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">wanted STEM, but had matching aptitude</p>
                      <h2 className="text-[#1a4331] text-5xl font-bold mb-4 font-serif">
                        <CountUp end={43.4} decimals={1} duration={2} />%
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">of students show motivational deficits</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-800 italic">Interest is not converging with readiness — especially in the most popular track.</p>
                    </div>
                  </div>
                </div>
                {/* Column 2 - BENTO CARD */}
                <div className="bento-card bg-gradient-to-b from-[#f4f7f5] to-white rounded-2xl overflow-hidden flex flex-col shadow-lg border border-gray-100 cursor-pointer" onClick={triggerSparks}>
                  <div className="bg-[#2a6a5a] text-white text-center py-4 font-bold tracking-wide">SEL (Gr. 1–9, N=1,308)</div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#2a6a5a] text-5xl font-bold mb-4 font-serif">
                        <CountUp end={3.40} decimals={2} duration={2} /> – <CountUp end={3.60} decimals={2} duration={2} />
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">Grit's range — the lowest-scoring dimension in every cohort</p>
                      <h2 className="text-[#2a6a5a] text-5xl font-bold mb-4 font-serif flex items-baseline">
                        <CountUp end={3.89} decimals={2} duration={2} /> <span className="text-3xl mx-2 text-gray-400">→</span> <CountUp end={3.51} decimals={2} duration={2} />
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">Sense of Belonging falls into Grades 7–9</p>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-800 italic">A strong, caring environment hasn't yet translated into student perseverance or belonging.</p>
                    </div>
                  </div>
                </div>
                {/* Column 3 - BENTO CARD */}
                <div className="bento-card bg-gradient-to-b from-[#f4f7f5] to-white rounded-2xl overflow-hidden flex flex-col shadow-lg border border-gray-100">
                  <div className="bg-[#42825f] text-white text-center py-4 font-bold tracking-wide">Grade 6 SBA (Math & Sci.)</div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-[#42825f] text-5xl font-bold mb-4 font-serif">
                        <CountUp end={50.4} decimals={1} duration={2} />%
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">of Math students are only "Progressing", not yet Proficient</p>
                      <h2 className="text-[#42825f] text-5xl font-bold mb-4 font-serif">
                        <CountUp end={53.5} decimals={1} duration={2} />%
                      </h2>
                      <p className="text-gray-600 mb-8 font-medium">of Science students are Proficient or above</p>
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
            <section className="p-12 max-w-7xl mx-auto bg-gray-50 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-serif">01. SHS Potential & Track Alignment</h2>
              <p className="text-gray-600 mb-8">Grade 9 cohort — desired tracks vs. aptitude and interest test results</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="p-4 hover:bg-[#f4f7f5] rounded-xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">A. Desired Track Survey:</strong> Self-reported student preference — what the student wants to pursue.</div>
                <div className="p-4 hover:bg-[#f4f7f5] rounded-xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">B. Aptitude Tests:</strong> Objective, standardized measures of cognitive competency and subject mastery.</div>
                <div className="p-4 hover:bg-[#f4f7f5] rounded-xl transition-colors"><strong className="text-[#1a4331] block mb-2 text-lg">C. Interest Inventory:</strong> Behavioral mapping of natural inclinations, career interest, and success motivators.</div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Convergent Profiles</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">Where Student Choice Matches the Data</h1>
              <div className="h-[400px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={convergentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#4b5563' }} interval={0} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 50]} axisLine={false} tickLine={false} tick={{ fill: '#4b5563' }} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(59, 123, 89, 0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Desired" name="Desired Track (A)" fill="#1a4331" radius={[4, 4, 0, 0]} animationDuration={1200} />
                    <Bar dataKey="Aptitude" name="Aptitude Match (B)" fill="#42825f" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={300} />
                    <Bar dataKey="Full" name="Full Consistency (A+B+C)" fill="#f6b21c" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={600} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Best-Aligned Track</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">HUMSS: The Strongest Convergence in the Cohort</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bento-card bg-[#1a4331] rounded-2xl p-10 text-white flex flex-col justify-center shadow-xl">
                  <h2 className="text-8xl font-bold text-[#f6b21c] mb-6 font-serif"><CountUp end={12.8} decimals={1} duration={2} />%</h2>
                  <p className="text-lg leading-relaxed mb-10">of the entire Grade 9 cohort (34 students) wanted HUMSS AND had matching aptitude AND matching interest.</p>
                  <div className="border-t border-[#347b59] pt-6"><p className="italic text-sm text-gray-300">44.5% desired HUMSS • 42.6% were aptitude-matched</p></div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={humssData} margin={{ top: 40, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#4b5563' }} axisLine={false} tickLine={false} />
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
              <div className="h-[400px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divergentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#4b5563' }} interval={0} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 60]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(219, 90, 90, 0.05)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Desired" name="Desired Track" fill="#db5a5a" radius={[4, 4, 0, 0]} animationDuration={1200} />
                    <Bar dataKey="Aptitude" name="Aptitude-Recommended" fill="#42825f" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={300} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Largest Gap</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">STEM: Highest Desire, Lowest Aptitude Match</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stemData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 60]} />
                      <Bar dataKey="Desired" fill="#db5a5a" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Desired" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Aptitude" fill="#db5a5a" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Aptitude" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Interest" fill="#db5a5a" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Interest" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#edf5f0] rounded-xl p-10 flex flex-col justify-center">
                  <h2 className="text-6xl font-bold text-[#db5a5a] mb-6 font-serif">47.9% → 3.0%</h2>
                  <p className="text-lg text-gray-800 leading-relaxed mb-10">127 students (47.9%) desired STEM despite a divergent profile. Only 8 of them (3.0%) tested with matching aptitude.</p>
                  <div className="border-t border-gray-300 pt-6"><p className="italic text-sm text-gray-600">This is the single largest desire-vs-readiness gap of any track in the cohort — the report attributes it to prestige, parental pressure, or perceived economic value rather than measured cognitive readiness.</p></div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Inverse Pattern</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10 font-serif">GAS: Under-Desired Despite Broad Aptitude Fit</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gasData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 60]} />
                      <Bar dataKey="Desired" fill="#42825f" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Desired" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Aptitude" fill="#42825f" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Aptitude" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                      <Bar dataKey="Interest" fill="#42825f" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Interest" position="top" fill="#333" fontSize={16} fontWeight="bold" formatter={(val) => val > 0 ? `${val}%` : ''} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#edf5f0] rounded-xl p-10 flex flex-col justify-center">
                  <h2 className="text-6xl font-bold text-[#42825f] mb-6 font-serif">1.5% → 56.2%</h2>
                  <p className="text-lg text-gray-800 leading-relaxed mb-10">Only 4 students actively chose GAS — yet 149 students (56.2%) had the aptitude profile that would recommend it.</p>
                  <div className="border-t border-gray-300 pt-6"><p className="italic text-sm text-gray-600">The reverse of the STEM pattern: GAS appears to be perceived as a low-prestige "fallback" option rather than the flexible, generalist pathway the aptitude data suggests it actually is for this group.</p></div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Untapped Potential</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">Physical-Spatial Aptitude Nobody Is Choosing</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={untappedData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 60]} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Desired" name="Student Desire" fill="#db5a5a" animationDuration={1000} />
                      <Bar dataKey="Aptitude" name="Aptitude-Recommended" fill="#42825f" animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#edf5f0] rounded-xl p-10 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">What this means</h3>
                  <ul className="space-y-4 text-gray-800 text-sm list-disc pl-5">
                    <li>108 students (40.8%) test as aptitude-fit for Sports, but only 45 (17.0%) desire it.</li>
                    <li>130 students (49.1%) test as aptitude-fit for Agro-Fishery — the single highest aptitude match rate of any track — yet only 5 students (1.9%) want it.</li>
                    <li>This points to strong physical-spatial and kinesthetic intelligence in the cohort that current guidance conversations aren't surfacing as a viable, prestigious option.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto bg-[#1a4331] text-white rounded-3xl my-12 shadow-2xl">
              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-2">Track Alignment — Behavioral Readiness</h3>
              <h1 className="text-4xl font-bold mb-16 font-serif">Below-Majority Self-Motivation Compounds the Risk</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                  <div className="w-80 h-80 rounded-full border-[8px] border-[#f6b21c] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(246,178,28,0.3)] bg-[#1a4331]">
                    <h2 className="text-7xl font-bold text-[#f6b21c] font-serif mb-2"><CountUp end={43.4} decimals={1} duration={2} />%</h2>
                    <p className="text-gray-300 text-sm tracking-wider uppercase">of the Grade 9 cohort</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xl font-medium mb-8 leading-relaxed">Grade 9 students show notable motivational issues or an absolute lack of motivation regarding academic task completion.</p>
                  <ul className="space-y-6 text-gray-300 list-disc pl-5">
                    <li>Below-majority of students in the cohort are organically self-motivated.</li>
                    <li>Motivated or not, students may still insist on tracks where they lack technical readiness — this is exactly the STEM pattern seen two slides ago.</li>
                    <li>The report recommends this be read alongside track choice: technical readiness AND motivation both need to be present for a track assignment to be sustainable through Senior High School.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Track Alignment — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Proposed Interventions Before SHS Enrollment</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4"><div className="bg-[#1a4331] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0 shadow-md">1</div><div><h4 className="font-bold mb-2">Academic Bridge Programs</h4><p className="text-sm text-gray-600">For students who insist on tracks (e.g. STEM) where they lack tested technical readiness.</p></div></div>
                <div className="flex gap-4"><div className="bg-[#1a4331] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0 shadow-md">2</div><div><h4 className="font-bold mb-2">Systematic Motivation Reinforcement</h4><p className="text-sm text-gray-600">Re-engineer curricular frameworks to sustain internal learner drive.</p></div></div>
                <div className="flex gap-4"><div className="bg-[#1a4331] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0 shadow-md">3</div><div><h4 className="font-bold mb-2">Attitude-Based Training</h4><p className="text-sm text-gray-600">Institutionalize behavioral workshops ahead of SHS.</p></div></div>
                <div className="flex gap-4"><div className="bg-[#1a4331] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0 shadow-md">4</div><div><h4 className="font-bold mb-2">Elevate Under-Chosen Tracks</h4><p className="text-sm text-gray-600">Build explicit counseling around GAS, Sports, and Agro-Fishery.</p></div></div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- TAB: SEL PROFILE ---------------- */}
        {activeTab === 'sel' && (
          <div className="animate-fade-in pb-20" key="sel">
            <section className="p-12 max-w-7xl mx-auto bg-gray-50 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-serif">02. Social-Emotional Learning (SEL)</h2>
              <p className="text-gray-600 mb-8">Grades 1–9 • N = 1,308 students • 11 developmental dimensions</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                <div className="p-4"><strong className="text-2xl text-[#1a4331] font-serif block mb-1">Grades 1-3</strong><span className="text-sm text-gray-500 font-medium">301 students</span></div>
                <div className="p-4 border-l border-r border-gray-100"><strong className="text-2xl text-[#1a4331] font-serif block mb-1">Grades 4-6</strong><span className="text-sm text-gray-500 font-medium">321 students</span></div>
                <div className="p-4"><strong className="text-2xl text-[#1a4331] font-serif block mb-1">Grades 7-9</strong><span className="text-sm text-gray-500 font-medium">686 students</span></div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">SEL — Institutional Strengths</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4 font-serif">A Strong, Caring, Physically Safe Environment</h1>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selStrengthsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[3, 4.5]} />
                    <Tooltip cursor={{ fill: '#f4f4f4' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Teacher-Student" fill="#1a4331" animationDuration={1000} />
                    <Bar dataKey="Physical Surroundings" fill="#42825f" animationDuration={1000} />
                    <Bar dataKey="Social Awareness" fill="#f6b21c" animationDuration={1000} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">SEL — The Perseverance Gap</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Grit Is the Lowest-Scoring Dimension — Every Cohort</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selGritData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 14, fontWeight: 'bold' }} />
                      <YAxis domain={[3, 4.4]} axisLine={false} tickLine={false} />
                      <Tooltip content={<GlassTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line type="monotone" dataKey="Teacher-Student Connection" stroke="#42825f" strokeWidth={4} dot={{ r: 6, fill: '#42825f' }} activeDot={{ r: 8 }} animationDuration={2000} />
                      <Line type="monotone" dataKey="Physical Surroundings" stroke="#f6b21c" strokeWidth={4} dot={{ r: 6, fill: '#f6b21c' }} activeDot={{ r: 8 }} animationDuration={2000} animationBegin={300} />
                      <Line type="monotone" dataKey="Grit" stroke="#db5a5a" strokeWidth={4} dot={{ r: 6, fill: '#db5a5a' }} activeDot={{ r: 8 }} animationDuration={2000} animationBegin={600} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bento-card bg-[#fff5f5] rounded-2xl p-10 flex flex-col justify-center shadow-lg border border-[#fecaca] cursor-pointer" onClick={triggerSparks}>
                  <h2 className="text-7xl font-bold text-[#db5a5a] mb-6 font-serif tracking-tighter">
                    <CountUp end={3.40} decimals={2} duration={2} /> – <CountUp end={3.60} decimals={2} duration={2} />
                  </h2>
                  <p className="text-lg text-gray-800 leading-relaxed mb-6 font-medium">Grit's range across all cohorts — students rate themselves as only "somewhat focused and persistent" toward long-term goals.</p>
                  <div className="pt-6 border-t border-[#fca5a5]">
                    <p className="text-gray-600 text-sm italic">A supportive, resource-rich environment does not automatically build personal resilience — grit requires its own, distinct cultivation.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#2a6a5a] text-white">
              <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-2">SEL — The Adolescent Dip</h3>
              <h1 className="text-4xl font-bold mb-8 font-serif">Grades 7–9 Show a Clear Contraction</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selDipData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3b7b59" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis domain={[3, 4.2]} stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: '#1a4331', border: 'none', color: '#fff' }} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Sense of Belonging" fill="#f6b21c" animationDuration={1000} />
                      <Bar dataKey="Self-Efficacy" fill="#e2e8f0" animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Sense of Belonging</h4>
                    <p className="text-3xl text-[#f6b21c] font-bold">3.89 → 3.51</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Self-Efficacy</h4>
                    <p className="text-3xl text-gray-300 font-bold">3.63 → 3.48 <span className="text-sm font-normal">(institutional low)</span></p>
                  </div>
                  <p className="text-sm text-gray-200 pt-6 border-t border-[#3b7b59] italic">As students enter junior high, heightened sensitivity to peer status and social validation coincides with declining institutional belonging and academic confidence.</p>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-white">
              <h3 className="text-[#db5a5a] font-bold tracking-widest text-sm uppercase mb-2">SEL — Early-Grade Vulnerability</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Youngest Students Are Least Cyber-Prepared</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selCyberData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[3, 4.2]} />
                      <Bar dataKey="Value" fill="#f6b21c" barSize={80} animationDuration={1000}>
                        <LabelList dataKey="Value" position="top" fill="#1a1a1a" fontSize={18} fontWeight="bold" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#edf5f0] rounded-xl p-10 flex flex-col justify-center shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-[#1a4331]">Within Grades 1–3 specifically:</h3>
                  <p className="text-[#1a4331] font-bold text-xl mb-6">Grade 1: 3.52 • Grade 2: 3.51 • Grade 3: 3.81</p>
                  <ul className="space-y-4 text-gray-800 text-sm list-disc pl-5">
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
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-[#1a4331] uppercase bg-[#f4f7f5] border-b border-gray-200">
                    <tr><th className="px-6 py-5 tracking-wider">Dimension</th><th className="px-6 py-5 tracking-wider">Grades 1-3</th><th className="px-6 py-5 tracking-wider">Grades 4-6</th><th className="px-6 py-5 tracking-wider">Grades 7-9</th><th className="px-6 py-5 tracking-wider">Trend</th></tr>
                  </thead>
                  <tbody>
                    {selTable.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-[#edf5f0] transition-colors duration-200">
                        <td className="px-6 py-4 font-bold text-gray-900">{row.dim}</td><td className="px-6 py-4">{row.g1}</td><td className="px-6 py-4">{row.g4}</td><td className="px-6 py-4 font-bold text-[#db5a5a]">{row.g7}</td><td className="px-6 py-4 italic text-gray-500">{row.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">SEL — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Proposed Interventions for SEL Development</h1>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#2a6a5a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">1</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Evidence-Based Grit & Resilience Curriculum</h3><p className="text-gray-600">Embed goal-setting exercises, mistake-normalization strategies, and extended project milestones into the core curriculum.</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#2a6a5a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">2</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Junior High Transition Support Systems</h3><p className="text-gray-600">Intentional socio-emotional check-ins, peer mentorship, and small-group advisory sessions to counter the Grades 7–9 dip in belonging and self-efficacy.</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#2a6a5a] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">3</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Early Digital Citizenship Frameworks</h3><p className="text-gray-600">Introduce formal internet-safety and digital-literacy modules starting in Grades 1–3, not only at the JHS level.</p></div>
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
              <p className="text-gray-600 mb-8">Mathematics and Science • 129 students, 4 sections • Tested January 19, 2026</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><strong className="text-[#42825f]">Section A:</strong> 34 students</div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><strong className="text-[#42825f]">Section B:</strong> 31 students</div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><strong className="text-[#42825f]">Section C:</strong> 33 students</div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><strong className="text-[#42825f]">Section D:</strong> 31 students</div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Mathematics</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 font-serif">Mathematics: Proficiency by Section</h1>
              <p className="text-gray-600 mb-10">Mean Scaled Ability Score — Section A: 77 • Section B: 81 • Section C: 77 • Section D: 78 | Cohort mean: 78.25</p>
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mathSectionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontWeight: 'bold' }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Not Met" stackId="a" fill="#db5a5a" animationDuration={1200} />
                    <Bar dataKey="Progressing" stackId="a" fill="#f6b21c" animationDuration={1200} />
                    <Bar dataKey="Proficient" stackId="a" fill="#42825f" animationDuration={1200} />
                    <Bar dataKey="Highly Proficient" stackId="a" fill="#1a4331" radius={[8, 8, 0, 0]} animationDuration={1200} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Mathematics</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Math: Where Students Excel vs. Struggle</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bento-card bg-white p-8 rounded-2xl shadow-lg border-t-8 border-[#42825f]">
                  <h2 className="text-[#42825f] text-2xl font-bold mb-8 flex items-center"><div className="w-3 h-3 rounded-full bg-[#42825f] mr-3"></div>STRENGTHS</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Understanding graph types & purposes</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">94-100%</span> | Nat. bench: 80%</p></div>
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Reading & interpreting charts/tables</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">87-100%</span> | Nat. bench: 80%</p></div>
                    <div><h4 className="font-bold text-gray-900 text-lg">Base & exponent concepts</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">85-100%</span> | Nat. bench: 87%</p></div>
                  </div>
                </div>
                <div className="bento-card bg-white p-8 rounded-2xl shadow-lg border-t-8 border-[#db5a5a]">
                  <h2 className="text-[#db5a5a] text-2xl font-bold mb-8 flex items-center"><div className="w-3 h-3 rounded-full bg-[#db5a5a] mr-3"></div>GAPS</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Listing outcomes & sample spaces (probability)</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">3-10%</span> | Nat. bench: 20%</p></div>
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Corresponding angles on parallel lines</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">3-13%</span> | Nat. bench: 19%</p></div>
                    <div><h4 className="font-bold text-gray-900 text-lg">Calculating circumference of a circle</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">18-19%</span> | Nat. bench: 29%</p></div>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg">
                <p className="text-gray-800 italic">Applied geometry, probability, and advanced fractions consistently trail the national benchmark — aligning with Piaget's account of the Grade 6 shift from concrete to formal-operational reasoning.</p>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Science</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 font-serif">Science: Proficiency by Section</h1>
              <p className="text-gray-600 mb-10">Mean Scaled Ability Score — Section A: 82 • Section B: 81 • Section C: 80 • Section D: 80 | Cohort mean: 80.75</p>
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sciSectionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontWeight: 'bold' }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Not Met" stackId="a" fill="#db5a5a" animationDuration={1200} />
                    <Bar dataKey="Progressing" stackId="a" fill="#f6b21c" animationDuration={1200} />
                    <Bar dataKey="Proficient" stackId="a" fill="#42825f" animationDuration={1200} />
                    <Bar dataKey="Highly Proficient" stackId="a" fill="#1a4331" radius={[8, 8, 0, 0]} animationDuration={1200} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Science</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Science: Where Students Excel vs. Struggle</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bento-card bg-white p-8 rounded-2xl shadow-lg border-t-8 border-[#42825f]">
                  <h2 className="text-[#42825f] text-2xl font-bold mb-8 flex items-center"><div className="w-3 h-3 rounded-full bg-[#42825f] mr-3"></div>STRENGTHS</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Interpreting graphs</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">97-100%</span> | Nat. bench: 92%</p></div>
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Identifying tropical rainforest ecosystems</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">97-100%</span> | Nat. bench: 86%</p></div>
                    <div><h4 className="font-bold text-gray-900 text-lg">Demonstrating basic measurement skills</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#42825f]">88-97%</span> | Nat. bench: 81%</p></div>
                  </div>
                </div>
                <div className="bento-card bg-white p-8 rounded-2xl shadow-lg border-t-8 border-[#db5a5a]">
                  <h2 className="text-[#db5a5a] text-2xl font-bold mb-8 flex items-center"><div className="w-3 h-3 rounded-full bg-[#db5a5a] mr-3"></div>GAPS</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Stating the Law of Conservation of Energy</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">0-3%</span> | Nat. bench: 30%</p></div>
                    <div className="border-b border-gray-100 pb-4"><h4 className="font-bold text-gray-900 text-lg">Properties of homogeneous mixtures</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">6-16%</span> | Nat. bench: 23%</p></div>
                    <div><h4 className="font-bold text-gray-900 text-lg">Explaining the process of digestion</h4><p className="text-sm text-gray-500 mt-1">Score: <span className="font-bold text-[#db5a5a]">9-15%</span> | Nat. bench: 20%</p></div>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg">
                <p className="text-gray-800 italic">Higher-order, abstract physical-science concepts (unseen forces, systemic processes) lag well behind concrete, observable skills like reading graphs or identifying ecosystems.</p>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-2">Grade 6 SBA — Cross-Subject</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Science Outperforms Math at the Cohort Level</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={crossSubjectData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 60]} />
                      <Tooltip content={<GlassTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Math" fill="#42825f" animationDuration={1000} />
                      <Bar dataKey="Science" fill="#1a4331" animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-6 bg-[#edf5f0] p-8 rounded-xl shadow-sm border border-[#3b7b59]/20">
                  <div><h4 className="text-2xl font-bold mb-1">78.25 vs. 80.75</h4><p className="text-sm text-gray-600">Mean Scaled Ability Score, Math vs. Science</p></div>
                  <p className="text-gray-800 font-medium">57.4% of students are Proficient or Highly Proficient in Science, vs. 41.8% in Math.</p>
                  <p className="text-gray-800">Math's largest cluster (50.4%) sits in "Progressing" — the widest single gap-closing opportunity across both subjects.</p>
                  <p className="text-gray-800 italic border-t border-gray-300 pt-4">Both subjects show the same underlying pattern: concrete/observable skills are strong, abstract/multi-step reasoning needs scaffolding.</p>
                </div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto border-b border-gray-200 bg-[#f8faf9]">
              <h3 className="text-[#3b7b59] font-bold tracking-widest text-sm uppercase mb-4">Grade 6 SBA — Recommendations</h3>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">Targeted, Tiered Interventions</h1>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#42825f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">1</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Re-anchor Geometric & Spatial Reasoning</h3><p className="text-gray-600">Shift from formula memorization to hands-on manipulation — physical models and visual tools for angle relationships and circular measurement.</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#42825f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">2</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Concrete Probability & Outcome Tracking</h3><p className="text-gray-600">Tree diagrams, grid charts, and hands-on outcome experiments to make sample spaces tangible.</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#42825f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">3</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Interactive Physical Science Activities</h3><p className="text-gray-600">Lab experiments and simulations for energy conservation, mixture separation, and digestive processes.</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#42825f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shrink-0 text-xl">4</div>
                  <div><h3 className="font-bold text-xl mb-2 text-gray-900">Differentiate by Tier</h3><p className="text-gray-600">Small-group remediation for Not Met Standards (10 in Math, 1 in Science); weekly spiral review for the Progressing "middle majority" (65 in Math, 54 in Science); enrichment tasks for Highly Proficient students.</p></div>
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
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8 font-serif">What the Three Studies Say Together</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"><div className="text-[#42825f] font-bold text-2xl">1</div><div><h4 className="font-bold text-lg mb-2">Environment is a genuine strength</h4><p className="text-sm text-gray-600">High Teacher-Student Connection and Physical Surroundings scores, plus strong Science and HUMSS performance, show DLSU IS's institutional foundation is solid.</p></div></div>
                <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"><div className="text-[#42825f] font-bold text-2xl">2</div><div><h4 className="font-bold text-lg mb-2">Desire and readiness don't always meet</h4><p className="text-sm text-gray-600">Grade 9 STEM desire vs. aptitude, and Grade 6 Math's "Progressing" cluster, are two versions of the same story: aspiration outpacing demonstrated readiness.</p></div></div>
                <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"><div className="text-[#42825f] font-bold text-2xl">3</div><div><h4 className="font-bold text-lg mb-2">The junior high years are the pressure point</h4><p className="text-sm text-gray-600">The SEL "Adolescent Dip" (Grades 7–9) and the persistent Grit gap both concentrate exactly where students are also choosing SHS tracks — these are not separate problems.</p></div></div>
                <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"><div className="text-[#42825f] font-bold text-2xl">4</div><div><h4 className="font-bold text-lg mb-2">Abstract reasoning is the shared skill gap</h4><p className="text-sm text-gray-600">Grade 6 Math and Science both show strength in concrete/observable tasks and weakness in abstract, multi-step, or unseen-mechanism reasoning.</p></div></div>
              </div>
            </section>

            <section className="p-12 max-w-7xl mx-auto bg-[#1a4331] text-white relative overflow-hidden rounded-3xl my-12 shadow-2xl">
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2a5a41] rounded-full opacity-50 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b7b59] rounded-full opacity-30 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-[#f6b21c] font-bold tracking-widest text-sm uppercase mb-4 drop-shadow-md">Closing — Consolidated Recommendations</h3>
                <h1 className="text-4xl font-bold mb-12 font-serif">Three Priorities for the Coming Year</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="bg-[#2a5a41]/50 p-8 rounded-xl border border-[#3b7b59]/30 hover:border-[#f6b21c]/50 transition-colors duration-300">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6 shadow-lg">1</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Bridge the Readiness Gap</h3>
                    <p className="text-gray-300 leading-relaxed">Academic bridge programs for over-desired, under-ready tracks (STEM); elevate under-chosen, high-aptitude pathways (GAS, Sports, Agro-Fishery) in guidance counseling.</p>
                  </div>
                  <div className="bg-[#2a5a41]/50 p-8 rounded-xl border border-[#3b7b59]/30 hover:border-[#f6b21c]/50 transition-colors duration-300">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6 shadow-lg">2</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Invest in Grit & JHS Transition</h3>
                    <p className="text-gray-300 leading-relaxed">Institution-wide grit/resilience curriculum plus dedicated Grades 7–9 advisory and peer-mentorship structures to counter the Adolescent Dip.</p>
                  </div>
                  <div className="bg-[#2a5a41]/50 p-8 rounded-xl border border-[#3b7b59]/30 hover:border-[#f6b21c]/50 transition-colors duration-300">
                    <div className="bg-[#f6b21c] text-[#1a4331] rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-6 shadow-lg">3</div>
                    <h3 className="font-bold text-2xl mb-4 text-white">Scaffold Abstract Reasoning</h3>
                    <p className="text-gray-300 leading-relaxed">Hands-on, manipulative-based instruction for geometry, probability, and physical science concepts — starting from Grade 6 and reinforced through JHS.</p>
                    <div className="mt-4 pt-4 border-t border-[#3b7b59]/50">
                      <p className="text-sm text-gray-400 italic">Operational Note: To execute this effectively, institutional hardware procurement workflows must be streamlined, ensuring internal vendor proposals are processed without administrative delay.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Restored Closing Signature */}
            <div className="mt-12 text-center text-gray-500 animate-fade-in delay-200">
              <h2 className="text-3xl font-serif font-bold text-[#1a4331] mb-2">Thank You</h2>
              <p className="text-lg mb-4">Questions and Discussion</p>
              <p className="text-sm font-bold uppercase tracking-widest text-[#3b7b59]">Office of The Vice Principal for Teaching and Learning • De La Salle University Integrated School – Laguna</p>
            </div>
          </div>
        )}
      </main>

      {/* ---------------- ITEM 4: FLOATING AI COMMAND CENTER ---------------- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* The Slide-Out Panel */}
        {isAIOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-6 animate-fade-in origin-bottom-right">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center text-[#1a4331] font-bold">
                <Sparkles size={20} className="mr-2 text-[#f6b21c]" />
                Google Antigravity AI
              </div>
              <button onClick={() => setIsAIOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {getAIInsight()}
            </p>
          </div>
        )}

        {/* The Floating Action Button */}
        <button
          onClick={() => setIsAIOpen(!isAIOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${isAIOpen ? 'bg-[#f6b21c] text-[#1a4331]' : 'bg-[#1a4331] text-white hover:bg-[#2a5a41]'}`}
        >
          {isAIOpen ? <X size={28} /> : <Bot size={28} />}
        </button>
      </div>

    </div>
  );
}