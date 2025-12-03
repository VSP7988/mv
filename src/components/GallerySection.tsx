import React, { useState } from 'react';
import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { supabase, ReliefGallery } from '../lib/supabase';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reliefGalleryImages, setReliefGalleryImages] = useState<ReliefGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReliefGalleryImages();
  }, []);

  const loadReliefGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('relief_gallery')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading relief gallery images:', error);
        return;
      }
      
      setReliefGalleryImages(data || []);
    } catch (error) {
      console.error('Error loading relief gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Children's Education Program",
      description: "Students participating in our literacy and numeracy enhancement program",
      date: "2024-01-15",
      location: "MV Learning Center",
      category: "Education"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Community Health Camp",
      description: "Free medical checkups and health awareness session for local families",
      date: "2024-01-20",
      location: "Community Hall",
      category: "Healthcare"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Senior Citizens Day",
      description: "Celebrating our elders with entertainment and care activities",
      date: "2024-01-25",
      location: "MV Elderly Care Center",
      category: "Elder Care"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Food Distribution Drive",
      description: "Monthly food package distribution to families in need",
      date: "2024-02-01",
      location: "Various Locations",
      category: "Relief"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Medical Outreach Program",
      description: "Mobile clinic providing healthcare services to remote areas",
      date: "2024-02-05",
      location: "Rural Community",
      category: "Healthcare"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/5427660/pexels-photo-5427660.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Youth Skills Workshop",
      description: "Vocational training and skill development for young adults",
      date: "2024-02-10",
      location: "Training Center",
      category: "Training"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "School Supply Distribution",
      description: "Providing educational materials to underprivileged students",
      date: "2024-02-12",
      location: "Local Schools",
      category: "Education"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Emergency Relief Response",
      description: "Providing immediate assistance during natural disaster recovery",
      date: "2024-02-15",
      location: "Disaster Area",
      category: "Relief"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Community Clean-up Day",
      description: "Environmental awareness and community beautification initiative",
      date: "2024-02-18",
      location: "City Park",
      category: "Environment"
    }
  ];

  // Use relief gallery images if available, otherwise use default gallery images
  const displayImages = reliefGalleryImages.length > 0 
    ? reliefGalleryImages.map((img, index) => ({
        id: img.id,
        src: img.image_url,
        title: `Relief Gallery Image ${index + 1}`,
        description: "Relief program activities and community support",
        date: new Date(img.created_at).toLocaleDateString(),
        location: "Relief Operations",
        category: "Relief"
      }))
    : galleryImages;

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 relative">
      {/* Yellow Theme Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-secondary-100 to-secondary-200 opacity-60"></div>
      <div className="absolute inset-0 bg-yellow-gradient opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                    e.currentTarget.src = "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=600";
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
            <div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
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

export default GallerySection;