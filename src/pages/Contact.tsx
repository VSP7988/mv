import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Heart } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Address',
      details: ['123 Charity Street', 'Community District', 'City, State 12345'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+1 (234) 567-8900', '+1 (234) 567-8901', 'Emergency: +1 (234) 567-8902'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['info@mvcharities.org', 'support@mvcharities.org', 'emergency@mvcharities.org'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Emergency Only'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const departments = [
    {
      name: 'General Inquiries',
      email: 'info@mvcharities.org',
      phone: '+1 (234) 567-8900',
      description: 'General questions about our services and programs'
    },
    {
      name: 'Volunteer Coordination',
      email: 'volunteers@mvcharities.org',
      phone: '+1 (234) 567-8901',
      description: 'Information about volunteer opportunities'
    },
    {
      name: 'Donations & Fundraising',
      email: 'donations@mvcharities.org',
      phone: '+1 (234) 567-8902',
      description: 'Questions about donations and fundraising events'
    },
    {
      name: 'Emergency Services',
      email: 'emergency@mvcharities.org',
      phone: '+1 (234) 567-8903',
      description: 'Urgent assistance and emergency support'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'donation', label: 'Donations & Fundraising' },
    { value: 'services', label: 'Our Services' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'emergency', label: 'Emergency Assistance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            We're here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${info.color} rounded-full mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl mr-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Find Us Here</h3>
                    <p className="text-gray-600">Interactive map coming soon</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Our Office</h4>
                  <p className="text-gray-600 mb-4">
                    We welcome visitors during our office hours. Please call ahead to schedule an appointment 
                    for specific services or consultations.
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">We're Here to Help</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl">
                    <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary-600">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl">
                    <Heart className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-secondary-600">100%</div>
                    <div className="text-sm text-gray-600">Commitment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect directly with the right department for faster assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary-500 mr-3" />
                    <a href={`mailto:${dept.email}`} className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary-500 mr-3" />
                    <a href={`tel:${dept.phone}`} className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      {dept.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Emergency Contact</h2>
            <p className="text-xl mb-8 leading-relaxed">
              If you're facing an emergency situation and need immediate assistance, 
              please don't hesitate to contact our emergency response team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="tel:+1234567890"
                className="px-8 py-3 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Emergency Hotline: +1 234 567 890
              </a>
              <a
                href="mailto:emergency@mvcharities.org"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
              >
                Emergency Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;