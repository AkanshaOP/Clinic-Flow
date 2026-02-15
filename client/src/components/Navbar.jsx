import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Patients', path: '/patients' },
        { name: 'Book Now', path: '/book' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-soft' : 'py-6 bg-transparent'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">ClinicFlow</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-bold transition-colors ${location.pathname === link.path ? 'text-primary-600' : 'text-slate-600 hover:text-primary-500'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/book" className="text-sm font-bold text-slate-600 hover:text-primary-500">
                        Patient Login
                    </Link>
                    <Link to="/dashboard" className="btn-primary py-2 px-6 rounded-full text-sm">
                        Doctor Login
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-50 p-6 flex flex-col gap-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold text-slate-900"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/book" onClick={() => setIsOpen(false)} className="btn-secondary text-center py-4 rounded-2xl">
                        Patient Login
                    </Link>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary text-center py-4 rounded-2xl">
                        Doctor Login
                    </Link>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
