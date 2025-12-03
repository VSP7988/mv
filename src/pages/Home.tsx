import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import CausesSection from '../components/CausesSection';
import BoardStaffSection from '../components/BoardStaffSection';
import GallerySection from '../components/GallerySection';
import HomeGallerySection from '../components/HomeGallerySection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />

       {/* About Section with Green Theme */}
      <div className="bg-green-gradient">
        <AboutSection />
      </div>
      
      {/* Causes Section with Yellow Theme */}
      <div className="bg-yellow-gradient">
        <CausesSection />
      </div>
      
      {/* Board & Staff Section with Green Theme */}
      <div className="bg-green-gradient">
        <BoardStaffSection />
      </div>
      
      {/* Gallery Section with Yellow Theme */}
      <div className="bg-yellow-gradient">
        <HomeGallerySection />
      </div>
    </div>
  );
};

export default Home;