import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, FileText, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';
import { createAppointment } from '../services/api';

const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        symptoms: '',
        doctor: '',
        date: '',
        time: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createAppointment(formData);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            }, 1500);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-2">
                            <div className="sticky top-28">
                                <h1 className="text-4xl font-bold mb-6 text-slate-900">Book Your <span className="text-primary-600">Appointment</span></h1>
                                <p className="text-slate-600 mb-8 text-lg">Quick, easy, and secure digital booking. Fill out the form and our team will confirm your slot instantly.</p>

                                <div className="space-y-6">
                                    {[
                                        { icon: User, text: "Patient Information", step: 1 },
                                        { icon: Stethoscope, text: "Medical Details", step: 2 },
                                        { icon: Calendar, text: "Schedule Slot", step: 3 }
                                    ].map((s, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= s.step ? 'bg-primary-600 border-primary-600 text-white' : 'border-slate-200 text-slate-400'
                                                }`}>
                                                {step > s.step ? <CheckCircle2 size={20} /> : s.step}
                                            </div>
                                            <span className={`font-medium ${step >= s.step ? 'text-slate-900' : 'text-slate-400'}`}>{s.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-white rounded-3xl border border-slate-100 shadow-soft">
                                    <div className="flex gap-4 items-center mb-4">
                                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 italic">"Over 5,000+ slots booked this month with ClinicFlow"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <motion.div
                                layout
                                className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-premium border border-white"
                            >
                                {!isSuccess ? (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <AnimatePresence mode="wait">
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                                            <div className="relative">
                                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Anjali Sharma" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-700 ml-1">Age</label>
                                                            <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 25" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                            <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="+91 98765-43210" />
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={() => setStep(2)} className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2">
                                                        Continue <ChevronRight size={20} />
                                                    </button>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Symptoms / Problem</label>
                                                        <div className="relative">
                                                            <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                                                            <textarea required name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none h-32" placeholder="Describe how you feel..." />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Select Doctor</label>
                                                        <select required name="doctor" value={formData.doctor} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none appearance-none">
                                                            <option value="">Choose a specialist...</option>
                                                            <option value="Dr. Sameer Verma">Dr. Sameer Verma (Cardiologist)</option>
                                                            <option value="Dr. Anjali Gupta">Dr. Anjali Gupta (General Physician)</option>
                                                            <option value="Dr. Vikram Malhotra">Dr. Vikram Malhotra (Pediatrician)</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button type="button" onClick={() => setStep(1)} className="w-1/3 btn-secondary py-4 rounded-2xl">Back</button>
                                                        <button type="button" onClick={() => setStep(3)} className="w-2/3 btn-primary py-4 rounded-2xl flex items-center justify-center gap-2">
                                                            Select Slot <ChevronRight size={20} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-700 ml-1">Date</label>
                                                            <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" min={new Date().toISOString().split('T')[0]} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-700 ml-1">Time Slot</label>
                                                            <select required name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none appearance-none">
                                                                <option value="">Select time...</option>
                                                                <option value="09:00 AM">09:00 AM</option>
                                                                <option value="10:30 AM">10:30 AM</option>
                                                                <option value="01:00 PM">01:00 PM</option>
                                                                <option value="04:30 PM">04:30 PM</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button type="button" onClick={() => setStep(2)} className="w-1/3 btn-secondary py-4 rounded-2xl">Back</button>
                                                        <button type="submit" disabled={isSubmitting} className="w-2/3 btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
                                                            {isSubmitting ? (
                                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            ) : 'Confirm Booking'}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h2>
                                        <p className="text-slate-600 mb-10 text-lg">Thank you, {formData.name}. Your appointment with {formData.doctor} is scheduled for {formData.date} at {formData.time}.</p>
                                        <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 mb-10 inline-block text-left w-full">
                                            <p className="text-primary-700 font-bold mb-1 uppercase text-xs">Note</p>
                                            <p className="text-primary-800 text-sm">Please arrive 10 minutes early. A confirmation SMS has been sent to {formData.phone}.</p>
                                        </div>
                                        <button onClick={() => window.location.href = '/'} className="btn-primary w-full py-4 rounded-2xl">Return Home</button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
