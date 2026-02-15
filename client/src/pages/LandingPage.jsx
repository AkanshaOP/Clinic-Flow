import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Users, BarChart, ChevronRight, Activity, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-primary-50 via-white to-primary-50">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block py-1 px-4 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                                    Healthcare 2.0 is here
                                </span>
                                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                                    Smart Digital Solution for <span className="text-primary-600">Local Clinics</span>
                                </h1>
                                <p className="text-xl text-slate-600 mb-8 max-w-xl">
                                    Streamline appointments, manage patient records, and automate follow-ups with our AI-powered clinic management system.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link to="/book" className="btn-primary flex items-center justify-center gap-2 group">
                                        Book Appointment
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/dashboard" className="btn-secondary flex items-center justify-center">
                                        Doctor Login
                                    </Link>
                                    <Link to="/book" className="btn-secondary flex items-center justify-center">
                                        Patient Login
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="bg-white p-6 rounded-3xl shadow-premium border border-primary-50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <Activity className="text-primary-500 animate-pulse" />
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1200"
                                        alt="Local Medical Clinic Office"
                                        className="rounded-2xl shadow-lg border border-slate-100 object-cover aspect-video"
                                    />
                                    <div className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-primary-50 animate-bounce-slow">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <Users className="text-green-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">12 New Patients</p>
                                            <p className="text-xs text-slate-500">Joined today</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Powerful Features for Modern Clinics</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to manage your medical practice efficiently in one place.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Calendar, title: "Smart Scheduling", desc: "Automated booking with zero overlaps and instant confirmation." },
                            { icon: Users, title: "Patient Records", desc: "Secure digital storage for complete patient history and diagnosis." },
                            { icon: Bell, title: "AI Follow-up Alerts", desc: "Smart reminders for critical follow-ups and medication updates." },
                            { icon: BarChart, title: "Analytics Dashboard", desc: "Real-time insights into clinic performance and patient trends." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 card-hover"
                            >
                                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                                    <feature.icon className="text-primary-600" size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="bg-primary-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8">"ClinicFlow transformed our workflow. We reduced missed appointments by 40% in just two months."</h2>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 overflow-hidden shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
                                        alt="Dr. Rajesh Khanna"
                                        className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <div>
                                        <p className="font-bold text-xl">Dr. Rajesh Khanna</p>
                                        <p className="text-primary-100">Chief Medical Officer, Apollo Clinic Network</p>
                                    </div>                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
