import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import HeaderTop from './HeaderTop';
import { supabase, LogoSettings } from '../lib/supabase';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [logoSettings, setLogoSettings] = useState<LogoSettings | null>(null);
  const [loadingLogo, setLoadingLogo] = useState(true);

  useEffect(() => {
    loadLogoSettings();
  }, []);

  const loadLogoSettings = async () => {
    try {
      setLoadingLogo(true);
      const { data, error } = await supabase
        .from('logo_settings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading logo settings:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setLogoSettings(data[0]);
      }
    } catch (error) {
      console.error('Error loading logo settings:', error);
    } finally {
      setLoadingLogo(false);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Children Home', href: '/children-home' },
    { name: 'Oldage Home', href: '/oldage-home' },
    { name: 'Medical', href: '/medical' },
    { name: 'Relief', href: '/relief' },
    { name: 'Projects', href: '/projects' },
    { name: 'Certifications', href: '/certifications' },
  ];

  return (
    <>
      {/* Header Top Section */}
      <HeaderTop />
      
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              {logoSettings && logoSettings.logo_url ? (
                <img
                  src={logoSettings.logo_url}
                  alt={logoSettings.logo_name}
                  className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to default heart icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : (
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              )}
              {/* Hidden fallback for when logo fails to load */}
              <div className="hidden">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-1 justify-center">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    to={item.href}
                    className={`px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                      location.pathname === item.href
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t animate-slide-up">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/donate"
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Donate Now
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;