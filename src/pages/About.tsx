import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Eye, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Lives Impacted' },
    { icon: Heart, value: '50+', label: 'Active Volunteers' },
    { icon: Award, value: '15+', label: 'Years of Service' },
    { icon: Clock, value: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every individual with empathy, understanding, and genuine care for their wellbeing.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of community collaboration to create lasting positive change.'
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'We maintain the highest standards of transparency and accountability in all our operations.'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'We look beyond immediate needs to create sustainable solutions for long-term impact.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">About MV Charities</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            For over 15 years, Maranatha Vimukthi Charities has been a beacon of hope, 
            providing comprehensive care and support to those who need it most.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009, Maranatha Vimukthi Charities began with a simple yet powerful vision: 
                  to create a world where every individual has access to basic necessities, dignity, and 
                  opportunities for growth, regardless of their circumstances.
                </p>
                <p>
                  What started as a small community initiative has grown into a comprehensive organization 
                  serving hundreds of beneficiaries across multiple programs. Our founders recognized that 
                  sustainable change requires a holistic approach addressing not just immediate needs, but 
                  the root causes of social challenges.
                </p>
                <p>
                  Today, we operate children's homes, elderly care facilities, medical programs, and emergency 
                  relief services. Each program is designed with the core belief that every person deserves 
                  respect, care, and the opportunity to thrive within a supportive community.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">2009</div>
                  <div className="text-sm">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide comprehensive care and support services to children, elderly, and vulnerable 
                community members through sustainable programs that promote health, education, and social 
                welfare while fostering community engagement and volunteerism.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl mr-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create a world where every individual, regardless of age or circumstance, has access to 
                basic necessities, dignity, and opportunities for growth. We envision communities where 
                compassion drives action and no one is left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide every decision we make and every action we take
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;