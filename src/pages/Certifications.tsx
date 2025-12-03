import React from 'react';
import { useState, useEffect } from 'react';
import { ExternalLink, Award, FileText, Shield } from 'lucide-react';
import { supabase, Certification } from '../lib/supabase';

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading certifications:', error);
        return;
      }
      
      setCertifications(data || []);
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCertificateClick = (pdfUrl?: string) => {
    if (pdfUrl) {
      // Check if it's a base64 data URI
      if (pdfUrl.startsWith('data:application/pdf;base64,')) {
        try {
          // Extract base64 string
          const base64String = pdfUrl.split(',')[1];

          // Convert base64 to binary
          const binaryString = window.atob(base64String);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          // Create blob and object URL
          const blob = new Blob([bytes], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(blob);

          // Open in new window
          const newWindow = window.open(objectUrl, '_blank', 'noopener,noreferrer');

          // Clean up object URL after a delay
          if (newWindow) {
            setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
          }
        } catch (error) {
          console.error('Error opening PDF:', error);
          alert('Unable to open PDF. Please try again.');
        }
      } else {
        // Handle regular URLs
        try {
          const url = new URL(pdfUrl);
          window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
          // If it's not a valid URL, try to open it directly
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Banner Section */}
      <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-2 text-gray-600">Loading certifications...</span>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certifications Available</h3>
              <p className="text-gray-600">Certifications will appear here once they are added through the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                    cert.pdf_url ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.certificate_name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600";
                      }}
                    />
                    {cert.pdf_url && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div 
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCertificateClick(cert.pdf_url);
                          }}
                        >
                          <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <ExternalLink className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div 
                          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCertificateClick(cert.pdf_url);
                          }}
                        >
                          <div className="flex items-center text-white font-semibold">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>View Certificate</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {cert.certificate_name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      {cert.pdf_url ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCertificateClick(cert.pdf_url);
                          }}
                          className="flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors duration-200"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          <span>View Certificate</span>
                        </button>
                      ) : (
                        <div className="flex items-center text-gray-500 text-sm">
                          <Award className="h-4 w-4 mr-2" />
                          <span>Certificate Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Certifications;