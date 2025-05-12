import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, CreditCard, Check, 
  ArrowRight, ArrowLeft, ShieldCheck, Heart 
} from 'lucide-react';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    packageName: "Elite Escape",
    destination: "Maldives",
    guests: 1,
    dates: "",
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    specialRequests: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBookingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Number of Guests
              </label>
              <select 
                name="guests"
                value={bookingDetails.guests}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>
                    {num} Guest{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Select Travel Dates
              </label>
              <input 
                type="date" 
                name="dates"
                value={bookingDetails.dates}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Special Requests
              </label>
              <textarea 
                name="specialRequests"
                value={bookingDetails.specialRequests}
                onChange={handleInputChange}
                rows="4"
                placeholder="Any special accommodations or preferences?"
                className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white resize-none"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="contactInfo.firstName"
                  value={bookingDetails.contactInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  name="contactInfo.lastName"
                  value={bookingDetails.contactInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                name="contactInfo.email"
                value={bookingDetails.contactInfo.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Phone Number
              </label>
              <input 
                type="tel" 
                name="contactInfo.phone"
                value={bookingDetails.contactInfo.phone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-white"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                <MapPin size={24} className="text-indigo-600" />
                Package Details
              </h3>
              <div className="space-y-2">
                <p><strong>Package:</strong> {bookingDetails.packageName}</p>
                <p><strong>Destination:</strong> {bookingDetails.destination}</p>
                <p><strong>Guests:</strong> {bookingDetails.guests}</p>
                <p><strong>Travel Dates:</strong> {bookingDetails.dates}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                <User size={24} className="text-indigo-600" />
                Contact Information
              </h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {bookingDetails.contactInfo.firstName} {bookingDetails.contactInfo.lastName}</p>
                <p><strong>Email:</strong> {bookingDetails.contactInfo.email}</p>
                <p><strong>Phone:</strong> {bookingDetails.contactInfo.phone}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                <Heart size={24} className="text-indigo-600" />
                Special Requests
              </h3>
              <p>{bookingDetails.specialRequests || "No special requests"}</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-12">
            <div className="bg-green-100 dark:bg-green-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-indigo-100">
              Booking Confirmed!
            </h2>
            <p className="text-indigo-800 dark:text-indigo-300 mb-6">
              Your luxury experience is now reserved. Our team will contact you shortly to finalize the details.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={() => {/* Could link to homepage or packages */}}
              >
                Back to Packages
              </button>
              <button 
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                onClick={() => {/* Could open email client or show contact info */}}
              >
                Contact Support
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="px-8 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
              Book Your Luxury Experience
            </h1>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step} 
                  className={`w-8 h-2 rounded-full transition-all ${
                    currentStep >= step 
                      ? 'bg-indigo-600 dark:bg-indigo-400' 
                      : 'bg-indigo-200 dark:bg-indigo-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && currentStep < 4 && (
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition"
              >
                <ArrowLeft size={16} /> Previous
              </button>
            )}

            {currentStep < 4 && (
              <button 
                onClick={nextStep}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >
                {currentStep === 3 ? 'Confirm Booking' : 'Continue'} 
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* Guarantees */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center text-sm text-indigo-700 dark:text-indigo-300">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="text-green-500" />
              Secure Booking
            </div>
            <div className="flex items-center justify-center gap-2">
              <Heart size={20} className="text-pink-500" />
              Best Price Guarantee
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar size={20} className="text-blue-500" />
              Flexible Cancellation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}