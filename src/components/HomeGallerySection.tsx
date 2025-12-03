import React, { useState } from 'react';
import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, HomeGallery } from '../lib/supabase';

const HomeGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [homeGalleryImages, setHomeGalleryImages] = useState<HomeGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeGalleryImages();
  }, []);

  const loadHomeGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('home_gallery')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading home gallery images:', error);
        return;
      }
      
      setHomeGalleryImages(data || []);
    } catch (error) {
      console.error('Error loading home gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultGalleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Community Support",
      description: "Supporting our community through various programs"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Education Programs",
      description: "Providing quality education and learning opportunities"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Elderly Care",
      description: "Caring for our elderly community members"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Medical Services",
      description: "Providing essential healthcare services"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Relief Operations",
      description: "Emergency relief and disaster response"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/5427660/pexels-photo-5427660.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Youth Programs",
      description: "Empowering youth through skill development"
    }
  ];

  // Use home gallery images if available, otherwise use default gallery images
  const displayImages = homeGalleryImages.length > 0 
    ? homeGalleryImages.map((img, index) => ({
        id: img.id,
        src: img.image_url,
        title: `Home Gallery Image ${index + 1}`,
        description: "Community programs and activities"
      }))
    : defaultGalleryImages;

  const openModal = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % displayImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(displayImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + displayImages.length) % displayImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(displayImages[prevIndex]);
  };

  return (
    <section className="py-16 relative">
      {/* Yellow Theme Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-secondary-100 to-secondary-200 opacity-60"></div>
      <div className="absolute inset-0 bg-yellow-gradient opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-secondary-600 to-secondary-800 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Capturing moments of hope, joy, and transformation in our community programs
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary-500"></div>
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-secondary-200"
                onClick={() => openModal(image, index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=600";
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {displayImages.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Images</h3>
            <p className="text-gray-600">Gallery images will appear here once uploaded through the admin panel.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[90vh]"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeGallerySection;