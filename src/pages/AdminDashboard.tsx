import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Heart, 
  Stethoscope, 
  HandHeart, 
  FolderOpen, 
  Award, 
  LogOut,
  Settings,
  BarChart3,
  Edit,
  Plus,
  Eye,
  Images,
  Image,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardOptions = [];

  const handleLogout = () => {
    // Handle logout logic here
    if (window.confirm('Are you sure you want to logout?')) {
      // Redirect to login or home page
      window.location.href = '/admin';
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Navigate to specific management pages
    if (sectionId === 'home') {
      window.location.href = '/admin/home-management';
    } else {
      console.log(`Managing section: ${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">MV Charities Management</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h2>
          <p className="text-gray-600">Manage your website content and monitor your organization's digital presence</p>
        </div>

        {/* Management Options */}
        <div className="mb-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Management Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Home Page Management */}
                <div 
                  onClick={() => window.location.href = '/admin/home-management'}
                  className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-primary-200 hover:border-primary-300"
                >
                  <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Home Page Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage hero banners, about section, and causes displayed on the homepage
                  </p>
                </div>

                {/* Home Gallery Management */}
                <div 
                  onClick={() => window.location.href = '/admin/home-gallery-management'}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300"
                >
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Home Gallery Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage home page gallery images with drag & drop upload
                  </p>
                </div>

                {/* Projects Management */}
                <div 
                  onClick={() => window.location.href = '/admin/projects-management'}
                  className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-secondary-200 hover:border-secondary-300"
                >
                  <div className="p-4 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FolderOpen className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Projects Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage your organization's projects with categories, status, and descriptions
                  </p>
                </div>

                {/* Certifications Management */}
                <div 
                  onClick={() => window.location.href = '/admin/certifications-management'}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-purple-200 hover:border-purple-300"
                >
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Certifications Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage your organization's certifications and official documents
                  </p>
                </div>

                {/* Relief Gallery Management */}
                <div 
                  onClick={() => window.location.href = '/admin/relief-gallery-management'}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300"
                >
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Images className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Relief Gallery Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage relief program gallery images with drag & drop upload
                  </p>
                </div>

                {/* Medical Gallery Management */}
                <div 
                  onClick={() => window.location.href = '/admin/medical-gallery-management'}
                  className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-red-200 hover:border-red-300"
                >
                  <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Medical Gallery Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage medical program gallery images with drag & drop upload
                  </p>
                </div>

                {/* Oldage Home Gallery Management */}
                <div 
                  onClick={() => window.location.href = '/admin/oldage-gallery-management'}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-orange-200 hover:border-orange-300"
                >
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Oldage Home Gallery Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage oldage home gallery images with drag & drop upload
                  </p>
                </div>

                {/* Oldage Home Banner Management */}
                <div 
                  onClick={() => window.location.href = '/admin/oldage-banner-management'}
                  className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-pink-200 hover:border-pink-300"
                >
                  <div className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Oldage Home Banner Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage oldage home page banners with titles and positioning
                  </p>
                </div>

                {/* Oldage Home Content Management */}
                <div 
                  onClick={() => window.location.href = '/admin/oldage-content-management'}
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-indigo-200 hover:border-indigo-300"
                >
                  <div className="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Oldage Home Content Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage oldage home statistics, about content, and services
                  </p>
                </div>

                {/* Children Home Content Management */}
                <div 
                  onClick={() => window.location.href = '/admin/children-content-management'}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300"
                >
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Children Home Content Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage children home statistics, about content, and services
                  </p>
                </div>

                {/* Children Home Banner Management */}
                <div 
                  onClick={() => window.location.href = '/admin/children-banner-management'}
                  className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-cyan-200 hover:border-cyan-300"
                >
                  <div className="p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Children Home Banner Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage children home page banners with positioning
                  </p>
                </div>

                {/* Children Home Gallery Management */}
                <div 
                  onClick={() => window.location.href = '/admin/children-gallery-management'}
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-300"
                >
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Children Home Gallery Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage children home gallery images with drag & drop upload
                  </p>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Medical Management */}
                <div 
                  onClick={() => window.location.href = '/admin/medical-management'}
                  className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-teal-200 hover:border-teal-300"
                >
                  <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Medical Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage medical services content, statistics, and health tips
                  </p>
                </div>

                {/* Relief Management */}
                <div 
                  onClick={() => window.location.href = '/admin/relief-management'}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-green-200 hover:border-green-300"
                >
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <HandHeart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Relief Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage relief programs content, services, and statistics
                  </p>
                </div>

                {/* Donate Management */}
                <div 
                  onClick={() => window.location.href = '/admin/donate-management'}
                  className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-rose-200 hover:border-rose-300"
                >
                  <div className="p-4 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Donate Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage QR codes and bank account details for donations
                  </p>
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Logo Management */}
                <div 
                  onClick={() => window.location.href = '/admin/logo-management'}
                  className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-violet-200 hover:border-violet-300"
                >
                  <div className="p-4 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Image className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Logo Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage organization logo and branding for header and footer
                  </p>
                </div>

                {/* Board & Staff Management */}
                <div 
                  onClick={() => window.location.href = '/admin/board-staff-management'}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
                >
                  <div className="p-4 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Board & Staff Management</h4>
                  <p className="text-gray-600 text-sm">
                    Manage board members and staff with photos and designations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;