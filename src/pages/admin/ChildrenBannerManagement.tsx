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
  Users,
  GripVertical
} from 'lucide-react';
import { supabase, ChildrenBanner } from '../../lib/supabase';

const ChildrenBannerManagement = () => {
  const [banners, setBanners] = useState<ChildrenBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<ChildrenBanner | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    position: 'left' as 'left' | 'center' | 'right',
    is_active: true,
    sort_order: 0
  });

  const positions = [
    { value: 'left', label: 'Left Aligned' },
    { value: 'center', label: 'Center Aligned' },
    { value: 'right', label: 'Right Aligned' }
  ];

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('children_banners')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error loading children banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openModal = (banner?: ChildrenBanner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        image_url: banner.image_url,
        position: banner.position,
        is_active: banner.is_active,
        sort_order: banner.sort_order
      });
    } else {
      setEditingBanner(null);
      setFormData({
        image_url: '',
        position: 'left',
        is_active: true,
        sort_order: banners.length
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    setFormData({
      image_url: '',
      position: 'left',
      is_active: true,
      sort_order: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBanner) {
        // Update existing banner
        const { error } = await supabase
          .from('children_banners')
          .update(formData)
          .eq('id', editingBanner.id);

        if (error) throw error;
      } else {
        // Create new banner
        const { error } = await supabase
          .from('children_banners')
          .insert([formData]);

        if (error) throw error;
      }

      await loadBanners();
      closeModal();
    } catch (error) {
      console.error('Error saving children banner:', error);
      alert('Error saving banner. Please try again.');
    }
  };

  const toggleBannerStatus = async (banner: ChildrenBanner) => {
    try {
      const { error } = await supabase
        .from('children_banners')
        .update({ is_active: !banner.is_active })
        .eq('id', banner.id);

      if (error) throw error;
      await loadBanners();
    } catch (error) {
      console.error('Error toggling banner status:', error);
    }
  };

  const deleteBanner = async (banner: ChildrenBanner) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      const { error } = await supabase
        .from('children_banners')
        .delete()
        .eq('id', banner.id);

      if (error) throw error;
      await loadBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const getPositionLabel = (position: string) => {
    const pos = positions.find(p => p.value === position);
    return pos ? pos.label : position;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Children Home Banner Management</h1>
                <p className="text-sm text-gray-600">Manage children home page banners</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Banner</span>
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
        {/* Banners Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading banners...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={banner.image_url}
                    alt="Children banner"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=600";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
                      {getPositionLabel(banner.position)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                      #{banner.sort_order + 1}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Children Banner #{banner.sort_order + 1}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleBannerStatus(banner)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          banner.is_active 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={banner.is_active ? 'Active' : 'Inactive'}
                      >
                        {banner.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => openModal(banner)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteBanner(banner)}
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

        {banners.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Banners Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first children home banner.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Banner
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
                  {editingBanner ? 'Edit Banner' : 'Add New Banner'}
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
              {/* Position */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Text Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  {positions.map((position) => (
                    <option key={position.value} value={position.value}>
                      {position.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
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
                          <span className="font-semibold">Click to upload</span> or drag and drop
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
                                image_url: e.target?.result as string
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
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste image URL here"
                  />
                  
                  {formData.image_url && (
                    <div className="relative">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort Order
                </label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="0"
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
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingBanner ? 'Update Banner' : 'Create Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenBannerManagement;