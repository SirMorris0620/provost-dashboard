import React from 'react';
import { BarChart3, Users, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Grade 6 Assessment Data
const grade6Data = [
  { name: 'Not Met', Math: 7.8, Science: 0.8 },
  { name: 'Progressing', Math: 50.4, Science: 41.9 },
  { name: 'Proficient', Math: 36.4, Science: 53.5 },
  { name: 'Highly Proficient', Math: 5.4, Science: 3.9 },
];

// Grade 9 SHS Gap Data (Expectation vs Reality)
const shsData = [
  { name: 'STEM', Desired: 47.9, Aptitude: 3.0 },
  { name: 'ABM', Desired: 38.1, Aptitude: 7.9 },
  { name: 'Sports', Desired: 17.0, Aptitude: 40.8 },
  { name: 'GAS', Desired: 1.5, Aptitude: 56.2 },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Institutional Health Dashboard</h1>
        <p className="text-slate-500 mt-1">De La Salle University Integrated School - Laguna | AY 2025-2026</p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Grade 6 Academic Baselines */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md cursor-default">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="text-emerald-600" />
            <h2 className="text-xl font-semibold text-slate-700">Grade 6 Academic Baselines (%)</h2>
          </div>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grade6Data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Math" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Science" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: SEL / The Perseverance Gap */}
        <div className="col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md cursor-default relative overflow-hidden group">
          <div className="flex items-center space-x-2 mb-4">
            <BrainCircuit className="text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-700">The Perseverance Gap</h2>
          </div>
          <div className="mt-8 relative z-10">
            <p className="text-6xl font-black text-slate-800 tracking-tighter transition-transform transform group-hover:scale-105 group-hover:text-blue-600 duration-300">3.40</p>
            <p className="text-sm text-slate-500 mt-3 font-medium">Lowest baseline metric across all grades (Grit)</p>
          </div>
          {/* Subtle background element for aesthetics */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
        </div>

        {/* Card 3: Grade 9 SHS Track Alignment */}
        <div className="col-span-1 md:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-2 transition-all hover:shadow-md cursor-default">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-amber-500" />
            <h2 className="text-xl font-semibold text-slate-700">Grade 9 SHS Alignment: Expectation vs Reality (%)</h2>
          </div>
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#fffbeb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Desired" name="Desired Track" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Aptitude" name="Recommended (Aptitude)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;