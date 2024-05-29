import React,{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const displayHeaderFooterURL = [
    '/', '/about', '/contact', '/blogs', '/login', '/signup',
    '/user/profile', '/user/appointment', '/user/bookAppointment',
];

export const useDisplay = () => {
    const [display, setDisplay] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (displayHeaderFooterURL.includes(location.pathname)) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }, [location]);
    
    return [display];
};





