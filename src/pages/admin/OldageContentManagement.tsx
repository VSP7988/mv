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
  Minus
} from 'lucide-react';
import { supabase, OldageContent } from '../../lib/supabase';

const OldageContentManagement = () => {
  const [oldageContent, setOldageContent] = useState<OldageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<OldageContent | null>(null);
  const [formData, setFormData] = useState({
    about_image_url: '',
    about_title: 'Honoring Our Elders',
    about_description: '',
    statistics: [
      {
        number: '80+',
        label: 'Elderly Residents'
      }
    ],
    services: [
      {
        icon: 'Stethoscope',
        title: '24/7 Medical Care',
        description: 'Round-the-clock medical supervision with qualified healthcare professionals on-site.'
      }
    ],
    is_active: true
  });

  useEffect(() => {
    loadOldageContent();
  }, []);

  const loadOldageContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('oldage_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOldageContent(data || []);
    } catch (error) {
      console.error('Error loading oldage content:', error);
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

  const handleStatisticChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      statistics: prev.statistics.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addStatistic = () => {
    setFormData(prev => ({
      ...prev,
      statistics: [...prev.statistics, {
        number: '',
        label: ''
      }]
    }));
  };

  const removeStatistic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      statistics: prev.statistics.filter((_, i) => i !== index)
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, {
        icon: 'Heart',
        title: '',
        description: ''
      }]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const openModal = (content?: OldageContent) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        about_image_url: content.about_image_url,
        about_title: content.about_title,
        about_description: content.about_description,
        statistics: content.statistics || [],
        services: content.services || [],
        is_active: content.is_active
      });
    } else {
      setEditingContent(null);
      setFormData({
        about_image_url: '',
        about_title: 'Honoring Our Elders',
        about_description: '',
        statistics: [
          {
            number: '80+',
            label: 'Elderly Residents'
          }
        ],
        services: [
          {
            icon: 'Stethoscope',
            title: '24/7 Medical Care',
            description: 'Round-the-clock medical supervision with qualified healthcare professionals on-site.'
          }
        ],
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContent(null);
    setSaving(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (editingContent) {
        // Update existing content
        const { error } = await supabase
          .from('oldage_content')
          .update(formData)
          .eq('id', editingContent.id);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from('oldage_content')
          .insert([formData]);

        if (error) throw error;
      }

      await loadOldageContent();
      closeModal();
    } catch (error) {
      console.error('Error saving oldage content:', error);
      alert('Error saving oldage content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleContentStatus = async (content: OldageContent) => {
    try {
      const { error } = await supabase
        .from('oldage_content')
        .update({ is_active: !content.is_active })
        .eq('id', content.id);

      if (error) throw error;
      await loadOldageContent();
    } catch (error) {
      console.error('Error toggling content status:', error);
    }
  };

  const deleteContent = async (content: OldageContent) => {
    if (!window.confirm('Are you sure you want to delete this oldage content?')) return;

    try {
      const { error } = await supabase
        .from('oldage_content')
        .delete()
        .eq('id', content.id);

      if (error) throw error;
      await loadOldageContent();
    } catch (error) {
      console.error('Error deleting oldage content:', error);
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
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Oldage Home Content Management</h1>
                <p className="text-sm text-gray-600">Manage oldage home page content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Oldage Content</span>
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
        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading oldage content...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oldageContent.map((content) => (
              <div key={content.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={content.about_image_url}
                    alt={content.about_title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600";
                    }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{content.about_title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.about_description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleContentStatus(content)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          content.is_active 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={content.is_active ? 'Active' : 'Inactive'}
                      >
                        {content.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => openModal(content)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteContent(content)}
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

        {oldageContent.length === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Oldage Content Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first oldage content.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Oldage Content
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingContent ? 'Edit Oldage Content' : 'Add New Oldage Content'}
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
              {/* About Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Section Image *
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload image</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
                                about_image_url: e.target?.result as string
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
                    name="about_image_url"
                    value={formData.about_image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste image URL here"
                  />
                  
                  {formData.about_image_url && (
                    <div className="relative">
                      <img
                        src={formData.about_image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* About Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Title *
                </label>
                <input
                  type="text"
                  name="about_title"
                  value={formData.about_title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter about title"
                />
              </div>

              {/* About Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Description *
                </label>
                <textarea
                  name="about_description"
                  value={formData.about_description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Enter about description"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Statistics */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Statistics
                    </label>
                    <button
                      type="button"
                      onClick={addStatistic}
                      className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Statistic</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.statistics.map((stat, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Statistic {index + 1}</h4>
                          {formData.statistics.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStatistic(index)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => handleStatisticChange(index, 'number', e.target.value)}
                            placeholder="Number (e.g., 80+, 24/7)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatisticChange(index, 'label', e.target.value)}
                            placeholder="Label (e.g., Elderly Residents)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Services
                    </label>
                    <button
                      type="button"
                      onClick={addService}
                      className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Service</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.services.map((service, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Service {index + 1}</h4>
                          {formData.services.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(index)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                            placeholder="Service title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                            placeholder="Icon name (e.g., Stethoscope, Heart)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                            placeholder="Service description"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                  <span className="text-sm font-semibold text-gray-700">Active</span>
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
                  <span>{saving ? 'Saving...' : (editingContent ? 'Update Content' : 'Create Content')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OldageContentManagement;