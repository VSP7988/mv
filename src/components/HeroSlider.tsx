import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, Home } from 'lucide-react';
import { supabase, Banner } from '../lib/supabase';

interface HeroSliderProps {
  slides?: Banner[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides: propSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultSlides = [
    {
      id: '1',
      title: "Making a Difference Together",
      subtitle: "Join us in our mission to provide hope, care, and support to those who need it most in our community.",
      image_url: "https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=1920",
      position: 'left' as const,
      is_active: true,
      sort_order: 1,
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      title: "Children's Future, Our Priority",
      subtitle: "Providing safe homes, education, and love to children who need it most, building a brighter tomorrow.",
      image_url: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1920",
      position: 'center' as const,
      is_active: true,
      sort_order: 2,
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      title: "Caring for Our Elders",
      subtitle: "Providing dignity, comfort, and companionship to elderly community members in their golden years.",
      image_url: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=1920",
      position: 'right' as const,
      is_active: true,
      sort_order: 3,
      created_at: '',
      updated_at: ''
    }
  ];

  // Load banners from database
  useEffect(() => {
    if (!propSlides) {
      loadBanners();
    } else {
      setBanners(propSlides);
      setLoading(false);
    }
  }, [propSlides]);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Use database banners if available, otherwise use defaults
      setBanners(data && data.length > 0 ? data : defaultSlides);
    } catch (error) {
      console.error('Error loading banners:', error);
      // Fallback to default slides on error
      setBanners(defaultSlides);
    } finally {
      setLoading(false);
    }
  };

  // Filter only active slides
  const slides = banners.filter(slide => slide.is_active);

  useEffect(() => {
    if (slides.length === 0 || loading) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, loading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  // Don't render if no active slides
  if (slides.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to MV Charities</h1>
          <p className="text-xl">No banners configured. Please add banners in admin panel.</p>
        </div>
      </div>
    );
  }

  const getTextAlignment = (position: string) => {
    switch (position) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getContentAlignment = (position: string) => {
    switch (position) {
      case 'center': return 'items-center justify-center';
      case 'right': return 'items-end justify-end';
      default: return 'items-start justify-start';
    }
  };
  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => {
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out bg-black/40 ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image_url})` }}
            >
            </div>
            
            <div className={`relative z-10 h-full flex ${getContentAlignment(slide.position)} px-4 sm:px-6 lg:px-8`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={`max-w-full sm:max-w-3xl ${getTextAlignment(slide.position)} ${
                  slide.position === 'center' ? 'mx-auto' :
                  slide.position === 'right' ? 'ml-auto' :
                  'mr-auto'
                }`}>
                  {slide.title && (
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight animate-slide-up drop-shadow-lg">
                      {slide.title}
                    </h1>
                  )}
                  
                  {slide.subtitle && (
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 mb-4 sm:mb-6 md:mb-8 leading-relaxed animate-fade-in drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-secondary-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;