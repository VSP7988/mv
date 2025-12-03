import React from 'react';
import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { supabase, AboutContent } from '../lib/supabase';

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading about content:', error);
        setError(error.message);
        return;
      }
      
      if (data && data.length > 0) {
        setAboutContent(data[0]);
        console.log('About content loaded:', data[0]);
      } else {
        console.log('No about content found, using defaults');
      }
    } catch (error) {
      console.error('Error loading about content:', error);
      setError('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  // Default content if no database content is available
  const defaultContent = {
    image_url: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
    years_of_service: 15,
    about_title: "About MV Charities",
    about_text: "Maranatha Vimukthi Charities has been dedicated to serving our community for over 15 years. We believe in the power of compassion and collective action to transform lives and build stronger communities. Our comprehensive approach addresses multiple aspects of community welfare, from providing safe homes for children and elderly care to medical assistance and disaster relief. Every program we run is designed to create lasting, positive change.",
    lives_impacted: 500,
    active_volunteers: 50,
    our_vision: "To create a world where every individual, regardless of age or circumstance, has access to basic necessities, dignity, and opportunities for growth. We envision communities where compassion drives action and no one is left behind.",
    our_mission: "To provide comprehensive care and support services to children, elderly, and vulnerable community members through sustainable programs that promote health, education, and social welfare while fostering community engagement and volunteerism."
  };

  const content = aboutContent || defaultContent;

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 opacity-60"></div>
        <div className="absolute inset-0 bg-green-gradient opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading about content...</span>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.warn('About section error, using default content:', error);
  }
  return (
    <section className="py-16 relative">
      {/* Green Theme Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 opacity-60"></div>
      <div className="absolute inset-0 bg-green-gradient opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src={content.image_url}
              alt={content.about_title}
              className="rounded-2xl shadow-2xl border-4 border-white/50"
              onError={(e) => {
                e.currentTarget.src = "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800";
              }}
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">{content.years_of_service}+</div>
                <div className="text-sm">Years of Service</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{content.about_title}</span>
            </h2>
            <div className="text-lg text-gray-700 mb-8 leading-relaxed">
              {content.about_text}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary-200">
                <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600">{content.lives_impacted}+</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary-200">
                <Heart className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600">{content.active_volunteers}+</div>
                <div className="text-sm text-gray-600">Active Volunteers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-primary-200">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4 shadow-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {content.our_vision}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-primary-200">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {content.our_mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;