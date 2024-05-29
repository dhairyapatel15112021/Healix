import React from 'react';
import './ScrollToTop.scss';
import { useHeight } from '../../Hooks/useHeight';
export const ScrollToTop = () => {
    const [scrollTop] = useHeight();
    const scrollToTopFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  /* we can also use 'auto' behaviour in place of 'smooth' */
        });
    };
    return (
        <>
            {
                scrollTop ?
                    <button className='scrollToTopButton' onClick={scrollToTopFunction}>
                        <i className="fa-solid fa-arrow-up scrollToTopIcon"></i>
                    </button>
                    : ""
            }
        </>

    )
}
