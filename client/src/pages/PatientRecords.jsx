import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, FileText, Plus, Clock, Filter, MoreVertical, Smartphone } from 'lucide-react';
import { getPatients } from '../services/api';

const PatientRecords = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPatients().then(res => {
            setPatients(res.data);
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
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Records</h1>
                        <p className="text-slate-500">Manage digital health records and visit history.</p>
                    </div>
                    <button className="btn-primary flex items-center justify-center gap-2">
                        <Plus size={20} /> Add New Patient
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                                <Filter size={18} className="text-primary-600" /> Filter Patients
                            </h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" placeholder="Search by name..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Risk Status</p>
                                    <div className="space-y-2">
                                        {['High Risk', 'Medium', 'Safe'].map((label, idx) => (
                                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors uppercase font-bold text-[10px] tracking-wider">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Records List */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {patients.map((patient, idx) => (
                                <motion.div
                                    key={patient.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-[2.5rem] shadow-soft border border-slate-100 card-hover relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{patient.name}</h3>
                                                <p className="text-sm text-slate-500">{patient.age} Years • Male</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${patient.risk === 'High' ? 'bg-rose-100 text-rose-700' :
                                                patient.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {patient.risk} Risk
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <FileText size={16} className="text-slate-400" />
                                            <span>Condition: <span className="font-bold text-slate-800">{patient.condition}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <Smartphone size={16} className="text-slate-400" />
                                            <span>Phone: <span className="font-bold text-slate-800">{patient.phone}</span></span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                                        <div className="flex-1 border-r border-slate-200">
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Last Visit</p>
                                            <p className="text-sm font-bold text-slate-700">{patient.lastVisit}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Next Follow-up</p>
                                            <p className="text-sm font-bold text-primary-600">{patient.nextFollowUp}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                                            Visit History
                                        </button>
                                        <button className="flex-1 py-3 bg-primary-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all">
                                            Manage EHR
                                        </button>
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientRecords;
