import {useEffect,useState} from 'react'

export const useWidth = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Initialize state
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 600); // Function to update the state based on the window width
    useEffect(() => { // Add an event listener to update the state when the window is resized
        window.addEventListener('resize', updateIsMobile);
        return () => {
            window.removeEventListener('resize', updateIsMobile); // Clean up the event listener when the component unmounts
        };
    }, []);
  return [isMobile];
}
