import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, Stethoscope, GraduationCap, HandHeart, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, Cause } from '../lib/supabase';

const CausesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerView, setItemsPerView] = useState(4);

  const defaultCauses = [
    {
      id: '1',
      title: "Children's Education",
      description: "Supporting underprivileged children with quality education, school supplies, and learning resources.",
      image: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: GraduationCap,
      category: "Education",
      is_active: true,
      sort_order: 1,
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      title: "Elderly Care Program",
      description: "Providing comprehensive care, medical support, and companionship for elderly community members.",
      image: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Heart,
      category: "Elder Care",
      is_active: true,
      sort_order: 2,
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      title: "Medical Aid Fund",
      description: "Emergency medical assistance and healthcare services for families who cannot afford treatment.",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Stethoscope,
      category: "Healthcare",
      is_active: true,
      sort_order: 3,
      created_at: '',
      updated_at: ''
    },
    {
      id: '4',
      title: "Safe Housing Initiative",
      description: "Building and maintaining safe, comfortable homes for children and families in need.",
      image: "https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Home,
      category: "Housing",
      is_active: true,
      sort_order: 4,
      created_at: '',
      updated_at: ''
    },
    {
      id: '5',
      title: "Food Security Program",
      description: "Regular food distribution and nutrition programs for vulnerable families and individuals.",
      image: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Utensils,
      category: "Nutrition",
      is_active: true,
      sort_order: 5,
      created_at: '',
      updated_at: ''
    },
    {
      id: '6',
      title: "Emergency Relief Fund",
      description: "Rapid response support for natural disasters and emergency situations affecting our community.",
      image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=600",
      image_url: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: HandHeart,
      category: "Relief",
      is_active: true,
      sort_order: 6,
      created_at: '',
      updated_at: ''
    }
  ];

  useEffect(() => {
    loadCauses();
    
    // Set items per view based on screen size
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (window.innerWidth < 768) {
        setItemsPerView(2); // Small tablet: 2 items
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet: 3 items
      } else {
        setItemsPerView(4); // Desktop: 4 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const loadCauses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('causes')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading causes:', error);
        setError(error.message);
        return;
      }
      
      if (data && data.length > 0) {
        setCauses(data);
        console.log('Causes loaded from database:', data.length);
      } else {
        setCauses(defaultCauses);
        console.log('No causes found, using defaults');
      }
    } catch (error) {
      console.error('Error loading causes:', error);
      setError('Failed to load causes');
      setCauses(defaultCauses);
    } finally {
      setLoading(false);
    }
  };

  // Use database causes if available, otherwise use defaults
  const displayCauses = causes.length > 0 ? causes : defaultCauses;

  const maxIndex = Math.max(0, displayCauses.length - itemsPerView);

  const nextCauses = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevCauses = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 relative">
      {/* Yellow Theme Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-secondary-100 to-secondary-200 opacity-60"></div>
      <div className="absolute inset-0 bg-yellow-gradient opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-secondary-600 to-secondary-800 bg-clip-text text-transparent">Causes</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every donation makes a real difference in someone's life. Choose a cause that resonates with your heart
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary-500"></div>
            <span className="ml-2 text-gray-600">Loading causes...</span>
          </div>
        ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {displayCauses.length > itemsPerView && (
            <>
              <button
                onClick={prevCauses}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-secondary-200"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-secondary-600" />
              </button>

              <button
                onClick={nextCauses}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-secondary-200"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-secondary-600" />
              </button>
            </>
          )}

          {/* Causes Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {displayCauses.map((cause) => {
                return (
                  <div
                    key={cause.id}
                    className={`flex-shrink-0 ${
                      itemsPerView === 1 ? 'w-full' :
                      itemsPerView === 2 ? 'w-1/2' :
                      itemsPerView === 3 ? 'w-1/3' :
                      'w-1/4'
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-secondary-200">
                      <div className="relative overflow-hidden">
                        <img
                          src={cause.image_url || cause.image}
                          alt={cause.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600";
                          }}
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">
                          {cause.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                          {cause.description}
                        </p>

                        <button className="w-full px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                          <Link to="/donate" className="block w-full h-full">
                            Donate Now
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default CausesSection;