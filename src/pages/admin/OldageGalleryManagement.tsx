import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload,
  Heart,
  X,
  GripVertical
} from 'lucide-react';
import { supabase, OldageGallery } from '../../lib/supabase';

const OldageGalleryManagement = () => {
  const [galleryImages, setGalleryImages] = useState<OldageGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('oldage_gallery')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | File[]) => {
    try {
      setUploading(true);
      const fileArray = Array.from(files);
      
      for (const file of fileArray) {
        if (file.type.startsWith('image/')) {
          // For now, we'll use FileReader to convert to base64
          // In a real implementation, you'd upload to a storage service
          const reader = new FileReader();
          reader.onload = async (e) => {
            const imageUrl = e.target?.result as string;
            
            const { error } = await supabase
              .from('oldage_gallery')
              .insert([{
                image_url: imageUrl,
                sort_order: galleryImages.length,
                is_active: true
              }]);

            if (error) {
              console.error('Error uploading image:', error);
              alert('Error uploading image. Please try again.');
            } else {
              await loadGalleryImages();
            }
          };
          reader.readAsDataURL(file);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const toggleImageStatus = async (image: OldageGallery) => {
    try {
      const { error } = await supabase
        .from('oldage_gallery')
        .update({ is_active: !image.is_active })
        .eq('id', image.id);

      if (error) throw error;
      await loadGalleryImages();
    } catch (error) {
      console.error('Error toggling image status:', error);
    }
  };

  const deleteImage = async (image: OldageGallery) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('oldage_gallery')
        .delete()
        .eq('id', image.id);

      if (error) throw error;
      await loadGalleryImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const updateSortOrder = async (imageId: string, newSortOrder: number) => {
    try {
      const { error } = await supabase
        .from('oldage_gallery')
        .update({ sort_order: newSortOrder })
        .eq('id', imageId);

      if (error) throw error;
      await loadGalleryImages();
    } catch (error) {
      console.error('Error updating sort order:', error);
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
                <h1 className="text-xl font-bold text-gray-900">Oldage Home Gallery Management</h1>
                <p className="text-sm text-gray-600">Manage oldage home gallery images</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              dragOver 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className={`w-12 h-12 mb-4 ${dragOver ? 'text-primary-500' : 'text-gray-400'}`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {uploading ? 'Uploading Images...' : 'Upload Oldage Home Gallery Images'}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop multiple images here, or click to select files
              </p>
              <label className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200">
                <span>Choose Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files);
                    }
                  }}
                  disabled={uploading}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supports: PNG, JPG, GIF, WebP (Max 10MB each)
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading gallery images...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative group">
                  <img
                    src={image.image_url}
                    alt={`Oldage home gallery image ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600";
                    }}
                  />
                  
                  {/* Overlay with controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleImageStatus(image)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          image.is_active 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-500 text-white hover:bg-gray-600'
                        }`}
                        title={image.is_active ? 'Active' : 'Inactive'}
                      >
                        {image.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => deleteImage(image)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      image.is_active 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {image.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Sort order indicator */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                      #{image.sort_order + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {galleryImages.length === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Oldage Home Gallery Images Yet</h3>
            <p className="text-gray-600 mb-6">Upload your first images to get started with the oldage home gallery.</p>
          </div>
        )}

        {/* Statistics */}
        {galleryImages.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{galleryImages.length}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {galleryImages.filter(img => img.is_active).length}
                </div>
                <div className="text-sm text-gray-600">Active Images</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <div className="text-2xl font-bold text-gray-600">
                  {galleryImages.filter(img => !img.is_active).length}
                </div>
                <div className="text-sm text-gray-600">Inactive Images</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
                <div className="text-2xl font-bold text-secondary-600">
                  {Math.round((galleryImages.filter(img => img.is_active).length / galleryImages.length) * 100) || 0}%
                </div>
                <div className="text-sm text-gray-600">Active Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OldageGalleryManagement;