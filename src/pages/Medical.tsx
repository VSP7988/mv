import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Truck, Users, Clock, MapPin } from 'lucide-react';
import GallerySection from '../components/GallerySection';
import MedicalGallerySection from '../components/MedicalGallerySection';
import { supabase, MedicalContent } from '../lib/supabase';

const Medical = () => {
  const [medicalContent, setMedicalContent] = useState<MedicalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedicalContent();
  }, []);

  const loadMedicalContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medical_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading medical content:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setMedicalContent(data[0]);
      }
    } catch (error) {
      console.error('Error loading medical content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default services if no database content
  const services = [
    {
      icon: Stethoscope,
      title: 'General Healthcare',
      description: 'Comprehensive medical checkups, diagnosis, and treatment for common health conditions.'
    },
    {
      icon: Heart,
      title: 'Emergency Care',
      description: '24/7 emergency medical services for urgent health situations and critical care needs.'
    },
    {
      icon: Truck,
      title: 'Mobile Clinics',
      description: 'Healthcare services brought directly to remote communities and underserved areas.'
    },
    {
      icon: Users,
      title: 'Health Camps',
      description: 'Regular community health camps offering free medical checkups and health education.'
    },
    {
      icon: Clock,
      title: 'Preventive Care',
      description: 'Vaccination programs, health screenings, and preventive medicine initiatives.'
    },
    {
      icon: MapPin,
      title: 'Specialized Care',
      description: 'Access to specialist consultations and advanced medical treatments when needed.'
    }
  ];

  // Default statistics if no database content
  const statistics = [
    { number: '5,000+', label: 'Patients Treated' },
    { number: '24/7', label: 'Emergency Support' },
    { number: '12', label: 'Medical Professionals' },
    { number: '50+', label: 'Health Camps Conducted' }
  ];

  // Default health tips if no database content
  const healthTips = [
    {
      title: 'Regular Exercise',
      description: 'Engage in at least 30 minutes of physical activity daily to maintain good health.',
      icon: '🏃‍♂️'
    },
    {
      title: 'Balanced Diet',
      description: 'Eat a variety of fruits, vegetables, and whole grains for optimal nutrition.',
      icon: '🥗'
    },
    {
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to keep your body properly hydrated.',
      icon: '💧'
    },
    {
      title: 'Regular Checkups',
      description: 'Schedule regular medical checkups to catch health issues early.',
      icon: '🩺'
    }
  ];

  // Use database content or defaults
  const content = medicalContent || {
    banner_image_url: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Medical Services",
    description: "Providing accessible, quality healthcare services to ensure the wellbeing of our community members",
    services: services.map(service => ({
      icon: service.icon.name,
      title: service.title,
      description: service.description
    })),
    statistics: statistics,
    health_tips: healthTips
  };

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Stethoscope': Stethoscope,
      'Heart': Heart,
      'Truck': Truck,
      'Users': Users,
      'Clock': Clock,
      'MapPin': MapPin
    };
    return iconMap[iconName] || Stethoscope;
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
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
            </div>
          </div>
        </div>
      </section>

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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.description}
              </p>
             
            </div>
            <div className="relative">
              <img
                src={content.banner_image_url}
                alt="Medical services"
                className="rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Available</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services designed to address the diverse medical needs of our community
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


      {/* Health Tips Section */}
      {content.health_tips && content.health_tips.length > 0 && (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Health Tips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple yet effective tips to maintain good health and prevent common illnesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.health_tips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      )}

      {/* Gallery Section */}
      <div className="bg-yellow-gradient">
        <MedicalGallerySection />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Support Our Medical Mission</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Help us expand our medical services and reach more people in need. Your support enables us to 
              provide quality healthcare to those who cannot afford it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center"
              >
                Donate for Medical
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Medical;