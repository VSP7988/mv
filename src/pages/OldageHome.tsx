import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Users, Home, Activity, Clock } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import OldageGallerySection from '../components/OldageGallerySection';
import { supabase, OldageBanner, OldageContent } from '../lib/supabase';

const OldageHome = () => {
  const [oldageBanners, setOldageBanners] = useState<OldageBanner[]>([]);
  const [oldageContent, setOldageContent] = useState<OldageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOldageBanners();
    loadOldageContent();
  }, []);

  const loadOldageBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('oldage_banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading oldage banners:', error);
        return;
      }
      
      setOldageBanners(data || []);
    } catch (error) {
      console.error('Error loading oldage banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOldageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('oldage_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading oldage content:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setOldageContent(data[0]);
      }
    } catch (error) {
      console.error('Error loading oldage content:', error);
    }
  };

  const heroSlides = [
    {
      id: 1,
      title: "",
      description: "",
      image: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 2,
      title: "",
      description: "",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 3,
      title: "",
      description: "",
      image: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=1920",
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: '24/7 Medical Care',
      description: 'Round-the-clock medical supervision with qualified healthcare professionals on-site.'
    },
    {
      icon: Home,
      title: 'Comfortable Living',
      description: 'Well-furnished rooms with modern amenities ensuring comfort and dignity.'
    },
    {
      icon: Heart,
      title: 'Emotional Support',
      description: 'Counseling services and emotional care to maintain mental wellbeing.'
    },
    {
      icon: Activity,
      title: 'Recreation Activities',
      description: 'Engaging activities, games, and social programs to keep residents active and happy.'
    },
    {
      icon: Users,
      title: 'Family Environment',
      description: 'Creating a warm, family-like atmosphere where everyone feels at home.'
    },
    {
      icon: Clock,
      title: 'Personalized Care',
      description: 'Individual care plans tailored to each resident\'s specific needs and preferences.'
    }
  ];

  const statistics = [
    { number: '80+', label: 'Elderly Residents' },
    { number: '24/7', label: 'Medical Support' },
    { number: '15', label: 'Dedicated Staff' },
    { number: '100%', label: 'Satisfaction Rate' }
  ];

  // Use database content or defaults
  const content = oldageContent || {
    about_image_url: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800",
    about_title: "Honoring Our Elders",
    about_description: "Our elderly care home is more than just a residence – it's a community where seniors are treated with the respect, dignity, and love they deserve. We understand that aging is a natural part of life, and we're committed to making these golden years as comfortable and fulfilling as possible. With state-of-the-art facilities, experienced healthcare professionals, and a warm, family-like atmosphere, we provide comprehensive care that addresses not just physical needs, but emotional and social wellbeing as well.",
    statistics: statistics,
    services: services.map(service => ({
      icon: service.icon.name,
      title: service.title,
      description: service.description
    }))
  };

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Stethoscope': Stethoscope,
      'Home': Home,
      'Heart': Heart,
      'Activity': Activity,
      'Users': Users,
      'Clock': Clock
    };
    return iconMap[iconName] || Heart;
  };

  // Use database banners if available, otherwise use default slides
  const displaySlides = oldageBanners.length > 0 
    ? oldageBanners.map(banner => ({
        id: banner.id,
        title: "",
        description: "",
        image_url: banner.image_url,
        position: banner.position,
        is_active: banner.is_active,
        sort_order: banner.sort_order,
        created_at: banner.created_at,
        updated_at: banner.updated_at
      }))
    : heroSlides;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Slider Section */}
      <HeroSlider slides={displaySlides} />

      {/* Statistics Section */}
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

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.about_title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.about_description}
              </p>
              
            </div>
            <div className="relative">
              <img
                src={content.about_image_url}
                alt={content.about_title}
                className="rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive care services designed to ensure the health, happiness, and dignity of our residents
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


      {/* Gallery Section */}
      <div className="bg-yellow-gradient">
        <OldageGallerySection />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Give Your Loved Ones the Care They Deserve</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Our elderly care home provides a safe, comfortable, and loving environment where your family members 
              can enjoy their golden years with dignity and joy. Contact us to learn more about our services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center"
              >
                Sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OldageHome;