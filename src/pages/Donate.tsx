import React, { useState } from 'react';
import { useEffect } from 'react';
import { Heart, CreditCard, Users, Shield, Target, Gift, Check, ChevronRight } from 'lucide-react';
import { supabase, DonateContent } from '../lib/supabase';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedCause, setSelectedCause] = useState('general');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    isAnonymous: false
  });
  const [donateContent, setDonateContent] = useState<DonateContent | null>(null);
  const [loadingDonateContent, setLoadingDonateContent] = useState(true);

  useEffect(() => {
    loadDonateContent();
  }, []);

  const loadDonateContent = async () => {
    try {
      setLoadingDonateContent(true);
      const { data, error } = await supabase
        .from('donate_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading donate content:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setDonateContent(data[0]);
      }
    } catch (error) {
      console.error('Error loading donate content:', error);
    } finally {
      setLoadingDonateContent(false);
    }
  };

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const causes = [
    {
      id: 'general',
      name: 'General Fund',
      description: 'Support all our programs and initiatives',
      icon: Heart,
      color: 'from-primary-500 to-secondary-500'
    },
    {
      id: 'children',
      name: 'Children\'s Education',
      description: 'Support educational programs for children',
      icon: Users,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'medical',
      name: 'Medical Care',
      description: 'Provide healthcare services to those in need',
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'elderly',
      name: 'Elderly Care',
      description: 'Support our elderly care programs',
      icon: Target,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'relief',
      name: 'Emergency Relief',
      description: 'Help during disasters and emergencies',
      icon: Gift,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const impactData = [
    { amount: 25, impact: 'Provides a nutritious meal for 5 children' },
    { amount: 50, impact: 'Supplies school materials for 2 students for a month' },
    { amount: 100, impact: 'Covers medical checkup for 3 elderly residents' },
    { amount: 250, impact: 'Supports a child\'s education for 3 months' },
    { amount: 500, impact: 'Provides emergency relief for a family' },
    { amount: 1000, impact: 'Sponsors a child\'s complete education for a year' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Secure payment via card' },
    { id: 'bank', name: 'Bank Transfer', icon: Shield, description: 'Direct bank transfer' },
    { id: 'mobile', name: 'Mobile Payment', icon: Target, description: 'Mobile wallet payment' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(0);
    }
  };

  const getFinalAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  const getImpactMessage = () => {
    const amount = getFinalAmount();
    const impact = impactData.find(item => item.amount <= amount);
    return impact ? impact.impact : 'Makes a significant difference in our community';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    alert('Thank you for your generous donation! Redirecting to payment...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Make a Donation</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Your generosity transforms lives and builds stronger communities. Every donation makes a difference.
          </p>
        </div>
      </section>

     

      {/* Donation Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* QR Codes and Bank Accounts Section */}
          {donateContent && (donateContent.qr_codes.length > 0 || donateContent.bank_accounts.length > 0) && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Donation Methods</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose your preferred method to make a donation and support our mission
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* QR Codes Column */}
                {donateContent.qr_codes.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Payment</h3>
                    <div className="space-y-6">
                      {donateContent.qr_codes.map((qr, index) => (
                        <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center border border-primary-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">{qr.title}</h4>
                          <div className="flex justify-center mb-4">
                            <img
                              src={qr.image_url}
                              alt={qr.title}
                              className="w-48 h-48 object-contain rounded-lg border border-gray-200 bg-white"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400";
                              }}
                            />
                          </div>
                          {qr.description && (
                            <p className="text-gray-700 text-sm">{qr.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bank Accounts Column */}
                {donateContent.bank_accounts.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bank Transfer</h3>
                    <div className="space-y-6">
                      {donateContent.bank_accounts.map((bank, index) => (
                        <div key={index} className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{bank.bank_name}</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                              <span className="font-semibold text-gray-700">Account Name:</span>
                              <span className="text-gray-900">{bank.account_name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                              <span className="font-semibold text-gray-700">Account Number:</span>
                              <span className="text-gray-900 font-mono">{bank.account_number}</span>
                            </div>
                            {bank.routing_number && (
                              <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                                <span className="font-semibold text-gray-700">Routing Number:</span>
                                <span className="text-gray-900 font-mono">{bank.routing_number}</span>
                              </div>
                            )}
                            {bank.swift_code && (
                              <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                                <span className="font-semibold text-gray-700">SWIFT Code:</span>
                                <span className="text-gray-900 font-mono">{bank.swift_code}</span>
                              </div>
                            )}
                            {bank.branch && (
                              <div className="flex justify-between items-center py-2">
                                <span className="font-semibold text-gray-700">Branch:</span>
                                <span className="text-gray-900">{bank.branch}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

     

      
    </div>
  );
};

export default Donate;