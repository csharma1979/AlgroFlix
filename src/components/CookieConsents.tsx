import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

type ConsentRecord = {
  id: string;
  timestamp: string;
  status: string;
  categories: string[];
  userAgent: string;
  ip: string;
  pageUrl: string;
};

const CookieConsents: React.FC = () => {
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch consent records
  useEffect(() => {
    const fetchConsentRecords = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/consent`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch consent records');
        }

        const data = await response.json();
        setConsentRecords(data);
      } catch (err) {
        setError('Failed to load consent records');
        console.error('Error fetching consent records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsentRecords();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">AlgroFlix Admin</h1>
        </div>
        <nav className="mt-5">
          <Link 
            to="/admin/dashboard" 
            className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/dashboard/blog-management" 
            className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
          >
            Blog Management
          </Link>
          <div className="px-4 py-3 bg-blue-50 border-r-4 border-blue-500 text-blue-600">
            Cookie Consents
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">Cookie Consents</h2>
            </div>
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={handleLogout}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p>Loading consent records...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Cookie Consent Records</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categories
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Browser
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Page URL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consentRecords.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                            No consent records found
                          </td>
                        </tr>
                      ) : (
                        consentRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(record.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.status === 'accepted' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {record.categories.join(', ')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.ip}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={record.userAgent}>
                              {record.userAgent}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={record.pageUrl}>
                              {record.pageUrl}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4">
          <div className="px-6 text-center text-sm text-gray-500">
            © 2025 AlgroFlix. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CookieConsents;