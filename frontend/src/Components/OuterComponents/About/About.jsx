import React from 'react';
import './About.scss';
export const About = () => {
    return (
        <div className='about'>
            <div className='introduction'>
                Welcome to Healix, your gateway to effortless healthcare. We are dedicated to revolutionizing the 
                way patients and doctors connect in the healthcare ecosystem.
            </div>
            <div className='card'>
                <div className='ourStory'>
                    <div className='firstLine'></div>
                    <p>Our Story</p>
                    <div className='storyContent'>Founded in 2023, Healix began with a simple idea: to make 
                    healthcare more accessible and convenient for everyone. Since then, we have grown into a 
                    trusted platform used by thousands of patients and doctors worldwide.</div>
                </div>
                <div className='ourValues'>
                    <div className='secondLine'></div>
                    <p>Our Values</p>
                    <div className='valueContent'>We believe in empowering patients and doctors with the tools 
                    and knowledge they need to make informed healthcare decisions.We are committed to making 
                    healthcare accessible to all, regardless of location or background.</div>
                </div>
                <div className='ourMission'>
                    <div className='thirdLine'></div>
                    <p>Our Mission</p>
                    <div className='missionContent'>At Healix, our mission is to provide a seamless and 
                    comprehensive healthcare solution for patients and doctors alike. We aim to simplify the 
                    healthcare experience and empower individuals to take control of their well-being.</div>
                </div>
                <div className='ourVision'>
                    <div className='fourthLine'></div>
                    <p>Our Vision</p>
                    <div className='visionContent'>
                        Our vision is to create a future where accessing quality healthcare is as simple as a tap 
                        of a button. We envision a world where every individual has the tools and resources they 
                        need to live healthier, happier lives.
                    </div>
                </div>
            </div>
        </div>
    )
}
