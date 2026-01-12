// Cookie utility functions for managing consent-based cookies

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

// Get cookie preferences from localStorage
export const getCookiePreferences = (): CookiePreferences => {
  const preferences = localStorage.getItem('cookie_preferences');
  if (preferences) {
    try {
      return JSON.parse(preferences);
    } catch (e) {
      console.error('Error parsing cookie preferences:', e);
      return { essential: true, analytics: false };
    }
  }
  return { essential: true, analytics: false };
};

// Check if a specific cookie category is allowed
export const isCookieCategoryAllowed = (category: keyof CookiePreferences): boolean => {
  const preferences = getCookiePreferences();
  return preferences[category] || false;
};

// Set a cookie with proper consent check
export const setCookieWithConsent = (name: string, value: string, category: keyof CookiePreferences, days?: number): boolean => {
  if (!isCookieCategoryAllowed(category)) {
    return false; // Consent not given for this category
  }

  // Set the cookie
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`;
  return true;
};

// Get a cookie value
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Check if analytics cookies are allowed
export const areAnalyticsCookiesAllowed = (): boolean => {
  return isCookieCategoryAllowed('analytics');
};

// Function to load analytics scripts conditionally
export const loadAnalyticsIfAllowed = () => {
  if (areAnalyticsCookiesAllowed()) {
    // Load analytics scripts here if needed
    console.log('Analytics cookies allowed, loading analytics scripts...');
    // Example: Load Google Analytics or other analytics tools
  } else {
    console.log('Analytics cookies not allowed, skipping analytics scripts...');
  }
};