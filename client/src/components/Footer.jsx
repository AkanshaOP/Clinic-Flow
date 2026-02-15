import React from 'react';
import { Activity, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                <Activity size={20} />
                            </div>
                            <span className="text-xl font-black text-slate-900">ClinicFlow</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                            Empowering local clinics with smart digital solutions for better patient care and efficient management.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-soft transition-all"><Instagram size={20} /></a>
                            <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-soft transition-all"><Twitter size={20} /></a>
                            <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-soft transition-all"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Doctor Dashboard', 'Book Appointment', 'Analytics', 'Patient EHR'].map((link) => (
                                <li key={link}><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm font-medium">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Services</h4>
                        <ul className="space-y-4">
                            {['Smart Scheduling', 'AI Follow-up', 'Digital Records', 'Analytics Hub', 'Cloud Backup'].map((link) => (
                                <li key={link}><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm font-medium">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-slate-500 text-sm">
                                <MapPin className="text-primary-600 shrink-0" size={18} />
                                <span>402, Medical Square, MG Road, Mumbai, Maharashtra 400001, India</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-500 text-sm">
                                <Phone className="text-primary-600 shrink-0" size={18} />
                                <span>+91 22 2345 6789</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-500 text-sm">
                                <Mail className="text-primary-600 shrink-0" size={18} />
                                <span>contact@clinicflow.co.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-xs">2026 ClinicFlow AI. All rights reserved by Healthcare Tech Inc.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
