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
  Minus,
  QrCode,
  CreditCard
} from 'lucide-react';
import { supabase, DonateContent } from '../../lib/supabase';

const DonateManagement = () => {
  const [donateContent, setDonateContent] = useState<DonateContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<DonateContent | null>(null);
  const [formData, setFormData] = useState({
    qr_codes: [
      {
        title: 'Mobile Payment',
        image_url: '',
        description: 'Scan to donate via mobile payment'
      }
    ],
    bank_accounts: [
      {
        bank_name: 'Example Bank',
        account_name: 'MV Charities',
        account_number: '1234567890',
        routing_number: '123456789',
        swift_code: 'EXAMPLESWIFT',
        branch: 'Main Branch'
      }
    ],
    is_active: true
  });

  useEffect(() => {
    loadDonateContent();
  }, []);

  const loadDonateContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donate_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonateContent(data || []);
    } catch (error) {
      console.error('Error loading donate content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQrCodeChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      qr_codes: prev.qr_codes.map((qr, i) => 
        i === index ? { ...qr, [field]: value } : qr
      )
    }));
  };

  const handleBankAccountChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      bank_accounts: prev.bank_accounts.map((bank, i) => 
        i === index ? { ...bank, [field]: value } : bank
      )
    }));
  };

  const addQrCode = () => {
    setFormData(prev => ({
      ...prev,
      qr_codes: [...prev.qr_codes, {
        title: '',
        image_url: '',
        description: ''
      }]
    }));
  };

  const removeQrCode = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qr_codes: prev.qr_codes.filter((_, i) => i !== index)
    }));
  };

  const addBankAccount = () => {
    setFormData(prev => ({
      ...prev,
      bank_accounts: [...prev.bank_accounts, {
        bank_name: '',
        account_name: '',
        account_number: '',
        routing_number: '',
        swift_code: '',
        branch: ''
      }]
    }));
  };

  const removeBankAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bank_accounts: prev.bank_accounts.filter((_, i) => i !== index)
    }));
  };

  const openModal = (content?: DonateContent) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        qr_codes: content.qr_codes || [],
        bank_accounts: content.bank_accounts || [],
        is_active: content.is_active
      });
    } else {
      setEditingContent(null);
      setFormData({
        qr_codes: [
          {
            title: 'Mobile Payment',
            image_url: '',
            description: 'Scan to donate via mobile payment'
          }
        ],
        bank_accounts: [
          {
            bank_name: 'Example Bank',
            account_name: 'MV Charities',
            account_number: '1234567890',
            routing_number: '123456789',
            swift_code: 'EXAMPLESWIFT',
            branch: 'Main Branch'
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
          .from('donate_content')
          .update(formData)
          .eq('id', editingContent.id);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from('donate_content')
          .insert([formData]);

        if (error) throw error;
      }

      await loadDonateContent();
      closeModal();
    } catch (error) {
      console.error('Error saving donate content:', error);
      alert('Error saving donate content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleContentStatus = async (content: DonateContent) => {
    try {
      const { error } = await supabase
        .from('donate_content')
        .update({ is_active: !content.is_active })
        .eq('id', content.id);

      if (error) throw error;
      await loadDonateContent();
    } catch (error) {
      console.error('Error toggling content status:', error);
    }
  };

  const deleteContent = async (content: DonateContent) => {
    if (!window.confirm('Are you sure you want to delete this donate content?')) return;

    try {
      const { error } = await supabase
        .from('donate_content')
        .delete()
        .eq('id', content.id);

      if (error) throw error;
      await loadDonateContent();
    } catch (error) {
      console.error('Error deleting donate content:', error);
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
                <h1 className="text-xl font-bold text-gray-900">Donate Page Management</h1>
                <p className="text-sm text-gray-600">Manage QR codes and bank account details</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Donate Content</span>
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
            <span className="ml-2 text-gray-600">Loading donate content...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {donateContent.map((content) => (
              <div key={content.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Donate Content</h3>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* QR Codes Preview */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <QrCode className="h-5 w-5 mr-2 text-primary-600" />
                      QR Codes ({content.qr_codes.length})
                    </h4>
                    <div className="space-y-2">
                      {content.qr_codes.slice(0, 3).map((qr, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <QrCode className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700">{qr.title}</span>
                        </div>
                      ))}
                      {content.qr_codes.length > 3 && (
                        <div className="text-sm text-gray-500">+{content.qr_codes.length - 3} more</div>
                      )}
                    </div>
                  </div>

                  {/* Bank Accounts Preview */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-secondary-600" />
                      Bank Accounts ({content.bank_accounts.length})
                    </h4>
                    <div className="space-y-2">
                      {content.bank_accounts.slice(0, 3).map((bank, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700">{bank.bank_name}</span>
                        </div>
                      ))}
                      {content.bank_accounts.length > 3 && (
                        <div className="text-sm text-gray-500">+{content.bank_accounts.length - 3} more</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {donateContent.length === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donate Content Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first donate content.</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add Your First Donate Content
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
                  {editingContent ? 'Edit Donate Content' : 'Add New Donate Content'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* QR Codes Management */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-lg font-semibold text-gray-700">
                      QR Codes
                    </label>
                    <button
                      type="button"
                      onClick={addQrCode}
                      className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add QR Code</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.qr_codes.map((qr, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            <QrCode className="h-4 w-4 mr-2" />
                            QR Code {index + 1}
                          </h4>
                          {formData.qr_codes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeQrCode(index)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={qr.title}
                            onChange={(e) => handleQrCodeChange(index, 'title', e.target.value)}
                            placeholder="QR Code title (e.g., Mobile Payment)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                  <Upload className="w-6 h-6 mb-2 text-gray-500" />
                                  <p className="text-xs text-gray-500">Upload QR Code</p>
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
                                        handleQrCodeChange(index, 'image_url', e.target?.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            
                            <input
                              type="url"
                              value={qr.image_url}
                              onChange={(e) => handleQrCodeChange(index, 'image_url', e.target.value)}
                              placeholder="Or paste QR code image URL"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            
                            {qr.image_url && (
                              <img
                                src={qr.image_url}
                                alt="QR Code Preview"
                                className="w-20 h-20 object-cover rounded border border-gray-200"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200";
                                }}
                              />
                            )}
                          </div>
                          
                          <input
                            type="text"
                            value={qr.description || ''}
                            onChange={(e) => handleQrCodeChange(index, 'description', e.target.value)}
                            placeholder="Description (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Accounts Management */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-lg font-semibold text-gray-700">
                      Bank Accounts
                    </label>
                    <button
                      type="button"
                      onClick={addBankAccount}
                      className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Bank Account</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.bank_accounts.map((bank, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Bank Account {index + 1}
                          </h4>
                          {formData.bank_accounts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBankAccount(index)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <input
                            type="text"
                            value={bank.bank_name}
                            onChange={(e) => handleBankAccountChange(index, 'bank_name', e.target.value)}
                            placeholder="Bank Name *"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="text"
                            value={bank.account_name}
                            onChange={(e) => handleBankAccountChange(index, 'account_name', e.target.value)}
                            placeholder="Account Name *"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="text"
                            value={bank.account_number}
                            onChange={(e) => handleBankAccountChange(index, 'account_number', e.target.value)}
                            placeholder="Account Number *"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="text"
                            value={bank.routing_number || ''}
                            onChange={(e) => handleBankAccountChange(index, 'routing_number', e.target.value)}
                            placeholder="Routing Number"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={bank.swift_code || ''}
                            onChange={(e) => handleBankAccountChange(index, 'swift_code', e.target.value)}
                            placeholder="SWIFT Code"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={bank.branch || ''}
                            onChange={(e) => handleBankAccountChange(index, 'branch', e.target.value)}
                            placeholder="Branch"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
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

export default DonateManagement;