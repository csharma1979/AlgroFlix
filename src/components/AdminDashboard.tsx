import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

type EnquiryRecord = {
  _id: string;
  type: 'general' | 'hr-academy';
  createdAt: string;
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    generalCount: 0,
    hrAcademyCount: 0,
    consentCount: 0
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes('cookie-consents') ? 'cookie-consents' : 
                   location.pathname.includes('hr-academy-enquiries') ? 'hr-academy-enquiries' : 
                   location.pathname.includes('enquiries') ? 'enquiries' : 'dashboard';

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch overview stats
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const [enquiryRes, consentRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/enquiries`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/api/consent`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        let generalCount = 0;
        let hrAcademyCount = 0;
        let consentCount = 0;

        if (enquiryRes.ok) {
          const enquiries: EnquiryRecord[] = await enquiryRes.json();
          generalCount = enquiries.filter(e => e.type !== 'hr-academy').length;
          hrAcademyCount = enquiries.filter(e => e.type === 'hr-academy').length;
        }

        if (consentRes.ok) {
          const consents = await consentRes.json();
          consentCount = consents.length;
        }

        setStats({ generalCount, hrAcademyCount, consentCount });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
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
            className={`px-4 py-3 block ${activeTab === 'dashboard' ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/dashboard/enquiries"
            className={`px-4 py-3 block ${activeTab === 'enquiries' ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            General Enquiries
          </Link>
          <Link 
            to="/admin/dashboard/hr-academy-enquiries"
            className={`px-4 py-3 block ${activeTab === 'hr-academy-enquiries' ? 'bg-purple-50 border-r-4 border-purple-600 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            HR Academy Enquiries
          </Link>
          <Link 
            to="/admin/dashboard/cookie-consents"
            className={`px-4 py-3 block ${activeTab === 'cookie-consents' ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Cookie Consents
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            </div>
            <div>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={handleLogout}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to AlgroFlix Admin Portal</h3>
              <p className="text-gray-600">
                Select options from the left sidebar menu to view and manage general inquiries, HR Academy applications, and user consent records.
              </p>

              {loading ? (
                <div className="py-8 text-center text-gray-500">Loading overview stats...</div>
              ) : (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* General Enquiries Card */}
                  <Link 
                    to="/admin/dashboard/enquiries"
                    className="bg-blue-50 hover:bg-blue-100/80 p-6 rounded-xl border border-blue-200 transition duration-200 block"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-blue-900">General Enquiries</h4>
                      <span className="text-2xl">📥</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-700 mt-4">{stats.generalCount}</p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">View Contact & Service Requests →</p>
                  </Link>

                  {/* HR Academy Card */}
                  <Link 
                    to="/admin/dashboard/hr-academy-enquiries"
                    className="bg-purple-50 hover:bg-purple-100/80 p-6 rounded-xl border border-purple-200 transition duration-200 block"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-purple-900">HR Academy Enquiries</h4>
                      <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-700 mt-4">{stats.hrAcademyCount}</p>
                    <p className="text-xs text-purple-600 mt-2 font-medium">View Student & Residency Inquiries →</p>
                  </Link>

                  {/* Cookie Consents Card */}
                  <Link 
                    to="/admin/dashboard/cookie-consents"
                    className="bg-emerald-50 hover:bg-emerald-100/80 p-6 rounded-xl border border-emerald-200 transition duration-200 block"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-emerald-900">Cookie Consents</h4>
                      <span className="text-2xl">🍪</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-700 mt-4">{stats.consentCount}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">View User Consent Log →</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;