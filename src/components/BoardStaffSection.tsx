import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, BoardStaff } from '../lib/supabase';

const BoardStaffSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardStaffMembers, setBoardStaffMembers] = useState<BoardStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    loadBoardStaffMembers();
    
    // Set items per view based on screen size
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (window.innerWidth < 768) {
        setItemsPerView(2); // Small tablet: 2 items
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet: 3 items
      } else {
        setItemsPerView(4); // Desktop: 4 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const loadBoardStaffMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('board_staff')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading board staff members:', error);
        return;
      }
      
      setBoardStaffMembers(data || []);
    } catch (error) {
      console.error('Error loading board staff members:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultBoardMembers = [
    {
      id: '1',
      name: "Dr. Sarah Johnson",
      designation: "Chairman & CEO",
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dr. Sarah Johnson has over 20 years of experience in social work and community development. She founded MV Charities with a vision to create sustainable change in underserved communities.",
      email: "sarah.johnson@mvcharities.org",
      phone: "+1 234 567 8901",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      expertise: ["Community Development", "Strategic Planning", "Social Work"],
      achievements: ["Founded 3 successful NGOs", "PhD in Social Work", "Community Leadership Award 2023"],
      is_active: true,
      sort_order: 1,
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      name: "Michael Chen",
      designation: "Director of Operations",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Michael oversees all operational aspects of our programs, ensuring efficient delivery of services to beneficiaries. His background in logistics and project management drives our operational excellence.",
      email: "michael.chen@mvcharities.org",
      phone: "+1 234 567 8902",
      linkedin: "https://linkedin.com/in/michaelchen",
      expertise: ["Operations Management", "Project Coordination", "Logistics"],
      achievements: ["15+ years in non-profit sector", "MBA in Operations", "Efficiency Excellence Award"],
      is_active: true,
      sort_order: 2,
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      name: "Dr. Emily Rodriguez",
      designation: "Medical Director",
      image: "https://images.pexels.com/photos/4173244/pexels-photo-4173244.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173244/pexels-photo-4173244.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dr. Rodriguez leads our medical programs and ensures quality healthcare delivery to our beneficiaries. She specializes in community health and preventive medicine.",
      email: "emily.rodriguez@mvcharities.org",
      phone: "+1 234 567 8903",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      expertise: ["Community Health", "Preventive Medicine", "Healthcare Management"],
      achievements: ["MD in Community Medicine", "10+ years in public health", "Healthcare Innovation Award"],
      is_active: true,
      sort_order: 3,
      created_at: '',
      updated_at: ''
    },
    {
      id: '4',
      name: "James Wilson",
      designation: "Finance Director",
      image: "https://images.pexels.com/photos/4173242/pexels-photo-4173242.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173242/pexels-photo-4173242.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "James ensures transparent financial management and sustainable funding for our programs. His expertise in non-profit finance helps maximize the impact of every donation.",
      email: "james.wilson@mvcharities.org",
      phone: "+1 234 567 8904",
      linkedin: "https://linkedin.com/in/jameswilson",
      expertise: ["Non-profit Finance", "Grant Writing", "Financial Planning"],
      achievements: ["CPA Certification", "Secured $2M+ in grants", "Financial Transparency Award"],
      is_active: true,
      sort_order: 4,
      created_at: '',
      updated_at: ''
    },
    {
      id: '5',
      name: "Lisa Thompson",
      designation: "Programs Director",
      image: "https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Lisa develops and oversees all our community programs, from children's education to elderly care. Her passion for social justice drives innovative program design.",
      email: "lisa.thompson@mvcharities.org",
      phone: "+1 234 567 8905",
      linkedin: "https://linkedin.com/in/lisathompson",
      expertise: ["Program Development", "Social Justice", "Community Engagement"],
      achievements: ["MSW in Social Work", "Program Excellence Award", "Community Impact Recognition"],
      is_active: true,
      sort_order: 5,
      created_at: '',
      updated_at: ''
    },
    {
      id: '6',
      name: "David Kim",
      designation: "Volunteer Coordinator",
      image: "https://images.pexels.com/photos/4173248/pexels-photo-4173248.jpeg?auto=compress&cs=tinysrgb&w=400",
      image_url: "https://images.pexels.com/photos/4173248/pexels-photo-4173248.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "David manages our volunteer programs and community partnerships. He believes in the power of collective action and works to engage community members in our mission.",
      email: "david.kim@mvcharities.org",
      phone: "+1 234 567 8906",
      linkedin: "https://linkedin.com/in/davidkim",
      expertise: ["Volunteer Management", "Community Partnerships", "Event Coordination"],
      achievements: ["Managed 500+ volunteers", "Community Engagement Expert", "Volunteer Leadership Award"],
      is_active: true,
      sort_order: 6,
      created_at: '',
      updated_at: ''
    }
  ];

  // Use database board staff if available, otherwise use default members
  const displayMembers = boardStaffMembers.length > 0 
    ? boardStaffMembers.map(member => ({
        id: member.id,
        name: member.name,
        designation: member.designation,
        image: member.image_url,
        image_url: member.image_url,
        bio: `${member.name} serves as ${member.designation} at MV Charities.`,
        email: `${member.name.toLowerCase().replace(/\s+/g, '.')}@mvcharities.org`,
        phone: "+1 234 567 8900",
        linkedin: "#",
        expertise: ["Leadership", "Management", "Community Service"],
        achievements: ["Years of dedicated service", "Community impact", "Professional excellence"],
        is_active: member.is_active,
        sort_order: member.sort_order,
        created_at: member.created_at,
        updated_at: member.updated_at
      }))
    : defaultBoardMembers;

  const maxIndex = Math.max(0, displayMembers.length - itemsPerView);

  const nextMembers = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevMembers = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 relative">
      {/* Green Theme Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 opacity-60"></div>
      <div className="absolute inset-0 bg-green-gradient opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Board &{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Staff
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Meet the dedicated professionals who lead our mission and ensure every program makes a lasting impact
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-2 text-gray-600">Loading board staff...</span>
          </div>
        ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {displayMembers.length > itemsPerView && (
            <>
              <button
                onClick={prevMembers}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-primary-200"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-primary-600" />
              </button>

              <button
                onClick={nextMembers}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-primary-200"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-primary-600" />
              </button>
            </>
          )}

          {/* Board Members Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {displayMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex-shrink-0 ${
                    itemsPerView === 1 ? 'w-full' :
                    itemsPerView === 2 ? 'w-1/2' :
                    itemsPerView === 3 ? 'w-1/3' :
                    'w-1/4'
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-primary-200">
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image_url || member.image}
                        alt={member.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-4 text-sm sm:text-base">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {displayMembers.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Board Staff Members</h3>
            <p className="text-gray-600">Board staff members will appear here once added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoardStaffSection;