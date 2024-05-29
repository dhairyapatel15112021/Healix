import React from 'react';
import './Home.scss';
import { HeroPage } from './HeroPage';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
export const Home = () => {

  return (
    <div>
      <HeroPage/>
      <ScrollToTop/>
    </div>
  )
}