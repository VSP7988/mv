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
  Award,
  FileText,
  ExternalLink
} from 'lucide-react';
import { supabase, Certification } from '../../lib/supabase';

const CertificationsManagement = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    certificate_name: '',
    image_url: '',
    pdf_url: '',
    is_active: true,
    sort_order: 0
  });

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error('Error loading certifications:', error);
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

  const openModal = (certification?: Certification) => {
    if (certification) {
      setEditingCertification(certification);
      setFormData({
        certificate_name: certification.certificate_name,
        image_url: certification.image_url,
        pdf_url: certification.pdf_url || '',
        is_active: certification.is_active,
        sort_order: certification.sort_order
      });
    } else {
      setEditingCertification(null);
      setFormData({
        certificate_name: '',
        image_url: '',
        pdf_url: '',
        is_active: true,
        sort_order: certifications.length
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCertification(null);
    setFormData({
      certificate_name: '',
      image_url: '',
      pdf_url: '',
      is_active: true,
      sort_order: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        pdf_url: formData.pdf_url || null // Convert empty string to null for optional field
      };

      if (editingCertification) {
        // Update existing certification
        const { error } = await supabase
          .from('certifications')
          .update(submitData)
          .eq('id', editingCertification.id);

        if (error) throw error;
      } else {
        // Create new certification
        const { error } = await supabase
          .from('certifications')
          .insert([submitData]);

        if (error) throw error;
      }

      await loadCertifications();
      closeModal();
    } catch (error) {
      console.error('Error saving certification:', error);
      alert('Error saving certification. Please try again.');
    }
  };

  const toggleCertificationStatus = async (certification: Certification) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .update({ is_active: !certification.is_active })
        .eq('id', certification.id);

      if (error) throw error;
      await loadCertifications();
    } catch (error) {
      console.error('Error toggling certification status:', error);
    }
  };

  const deleteCertification = async (certification: Certification) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;

    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', certification.id);

      if (error) throw error;
      await loadCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'image_url' | 'pdf_url') => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll use a placeholder URL
      // In a real implementation, you'd upload to a storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
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
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Certifications Management</h1>
                <p className="text-sm text-gray-600">Manage your organization's certifications</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Certification</span>
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
        {/* Certifications Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading certifications...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification) => (
              <div key={certification.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={certification.image_url}
                    alt={certification.certificate_name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600";
                    }}
                  />
                  {certification.pdf_url && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        PDF
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{certification.certificate_name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleCertificationStatus(certification)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          certification.is_active 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={certification.is_active ? 'Active' : 'Inactive'}
                      >
                        {certification.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => openModal(certification)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteCertification(certification)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {certification.pdf_url && (
                      <button
                        onClick={() => window.open(certification.pdf_url, '_blank')}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {certifications.length === 0 && !loading && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certifications Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first certification.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Certification
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
                  {editingCertification ? 'Edit Certification' : 'Add New Certification'}
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
              {/* Certificate Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  name="certificate_name"
                  value={formData.certificate_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter certificate name"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Certificate Image *
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
                        onChange={(e) => handleFileUpload(e, 'image_url')}
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
                          e.currentTarget.src = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Upload (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PDF Document (Optional)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-3 pb-3">
                        <FileText className="w-6 h-6 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload PDF</span>
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, 'pdf_url')}
                      />
                    </label>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">OR</div>
                  
                  <input
                    type="url"
                    name="pdf_url"
                    value={formData.pdf_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste PDF URL here (optional)"
                  />
                  
                  {formData.pdf_url && (
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-blue-800">PDF document attached</span>
                      <button
                        type="button"
                        onClick={() => window.open(formData.pdf_url, '_blank')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
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
                  <span>{editingCertification ? 'Update Certification' : 'Create Certification'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsManagement;