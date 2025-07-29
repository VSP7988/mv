import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Award } from 'lucide-react';

const OurHistory = () => {
  const milestones = [
    {
      year: '2009',
      title: 'Foundation Year',
      description: 'MV Charities was established with a small team of 5 volunteers and a vision to serve the community.',
      location: 'Local Community Center',
      impact: '25 families served',
      icon: Users
    },
    {
      year: '2012',
      title: 'First Children\'s Home',
      description: 'Opened our first residential facility for orphaned and abandoned children.',
      location: 'MV Children\'s Home',
      impact: '30 children provided shelter',
      icon: Calendar
    },
    {
      year: '2015',
      title: 'Medical Program Launch',
      description: 'Established comprehensive healthcare services including mobile clinics and health camps.',
      location: 'Multiple Locations',
      impact: '1000+ medical consultations',
      icon: MapPin
    },
    {
      year: '2018',
      title: 'Elderly Care Center',
      description: 'Opened dedicated facility for elderly care with 24/7 medical support and recreational activities.',
      location: 'MV Elderly Care Center',
      impact: '50 elderly residents',
      icon: Award
    },
    {
      year: '2020',
      title: 'COVID-19 Response',
      description: 'Launched emergency relief programs during the pandemic, providing food and medical supplies.',
      location: 'Community-wide',
      impact: '2000+ families supported',
      icon: Users
    },
    {
      year: '2022',
      title: 'Education Initiative',
      description: 'Established scholarship programs and learning centers to support underprivileged students.',
      location: 'Local Schools',
      impact: '200+ students supported',
      icon: Calendar
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launched online platforms and digital programs to enhance service delivery and community engagement.',
      location: 'Online & Offline',
      impact: '500+ beneficiaries reached',
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Our History</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            A journey of compassion, growth, and unwavering commitment to serving our community
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to impacting hundreds of lives - see how we've grown over the years
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={milestone.year} className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Content Card */}
                    <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-primary-600">{milestone.year}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{milestone.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                            <span>{milestone.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-primary-600 font-semibold">
                            <Award className="h-4 w-4 mr-2" />
                            <span>{milestone.impact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Looking Forward Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Looking Forward</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              As we continue our journey, we remain committed to expanding our reach and deepening our impact. 
              Our vision for the future includes new programs, enhanced facilities, and innovative approaches 
              to community service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                Join Our Mission
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 border-2 border-primary-500 text-primary-600 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurHistory;