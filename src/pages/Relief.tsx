import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, Truck, Home, Utensils, Shield, Users } from 'lucide-react';
import { supabase, ReliefContent } from '../lib/supabase';
import GallerySection from '../components/GallerySection';

const Relief = () => {
  const [reliefContent, setReliefContent] = useState<ReliefContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReliefContent();
  }, []);

  const loadReliefContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('relief_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading relief content:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setReliefContent(data[0]);
      }
    } catch (error) {
      console.error('Error loading relief content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default services if no database content
  const defaultServices = [
    {
      icon: Utensils,
      title: 'Food Distribution',
      description: 'Emergency food packages and regular meal programs for families facing food insecurity.'
    },
    {
      icon: Home,
      title: 'Shelter Assistance',
      description: 'Temporary housing and shelter support for displaced families and individuals.'
    },
    {
      icon: Shield,
      title: 'Disaster Response',
      description: 'Rapid response teams for natural disasters and emergency situations.'
    },
    {
      icon: Truck,
      title: 'Supply Distribution',
      description: 'Distribution of essential supplies including clothing, blankets, and hygiene items.'
    },
    {
      icon: HandHeart,
      title: 'Financial Aid',
      description: 'Emergency financial assistance for families facing economic hardship.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Coordinated community support programs and volunteer mobilization.'
    }
  ];

  // Default statistics if no database content
  const defaultStatistics = [
    { number: '5,000+', label: 'People Helped' },
    { number: '24/7', label: 'Emergency Support' },
    { number: '50+', label: 'Relief Operations' },
    { number: '100%', label: 'Community Coverage' }
  ];

  // Use database content or defaults
  const content = reliefContent || {
    banner_image_url: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Relief Programs",
    description: "Providing immediate assistance and long-term support to communities affected by disasters and emergencies",
    services: defaultServices.map(service => ({
      icon: service.icon.name,
      title: service.title,
      description: service.description
    })),
    statistics: defaultStatistics
  };

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Utensils': Utensils,
      'Home': Home,
      'Shield': Shield,
      'Truck': Truck,
      'HandHeart': HandHeart,
      'Users': Users
    };
    return iconMap[iconName] || HandHeart;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Banner Section */}
      <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.banner_image_url})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </section>

      {/* Statistics Section */}
      {content.statistics && content.statistics.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.description}
              </p>
             
            </div>
            <div className="relative">
              <img
                src={content.banner_image_url}
                alt="Relief operations"
                className="rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Response Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {content.services && content.services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Relief Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive emergency services designed to address immediate needs and support long-term recovery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.map((service, index) => {
                const Icon = getIconComponent(service.icon);
                return (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <div className="bg-yellow-gradient">
        <GallerySection />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Support Our Relief Efforts</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Help us be ready to respond when disasters strike. Your support enables us to maintain emergency 
              supplies, train volunteers, and provide immediate assistance to those in need.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center"
              >
                Donate for Relief Fund
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Relief;