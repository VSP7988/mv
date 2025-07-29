import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, GraduationCap, Home, Users, Stethoscope, Gamepad2 } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import ChildrenGallerySection from '../components/ChildrenGallerySection';
import { supabase, ChildrenBanner, ChildrenContent } from '../lib/supabase';

const ChildrenHome = () => {
  const [childrenBanners, setChildrenBanners] = useState<ChildrenBanner[]>([]);
  const [childrenContent, setChildrenContent] = useState<ChildrenContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildrenBanners();
    loadChildrenContent();
  }, []);

  const loadChildrenBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('children_banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading children banners:', error);
        return;
      }
      
      setChildrenBanners(data || []);
    } catch (error) {
      console.error('Error loading children banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChildrenContent = async () => {
    try {
      const { data, error } = await supabase
        .from('children_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading children content:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setChildrenContent(data[0]);
      }
    } catch (error) {
      console.error('Error loading children content:', error);
    }
  };

  const heroSlides = [
    {
      id: 1,
      title: "A Safe Haven for Every Child",
      description: "Providing love, care, and opportunities for orphaned and vulnerable children to thrive and reach their full potential in a nurturing family environment.",
      image: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 2,
      title: "Education Opens Doors",
      description: "Every child deserves access to quality education. We provide schooling, tutoring, and educational resources to build brighter futures.",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      id: 3,
      title: "Growing Together as Family",
      description: "Our children's home creates a warm, supportive family environment where every child feels loved, valued, and empowered to dream big.",
      image: "https://images.pexels.com/photos/5427660/pexels-photo-5427660.jpeg?auto=compress&cs=tinysrgb&w=1920",
    }
  ];

  const services = [
    {
      icon: Home,
      title: 'Safe Housing',
      description: 'Comfortable and secure residential facilities with 24/7 care and supervision.'
    },
    {
      icon: GraduationCap,
      title: 'Quality Education',
      description: 'Access to quality schooling, tutoring, and educational resources for all children.'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare',
      description: 'Regular medical checkups, vaccinations, and immediate healthcare when needed.'
    },
    {
      icon: Heart,
      title: 'Emotional Support',
      description: 'Counseling services and emotional support to help children heal and thrive.'
    },
    {
      icon: Gamepad2,
      title: 'Recreation',
      description: 'Sports, games, and recreational activities for healthy physical and social development.'
    },
    {
      icon: Users,
      title: 'Life Skills',
      description: 'Training in essential life skills to prepare children for independent living.'
    }
  ];

  const statistics = [
    { number: '150+', label: 'Children Cared For' },
    { number: '95%', label: 'School Attendance Rate' },
    { number: '24/7', label: 'Care Available' },
    { number: '12', label: 'Dedicated Staff Members' }
  ];

  // Use database content or defaults
  const content = childrenContent || {
    about_image_url: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800",
    about_title: "A Home Away From Home",
    about_description: "Our children's home provides a nurturing environment where every child feels loved, safe, and valued. We believe that every child deserves the opportunity to grow up in a supportive family-like setting with access to education, healthcare, and emotional support. Our dedicated staff members work around the clock to ensure each child receives personalized care and attention. We focus on building strong relationships, fostering independence, and preparing our children for successful futures.",
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
      'Home': Home,
      'GraduationCap': GraduationCap,
      'Stethoscope': Stethoscope,
      'Heart': Heart,
      'Gamepad2': Gamepad2,
      'Users': Users
    };
    return iconMap[iconName] || Home;
  };

  // Use database banners if available, otherwise use default slides
  const displaySlides = childrenBanners.length > 0 
    ? childrenBanners.map(banner => ({
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
                  e.currentTarget.src = "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Happy Kids</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive care and support services designed to nurture every aspect of a child's development
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
        <ChildrenGallerySection />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Help Us Give Children a Brighter Future</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Your support can make a real difference in a child's life. Whether through donations, volunteering, 
              or sponsorship, you can help us provide the love and care every child deserves.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center"
              >
                Sponsor a Child
              </Link>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildrenHome;