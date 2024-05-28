import React from 'react';
import '../styles/globals.css';  // Asegúrate de que la ruta sea correcta
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import SchedulePost from '../components/SchedulePost';
import RegisterUser from '../components/RegisterUser';

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
            <RegisterUser />
            <SchedulePost />
        </div>
    );
};

export default Home;