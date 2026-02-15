const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Indian Mock Data
const patients = [
    { id: 1, name: 'Arjun Mehta', age: 45, phone: '+91 98765-43210', condition: 'Hypertension', risk: 'Medium', lastVisit: '2024-02-10', nextFollowUp: '2024-02-25' },
    { id: 2, name: 'Priya Sharma', age: 32, phone: '+91 88765-98765', condition: 'Diabetes Type 2', risk: 'High', lastVisit: '2024-01-15', nextFollowUp: '2024-02-16' },
    { id: 3, name: 'Rajesh Kumar', age: 58, phone: '+91 77654-34567', condition: 'Arthritis', risk: 'Low', lastVisit: '2024-02-05', nextFollowUp: '2024-03-05' },
];

const appointments = [
    { id: 101, patientId: 1, doctor: 'Dr. Sameer Verma', time: '10:00 AM', date: '2024-02-16', status: 'Upcoming' },
    { id: 102, patientId: 2, doctor: 'Dr. Anjali Gupta', time: '11:30 AM', date: '2024-02-16', status: 'Upcoming' },
    { id: 103, patientId: 3, doctor: 'Dr. Sameer Verma', time: '02:00 PM', date: '2024-02-17', status: 'Missed' },
];

// Routes
app.get('/api/stats', (req, res) => {
    res.json({
        totalPatients: 1450,
        todayAppointments: 24,
        followUpsDue: 15,
        missedAppointments: 3,
        appointmentData: [
            { day: 'Mon', count: 18 },
            { day: 'Tue', count: 25 },
            { day: 'Wed', count: 20 },
            { day: 'Thu', count: 32 },
            { day: 'Fri', count: 45 },
            { day: 'Sat', count: 15 },
            { day: 'Sun', count: 8 },
        ],
        followUpStatus: [
            { name: 'Completed', value: 70, color: '#10B981' },
            { name: 'Pending', value: 20, color: '#F59E0B' },
            { name: 'Missed', value: 10, color: '#EF4444' },
        ],
        patientVisits: [
            { month: 'Jan', visits: 520 },
            { month: 'Feb', visits: 480 },
            { month: 'Mar', visits: 650 },
            { month: 'Apr', visits: 590 },
            { month: 'May', visits: 720 },
            { month: 'Jun', visits: 680 },
        ]
    });
});

app.get('/api/patients', (req, res) => {
    res.json(patients);
});

app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
    const newAppointment = { id: Date.now(), ...req.body, status: 'Upcoming' };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

app.listen(PORT, () => {
    console.log(`ClinicFlow Backend (Indian Context) running on port ${PORT}`);
});
