import { useEffect, useState } from 'react'

export const useHeight = () => {
    const [scrollTop, setScrollTop] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setScrollTop(true);
        }
        else if (scrolled <= 300) {
            setScrollTop(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible); // Clean up the event listener when the component unmounts
        };
    }, []);
    return ([scrollTop]);
}
