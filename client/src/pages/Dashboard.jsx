import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, AlertCircle, Clock, Search, ChevronRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getStats } from '../services/api';

const Dashboard = () => {
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

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-12 px-6">
            <div className="container mx-auto">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Physician Dashboard</h1>
                            <p className="text-slate-500">Welcome back, Dr. Sameer. Here's your clinic overview.</p>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search patients by name or ID..."
                                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-soft"
                            />
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'bg-blue-500', trend: '+5.2%' },
                        { label: 'Today Appointments', value: stats.todayAppointments, icon: Calendar, color: 'bg-indigo-500', trend: '-2.1%' },
                        { label: 'Follow-ups Due', value: stats.followUpsDue, icon: AlertCircle, color: 'bg-amber-500', trend: '+12.5%' },
                        { label: 'Missed Visits', value: stats.missedAppointments, icon: Clock, color: 'bg-rose-500', trend: '-1.4%' }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="text-primary-600" size={20} />
                            Weekly Appointment Trends
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.appointmentData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 text-center">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 justify-center">
                            <AlertCircle className="text-amber-500" size={20} />
                            Follow-up Completion Status
                        </h3>
                        <div className="h-80 relative flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.followUpStatus}
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {stats.followUpStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <p className="text-3xl font-bold text-slate-900">82%</p>
                                <p className="text-xs text-slate-500">Success Rate</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            {stats.followUpStatus.map((status, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                                    <span className="text-sm text-slate-600">{status.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tables/Lists Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Upcoming Appointments</h3>
                            <button className="text-primary-600 font-semibold text-sm hover:underline">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Doctor</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: 'Arjun Mehta', doctor: 'Dr. Sameer', time: '10:30 AM', status: 'Confirmed', img: 'https://i.pravatar.cc/150?u=1' },
                                        { name: 'Priya Sharma', doctor: 'Dr. Anjali', time: '11:45 AM', status: 'Pending', img: 'https://i.pravatar.cc/150?u=2' },
                                        { name: 'Rajesh Kumar', doctor: 'Dr. Sameer', time: '02:00 PM', status: 'Confirmed', img: 'https://i.pravatar.cc/150?u=3' },
                                        { name: 'Kavita Iyer', doctor: 'Dr. Anjali', time: '04:15 PM', status: 'Emergency', img: 'https://i.pravatar.cc/150?u=4' }
                                    ].map((apt, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={apt.img} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                                                    <span className="font-medium text-slate-700">{apt.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{apt.doctor}</td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{apt.time}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                    apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                                    }`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-primary-600">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-6">
                        <h3 className="text-lg font-bold mb-6">Smart Follow-up Alerts</h3>
                        <div className="space-y-4">
                            {[
                                { type: 'high', label: 'High Risk', patient: 'Priya Sharma', msg: 'Missed last blood sugar check', color: 'bg-rose-50 border-rose-100 text-rose-700', icon: AlertCircle },
                                { type: 'medium', label: 'Needed', patient: 'Rajesh Kumar', msg: 'Next arthritis check due tomorrow', color: 'bg-amber-50 border-amber-100 text-amber-700', icon: Clock },
                                { type: 'low', label: 'Routine', patient: 'Arjun Mehta', msg: 'Schedule general physical exam', color: 'bg-blue-50 border-blue-100 text-blue-700', icon: Calendar }
                            ].map((alert, i) => (
                                <div key={i} className={`p-4 rounded-2xl border-l-4 ${alert.color} relative overflow-hidden group`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{alert.label}</span>
                                        <alert.icon size={14} />
                                    </div>
                                    <h4 className="font-bold mb-1">{alert.patient}</h4>
                                    <p className="text-sm opacity-90">{alert.msg}</p>
                                    <button className="mt-3 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                        Take Action <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
