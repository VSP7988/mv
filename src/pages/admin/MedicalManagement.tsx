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
  Stethoscope,
  Minus
} from 'lucide-react';
import { supabase, MedicalContent } from '../../lib/supabase';

const MedicalManagement = () => {
  const [medicalContent, setMedicalContent] = useState<MedicalContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<MedicalContent | null>(null);
  const [formData, setFormData] = useState({
    banner_image_url: '',
    title: 'Medical Services',
    description: 'Providing accessible, quality healthcare services to ensure the wellbeing of our community members',
    services: [
      {
        icon: 'Stethoscope',
        title: 'General Healthcare',
        description: 'Comprehensive medical checkups, diagnosis, and treatment for common health conditions.'
      }
    ],
    statistics: [
      {
        number: '5,000+',
        label: 'Patients Treated'
      }
    ],
    health_tips: [
      {
        title: 'Regular Exercise',
        description: 'Engage in at least 30 minutes of physical activity daily to maintain good health.',
        icon: '🏃‍♂️'
      }
    ],
    is_active: true
  });

  useEffect(() => {
    loadMedicalContent();
  }, []);

  const loadMedicalContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medical_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedicalContent(data || []);
    } catch (error) {
      console.error('Error loading medical content:', error);
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

  const handleServiceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
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

  const handleHealthTipChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      health_tips: prev.health_tips.map((tip, i) => 
        i === index ? { ...tip, [field]: value } : tip
      )
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, {
        icon: 'Stethoscope',
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

  const addHealthTip = () => {
    setFormData(prev => ({
      ...prev,
      health_tips: [...prev.health_tips, {
        title: '',
        description: '',
        icon: '🩺'
      }]
    }));
  };

  const removeHealthTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      health_tips: prev.health_tips.filter((_, i) => i !== index)
    }));
  };

  const openModal = (content?: MedicalContent) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        banner_image_url: content.banner_image_url,
        title: content.title,
        description: content.description,
        services: content.services || [],
        statistics: content.statistics || [],
        health_tips: content.health_tips || [],
        is_active: content.is_active
      });
    } else {
      setEditingContent(null);
      setFormData({
        banner_image_url: '',
        title: 'Medical Services',
        description: 'Providing accessible, quality healthcare services to ensure the wellbeing of our community members',
        services: [
          {
            icon: 'Stethoscope',
            title: 'General Healthcare',
            description: 'Comprehensive medical checkups, diagnosis, and treatment for common health conditions.'
          }
        ],
        statistics: [
          {
            number: '5,000+',
            label: 'Patients Treated'
          }
        ],
        health_tips: [
          {
            title: 'Regular Exercise',
            description: 'Engage in at least 30 minutes of physical activity daily to maintain good health.',
            icon: '🏃‍♂️'
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
          .from('medical_content')
          .update(formData)
          .eq('id', editingContent.id);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from('medical_content')
          .insert([formData]);

        if (error) throw error;
      }

      await loadMedicalContent();
      closeModal();
    } catch (error) {
      console.error('Error saving medical content:', error);
      alert('Error saving medical content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleContentStatus = async (content: MedicalContent) => {
    try {
      const { error } = await supabase
        .from('medical_content')
        .update({ is_active: !content.is_active })
        .eq('id', content.id);

      if (error) throw error;
      await loadMedicalContent();
    } catch (error) {
      console.error('Error toggling content status:', error);
    }
  };

  const deleteContent = async (content: MedicalContent) => {
    if (!window.confirm('Are you sure you want to delete this medical content?')) return;

    try {
      const { error } = await supabase
        .from('medical_content')
        .delete()
        .eq('id', content.id);

      if (error) throw error;
      await loadMedicalContent();
    } catch (error) {
      console.error('Error deleting medical content:', error);
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
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medical Management</h1>
                <p className="text-sm text-gray-600">Manage medical services content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Medical Content</span>
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
            <span className="ml-2 text-gray-600">Loading medical content...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalContent.map((content) => (
              <div key={content.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={content.banner_image_url}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600";
                    }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.description}</p>
                  
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

        {medicalContent.length === 0 && !loading && (
          <div className="text-center py-12">
            <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Medical Content Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first medical content.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Medical Content
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
                  {editingContent ? 'Edit Medical Content' : 'Add New Medical Content'}
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
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banner Image *
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload banner</span> or drag and drop
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
                                banner_image_url: e.target?.result as string
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
                    name="banner_image_url"
                    value={formData.banner_image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste image URL here"
                  />
                  
                  {formData.banner_image_url && (
                    <div className="relative">
                      <img
                        src={formData.banner_image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        
                        <div className="grid grid-cols-1 gap-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                            placeholder="Service title"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                            placeholder="Icon name (e.g., Stethoscope)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                            placeholder="Service description"
                            rows={2}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                            placeholder="Number (e.g., 5,000+, 24/7)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatisticChange(index, 'label', e.target.value)}
                            placeholder="Label (e.g., Patients Treated)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Health Tips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Health Tips
                  </label>
                  <button
                    type="button"
                    onClick={addHealthTip}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Health Tip</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.health_tips.map((tip, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Health Tip {index + 1}</h4>
                        {formData.health_tips.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHealthTip(index)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={tip.title}
                          onChange={(e) => handleHealthTipChange(index, 'title', e.target.value)}
                          placeholder="Health tip title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={tip.icon}
                          onChange={(e) => handleHealthTipChange(index, 'icon', e.target.value)}
                          placeholder="Icon/Emoji (e.g., 🏃‍♂️)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={tip.description}
                          onChange={(e) => handleHealthTipChange(index, 'description', e.target.value)}
                          placeholder="Health tip description"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                        />
                      </div>
                    </div>
                  ))}
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

export default MedicalManagement;