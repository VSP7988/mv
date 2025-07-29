import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const HeaderTop = () => {
  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/mvcharities',
      target: '_blank',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/vimukthicharities/',
      target: '_blank',
      label: 'Instagram'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-3 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Side - Organization Name */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-white">MARANATHA </span>
              <span className="text-secondary-400">VIMUKTHI</span>
              <span className="text-white"> CHARITIES</span>
            </h1>
          </div>

          {/* Right Side - Social Links and Donate Button */}
          <div className="flex items-center space-x-6">
            {/* Social Media Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className="text-gray-300 text-sm font-medium hidden lg:inline">Follow Us:</span>
              <div className="flex items-center space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target={social.target}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Donate Button */}
            <a
              href="/donate"
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
            >
              DONATE NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;