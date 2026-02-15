import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Users, Calendar, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getStats } from '../services/api';

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStats().then(res => {
            setStats(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const illnessData = [
        { name: 'Common Cold', value: 35 },
        { name: 'Hypertension', value: 25 },
        { name: 'Diabetes', value: 20 },
        { name: 'Arthritis', value: 10 },
        { name: 'Others', value: 10 },
    ];

    const COLORS = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#f43f5e'];

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-12 px-6">
            <div className="container mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Advanced Analytics</h1>
                    <p className="text-slate-500 text-lg">Deep dive into your clinic's performance data and patient trends.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {[
                        { label: 'Avg Daily Patients', value: '24.5', trend: '+12%', icon: Users, isUp: true },
                        { label: 'Follow-up Rate', value: '82%', trend: '+5%', icon: Activity, isUp: true },
                        { label: 'Missed Rate', value: '4.2%', trend: '-1.5%', icon: Calendar, isUp: false }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-soft border border-slate-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-slate-500 font-medium mb-1">{item.label}</p>
                                <h3 className="text-4xl font-bold text-slate-900">{item.value}</h3>
                                <div className={`mt-2 flex items-center gap-1 font-bold text-sm ${item.isUp ? 'text-green-600' : 'text-primary-600'}`}>
                                    {item.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {item.trend} vs last month
                                </div>
                            </div>
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                                <item.icon className="text-slate-400" size={32} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-10">
                    <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100">
                        <h3 className="text-xl font-bold mb-8">Monthly Patient Visit Volume</h3>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.patientVisits}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="visits" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100">
                        <h3 className="text-xl font-bold mb-8 text-center">Disease Distribution</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={illnessData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {illnessData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 mt-6">
                            {illnessData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                        <span className="text-slate-600 font-medium">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-slate-800">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-primary-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Export Detailed Reports</h2>
                            <p className="text-primary-100 max-w-lg">Get comprehensive clinical reports, financial statements, and patient satisfaction surveys in PDF or CSV format.</p>
                        </div>
                        <button className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-50 transition-all">
                            Download Full Report
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
