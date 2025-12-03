import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  Upload,
  Heart,
  Image
} from 'lucide-react';
import { supabase, LogoSettings } from '../../lib/supabase';

const LogoManagement = () => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<LogoSettings | null>(null);
  const [formData, setFormData] = useState({
    logo_url: '',
    logo_name: 'MV CHARITIES',
    tagline: 'Making a Difference',
    is_active: true
  });

  useEffect(() => {
    loadLogoSettings();
  }, []);

  const loadLogoSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('logo_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLogoSettings(data || []);
    } catch (error) {
      console.error('Error loading logo settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openModal = (logo?: LogoSettings) => {
    if (logo) {
      setEditingLogo(logo);
      setFormData({
        logo_url: logo.logo_url,
        logo_name: logo.logo_name,
        tagline: logo.tagline,
        is_active: logo.is_active
      });
    } else {
      setEditingLogo(null);
      setFormData({
        logo_url: '',
        logo_name: 'MV CHARITIES',
        tagline: 'Making a Difference',
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLogo(null);
    setSaving(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (editingLogo) {
        // Update existing logo
        const { error } = await supabase
          .from('logo_settings')
          .update(formData)
          .eq('id', editingLogo.id);

        if (error) throw error;
      } else {
        // Create new logo
        const { error } = await supabase
          .from('logo_settings')
          .insert([formData]);

        if (error) throw error;
      }

      await loadLogoSettings();
      closeModal();
    } catch (error) {
      console.error('Error saving logo settings:', error);
      alert('Error saving logo settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleLogoStatus = async (logo: LogoSettings) => {
    try {
      // First, deactivate all other logos if activating this one
      if (!logo.is_active) {
        await supabase
          .from('logo_settings')
          .update({ is_active: false })
          .neq('id', logo.id);
      }

      const { error } = await supabase
        .from('logo_settings')
        .update({ is_active: !logo.is_active })
        .eq('id', logo.id);

      if (error) throw error;
      await loadLogoSettings();
    } catch (error) {
      console.error('Error toggling logo status:', error);
    }
  };

  const deleteLogo = async (logo: LogoSettings) => {
    if (!window.confirm('Are you sure you want to delete this logo?')) return;

    try {
      const { error } = await supabase
        .from('logo_settings')
        .delete()
        .eq('id', logo.id);

      if (error) throw error;
      await loadLogoSettings();
    } catch (error) {
      console.error('Error deleting logo:', error);
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
                <Image className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Logo Management</h1>
                <p className="text-sm text-gray-600">Manage organization logo and branding</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Logo</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/dashboard'}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo Settings Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading logo settings...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoSettings.map((logo) => (
              <div key={logo.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                    <img
                      src={logo.logo_url}
                      alt={logo.logo_name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ELogo%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  {logo.is_active && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{logo.logo_name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{logo.tagline}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleLogoStatus(logo)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          logo.is_active 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={logo.is_active ? 'Active' : 'Inactive'}
                      >
                        {logo.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => openModal(logo)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteLogo(logo)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {logoSettings.length === 0 && !loading && (
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Logo Settings Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your organization logo.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Logo
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingLogo ? 'Edit Logo Settings' : 'Add New Logo'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Logo Image *
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload logo</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setFormData(prev => ({
                                ...prev,
                                logo_url: e.target?.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">OR</div>
                  
                  <input
                    type="url"
                    name="logo_url"
                    value={formData.logo_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste logo URL here"
                  />
                  
                  {formData.logo_url && (
                    <div className="relative">
                      <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-4">
                        <img
                          src={formData.logo_url}
                          alt="Logo Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ELogo%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Organization Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="logo_name"
                  value={formData.logo_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter organization name"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter tagline (optional)"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Active (Note: Only one logo can be active at a time)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : (editingLogo ? 'Update Logo' : 'Create Logo')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoManagement;