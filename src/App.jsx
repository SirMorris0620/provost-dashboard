import React from 'react';
import { BarChart3, Users, BrainCircuit, Target, TrendingDown, Wrench } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';

// Grade 6 Assessment Data
const grade6Data = [
  { name: 'Not Met', Math: 7.8, Science: 0.8 },
  { name: 'Progressing', Math: 50.4, Science: 41.9 },
  { name: 'Proficient', Math: 36.4, Science: 53.5 },
  { name: 'Highly Proficient', Math: 5.4, Science: 3.9 },
];

// Grade 9 SHS Gap Data
const shsData = [
  { name: 'STEM', Desired: 47.9, Aptitude: 3.0 },
  { name: 'ABM', Desired: 38.1, Aptitude: 7.9 },
  { name: 'Sports', Desired: 17.0, Aptitude: 40.8 },
  { name: 'GAS', Desired: 1.5, Aptitude: 56.2 },
];

function App() {
  const triggerSparks = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + (rect.width / 2)) / window.innerWidth;
    const y = (rect.top + (rect.height / 2)) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y },
      colors: ['#38bdf8', '#34d399', '#fbbf24'],
      disableForReducedMotion: true,
      ticks: 100,
      gravity: 1.2
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans relative overflow-hidden text-slate-200">

      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Header */}
      <header className="mb-8 relative z-10 animate-slide-up">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
          Institutional Health Dashboard
        </h1>
        <p className="text-slate-400 mt-2 font-light tracking-wide">De La Salle University Integrated School - Laguna | AY 2025-2026</p>
      </header>

      {/* TOP ROW: Main Data Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

        {/* Card 1: Grade 6 Academic Baselines */}
        <div className="col-span-1 md:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700/50 animate-slide-up delay-100">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-700/50 pb-4">
            <BarChart3 className="text-emerald-400" size={28} />
            {/* UPDATED TITLE HERE */}
            <h2 className="text-xl font-semibold text-slate-100 tracking-wide">Grade 6 Standards-Based Assessment (SBA): Math vs. Science (%)</h2>
          </div>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grade6Data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Math" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Science" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: SEL / The Perseverance Gap */}
        <div className="col-span-1 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700/50 relative overflow-hidden group flex flex-col justify-center animate-slide-up delay-200">
          <div className="flex items-center space-x-3 mb-2 border-b border-slate-700/50 pb-4 absolute top-6 left-6 right-6">
            <BrainCircuit className="text-blue-400" size={28} />
            {/* UPDATED TITLE HERE */}
            <h2 className="text-xl font-semibold text-slate-100 tracking-wide">Socio-Emotional Learning (SEL): The Perseverance Gap</h2>
          </div>
          <div className="mt-16 relative z-10 text-center">
            <p
              onClick={triggerSparks}
              className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 tracking-tighter drop-shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 active:scale-95"
            >
              3.40
            </p>
            {/* UPDATED SUBTEXT HERE */}
            <p className="text-sm text-blue-300 mt-6 font-medium uppercase tracking-widest">Lowest SEL Dimension Score Across All Cohorts (Grit)</p>
          </div>
        </div>

        {/* Card 3: Grade 9 SHS Track Alignment */}
        <div className="col-span-1 md:col-span-3 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700/50 mt-2 animate-slide-up delay-300">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-700/50 pb-4">
            <Users className="text-amber-400" size={28} />
            {/* UPDATED TITLE HERE */}
            <h2 className="text-xl font-semibold text-slate-100 tracking-wide">Grade 9 SHS Tracks: Desired vs. Aptitude-Recommended (%)</h2>
          </div>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Desired" name="Desired Track" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Aptitude" name="Recommended (Aptitude)" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Strategic Narrative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 relative z-10 mb-8">

        {/* Narrative 1: Concrete vs Abstract */}
        <div className="col-span-1 bg-slate-900/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 animate-slide-up delay-500">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="text-emerald-400" size={20} />
            <h3 className="text-lg font-semibold text-slate-200">The Abstract Deficit</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            While 50.4% of Grade 6 Math students are "Progressing," item analysis reveals a cognitive bottleneck. Students excel at concrete tasks (<span className="text-slate-200 font-medium">94-100% in graph reading</span>) but fail abstract reasoning concepts (<span className="text-slate-200 font-medium">0-3% in Law of Conservation of Energy; 3-10% in probability listings</span>).
          </p>
        </div>

        {/* Narrative 2: Adolescent Dip */}
        <div className="col-span-1 bg-slate-900/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 animate-slide-up delay-500" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingDown className="text-blue-400" size={20} />
            <h3 className="text-lg font-semibold text-slate-200">The Adolescent Dip</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Despite high institutional environmental marks (Physical Surroundings peak at 4.31), an internal drive gap exists. Grit consistently scores the lowest across all cohorts (3.40), while Grades 7-9 suffer a severe drop in Sense of Belonging (3.51) and <span className="text-slate-200 font-medium">Self-Efficacy hits an institutional low of 3.48</span>.
          </p>
        </div>

        {/* Narrative 3: Strategic Action Plan */}
        <div className="col-span-1 bg-slate-900/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 animate-slide-up delay-500" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center space-x-2 mb-3">
            <Wrench className="text-amber-400" size={20} />
            <h3 className="text-lg font-semibold text-slate-200">Strategic Action Plan</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The abstract deficit and low self-efficacy are funneling underprepared students into STEM. We must shift to <span className="text-slate-200 font-medium">interactive, tactile lab interventions</span>. Hardware budgets exist, but execution requires submitting requests to procurement and selecting internal vendor proposals rapidly to bypass administrative bottlenecks.
          </p>
        </div>

      </div>

    </div>
  );
}

export default App;