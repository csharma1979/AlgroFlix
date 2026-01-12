import React, { useState, useEffect } from 'react';
import { loadAnalyticsIfAllowed } from '../utils/cookieUtils';
import { API_BASE_URL } from '../config/apiConfig';

type CookieCategory = 'essential' | 'analytics';

interface ConsentPreferences {
  [key: string]: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({});

  useEffect(() => {
    // Check if consent has been given before
    const consentStatus = localStorage.getItem('cookie_consent');
    const consentPreferences = localStorage.getItem('cookie_preferences');
    
    if (!consentStatus) {
      // Show banner if no consent has been given
      setShowBanner(true);
    } else {
      // Parse existing preferences
      if (consentPreferences) {
        try {
          const parsedPreferences = JSON.parse(consentPreferences);
          setPreferences(parsedPreferences);
          setConsentGiven(true);
          
          // Load analytics if allowed
          loadAnalyticsIfAllowed();
        } catch (e) {
          console.error('Error parsing consent preferences:', e);
        }
      }
    }
  }, []);

  const saveConsentToServer = async (status: string, categories: string[]) => {
    try {
      // Get user's IP and user agent
      // Note: In a real implementation, IP would typically be determined server-side
      // For this implementation, we'll send 'client' as IP placeholder
      const response = await fetch(`${API_BASE_URL}/api/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          categories,
          userAgent: navigator.userAgent,
          ip: 'client', // Would be determined server-side in production
          pageUrl: window.location.href
        })
      });

      if (!response.ok) {
        console.error('Failed to save consent to server');
      }
    } catch (error) {
      console.error('Error saving consent to server:', error);
    }
  };

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
    };

    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_preferences', JSON.stringify(allPreferences));
    
    setPreferences(allPreferences);
    setShowBanner(false);
    setConsentGiven(true);
    
    saveConsentToServer('accepted', ['essential', 'analytics']);
    
    // Load analytics since user accepted all
    loadAnalyticsIfAllowed();
  };

  const handleRejectNonEssential = () => {
    const limitedPreferences = {
      essential: true,
      analytics: false,
    };

    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('cookie_preferences', JSON.stringify(limitedPreferences));
    
    setPreferences(limitedPreferences);
    setShowBanner(false);
    setConsentGiven(true);
    
    saveConsentToServer('rejected', ['essential']);
    
    // Don't load analytics since user rejected non-essential
    loadAnalyticsIfAllowed();
  };

  if (!showBanner) {
    return null; // Don't render anything if banner shouldn't be shown
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4">
          <p className="text-sm">
            We use cookies to improve your experience and analyze website traffic.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAcceptAll}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectNonEssential}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;