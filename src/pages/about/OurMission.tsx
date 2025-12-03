import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Globe, Lightbulb, Shield, HandHeart } from 'lucide-react';

const OurMission = () => {
  const coreValues = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every individual with empathy, understanding, and genuine care for their wellbeing.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of community collaboration to create lasting positive change.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of transparency and accountability in all our operations.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'We look beyond immediate needs to create sustainable solutions for long-term impact.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'We welcome and serve all individuals regardless of background, beliefs, or circumstances.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously seek creative and effective solutions to address community challenges.',
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  const objectives = [
    {
      title: 'Child Welfare',
      description: 'Provide safe homes, quality education, and comprehensive care for orphaned and vulnerable children.',
      icon: Heart,
      goals: [
        'Maintain safe and nurturing residential facilities',
        'Ensure access to quality education and vocational training',
        'Provide psychological support and counseling services',
        'Facilitate family reunification when possible'
      ]
    },
    {
      title: 'Elder Care',
      description: 'Offer dignity, comfort, and medical support to elderly community members in their golden years.',
      icon: Users,
      goals: [
        'Provide 24/7 medical care and monitoring',
        'Organize recreational and social activities',
        'Maintain nutritious meal programs',
        'Offer family counseling and support services'
      ]
    },
    {
      title: 'Healthcare Access',
      description: 'Deliver essential medical services and health education to underserved populations.',
      icon: Shield,
      goals: [
        'Operate mobile medical clinics',
        'Conduct regular health screening camps',
        'Provide emergency medical assistance',
        'Promote preventive healthcare education'
      ]
    },
    {
      title: 'Emergency Relief',
      description: 'Respond rapidly to natural disasters and emergency situations affecting our community.',
      icon: HandHeart,
      goals: [
        'Maintain emergency response capabilities',
        'Provide immediate relief supplies',
        'Support community rebuilding efforts',
        'Coordinate with other relief organizations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Our Mission</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Dedicated to transforming lives through compassionate service and sustainable community development
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mr-6">
                  <Target className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Mission Statement</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide comprehensive care and support services to children, elderly, and vulnerable 
                community members through sustainable programs that promote health, education, and social 
                welfare while fostering community engagement and volunteerism.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to addressing not just the immediate needs of our beneficiaries, but also 
                the root causes of social challenges through innovative, evidence-based programs that create 
                lasting positive change in our communities.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Mission"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl mr-6">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Vision Statement</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To create a world where every individual, regardless of age or circumstance, has access to 
                basic necessities, dignity, and opportunities for growth. We envision communities where 
                compassion drives action and no one is left behind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our vision extends beyond service delivery to encompass community empowerment, social justice, 
                and the creation of sustainable systems that support human dignity and potential for all.
              </p>
            </div>
            <div className="lg:order-1 relative">
              <img
                src="https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Vision"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide every decision we make and every action we take
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objectives & Goals */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Strategic Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our focused approach to creating meaningful and sustainable change in key areas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl mr-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{objective.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{objective.description}</p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Goals:</h4>
                    <ul className="space-y-3">
                      {objective.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Be Part of Our Mission</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Every act of kindness, every donation, and every volunteer hour brings us closer to our vision. 
              Join us in creating a more compassionate and equitable world for all.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center"
              >
                Get Involved
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-600 transition-all duration-300 text-center"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurMission;