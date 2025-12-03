import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from 'lucide-react';

const EventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = [
    {
      id: 1,
      title: "Community Health Camp",
      date: "2024-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Central Community Hall",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Free medical checkups and health awareness programs for all ages.",
      category: "Medical"
    },
    {
      id: 2,
      title: "Children's Education Drive",
      date: "2024-02-20",
      time: "10:00 AM - 2:00 PM",
      location: "MV Children's Home",
      image: "https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Book donation and educational supply distribution for underprivileged children.",
      category: "Education"
    },
    {
      id: 3,
      title: "Senior Citizens Day",
      date: "2024-02-25",
      time: "11:00 AM - 5:00 PM",
      location: "MV Elderly Care Center",
      image: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Entertainment, health checkups, and social activities for our elderly residents.",
      category: "Elder Care"
    },
    {
      id: 4,
      title: "Food Distribution Program",
      date: "2024-03-01",
      time: "8:00 AM - 12:00 PM",
      location: "Various Locations",
      image: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Monthly food package distribution to families in need.",
      category: "Relief"
    },
    {
      id: 5,
      title: "Youth Skill Development",
      date: "2024-03-05",
      time: "2:00 PM - 6:00 PM",
      location: "Training Center",
      image: "https://images.pexels.com/photos/5427660/pexels-photo-5427660.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Vocational training and skill development workshop for young adults.",
      category: "Training"
    },
    {
      id: 6,
      title: "Community Clean-up Drive",
      date: "2024-03-10",
      time: "7:00 AM - 11:00 AM",
      location: "City Park Area",
      image: "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Environmental awareness and community beautification initiative.",
      category: "Environment"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, events.length - itemsPerView);

  const nextEvents = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevEvents = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming <span className="bg-gradient-to-r from-secondary-600 to-secondary-800 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join us in our upcoming events and be part of the positive change in our community
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevEvents}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-secondary-200"
          >
            <ChevronLeft className="h-6 w-6 text-secondary-600" />
          </button>

          <button
            onClick={nextEvents}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-secondary-200"
          >
            <ChevronRight className="h-6 w-6 text-secondary-600" />
          </button>

          {/* Events Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="w-1/4 flex-shrink-0 px-3"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-secondary-200">
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-semibold rounded-full shadow-lg">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-secondary-500" />
                          <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-secondary-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-secondary-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <button className="w-full px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-secondary-500 text-secondary-600 font-semibold rounded-full hover:bg-secondary-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;