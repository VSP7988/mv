import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Heart, Users, Award, Clock } from 'lucide-react';

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Chairman & CEO",
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dr. Sarah Johnson has over 20 years of experience in social work and community development. She founded MV Charities with a vision to create sustainable change in underserved communities.",
      email: "sarah.johnson@mvcharities.org",
      phone: "+1 234 567 8901",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      specialties: ["Community Development", "Strategic Planning", "Social Work"],
      achievements: ["Founded 3 successful NGOs", "PhD in Social Work", "Community Leadership Award 2023"]
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Director of Operations",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Michael oversees all operational aspects of our programs, ensuring efficient delivery of services to beneficiaries. His background in logistics and project management drives our operational excellence.",
      email: "michael.chen@mvcharities.org",
      phone: "+1 234 567 8902",
      linkedin: "https://linkedin.com/in/michaelchen",
      specialties: ["Operations Management", "Project Coordination", "Logistics"],
      achievements: ["15+ years in non-profit sector", "MBA in Operations", "Efficiency Excellence Award"]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      position: "Medical Director",
      image: "https://images.pexels.com/photos/4173244/pexels-photo-4173244.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dr. Rodriguez leads our medical programs and ensures quality healthcare delivery to our beneficiaries. She specializes in community health and preventive medicine.",
      email: "emily.rodriguez@mvcharities.org",
      phone: "+1 234 567 8903",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      specialties: ["Community Health", "Preventive Medicine", "Healthcare Management"],
      achievements: ["MD in Community Medicine", "10+ years in public health", "Healthcare Innovation Award"]
    },
    {
      id: 4,
      name: "James Wilson",
      position: "Finance Director",
      image: "https://images.pexels.com/photos/4173242/pexels-photo-4173242.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "James ensures transparent financial management and sustainable funding for our programs. His expertise in non-profit finance helps maximize the impact of every donation.",
      email: "james.wilson@mvcharities.org",
      phone: "+1 234 567 8904",
      linkedin: "https://linkedin.com/in/jameswilson",
      specialties: ["Non-profit Finance", "Grant Writing", "Financial Planning"],
      achievements: ["CPA Certification", "Secured $2M+ in grants", "Financial Transparency Award"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Programs Director",
      image: "https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Lisa develops and oversees all our community programs, from children's education to elderly care. Her passion for social justice drives innovative program design.",
      email: "lisa.thompson@mvcharities.org",
      phone: "+1 234 567 8905",
      linkedin: "https://linkedin.com/in/lisathompson",
      specialties: ["Program Development", "Social Justice", "Community Engagement"],
      achievements: ["MSW in Social Work", "Program Excellence Award", "Community Impact Recognition"]
    },
    {
      id: 6,
      name: "David Kim",
      position: "Volunteer Coordinator",
      image: "https://images.pexels.com/photos/4173248/pexels-photo-4173248.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "David manages our volunteer programs and community partnerships. He believes in the power of collective action and works to engage community members in our mission.",
      email: "david.kim@mvcharities.org",
      phone: "+1 234 567 8906",
      linkedin: "https://linkedin.com/in/davidkim",
      specialties: ["Volunteer Management", "Community Partnerships", "Event Coordination"],
      achievements: ["Managed 500+ volunteers", "Community Engagement Expert", "Volunteer Leadership Award"]
    }
  ];

  const stats = [
    { icon: Users, value: '6', label: 'Core Team Members' },
    { icon: Heart, value: '50+', label: 'Active Volunteers' },
    { icon: Award, value: '100+', label: 'Years Combined Experience' },
    { icon: Clock, value: '24/7', label: 'Dedicated Service' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Our Team</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Meet the passionate individuals who dedicate their lives to making a difference in our community
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

      {/* Team Members Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings together diverse expertise and unwavering commitment to our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-secondary-300 font-semibold">{member.position}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{member.bio}</p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're always looking for passionate individuals who want to make a difference. 
              Whether you're interested in full-time positions or volunteer opportunities, 
              there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                View Open Positions
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 border-2 border-primary-500 text-primary-600 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 text-center"
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;