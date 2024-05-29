import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useUser = () => {
    const [user, setUser] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("user")) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, [location]);
    
    return [user];
}
