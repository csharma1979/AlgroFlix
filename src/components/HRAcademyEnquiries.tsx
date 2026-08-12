import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

type EnquiryRecord = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  interest?: string;
  message?: string;
  type: 'general' | 'hr-academy';
  createdAt: string;
};

const HRAcademyEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to fetch enquiries');
      }

      const data = await response.json();
      setEnquiries(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries');
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setEnquiries(prev => prev.filter(item => item._id !== id));
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(null);
        }
      } else {
        alert('Failed to delete enquiry');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while deleting the record');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter specifically for HR Academy enquiries
  const hrAcademyEnquiries = enquiries.filter(item => item.type === 'hr-academy');

  // Paginated records
  const paginatedEnquiries = hrAcademyEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(hrAcademyEnquiries.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
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
              to="/admin/dashboard/enquiries" 
              className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
            >
              General Enquiries
            </Link>
            <div className="px-4 py-3 bg-purple-50 border-r-4 border-purple-600 text-purple-700 font-medium">
              HR Academy Enquiries
            </div>
            <Link 
              to="/admin/dashboard/cookie-consents" 
              className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
            >
              Cookie Consents
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">HR Academy Enquiries</h2>
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
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600">Loading HR Academy records...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">HR Academy Student Inquiries ({hrAcademyEnquiries.length})</h3>
                    <p className="text-xs text-gray-500">Submissions received from /hr-academy page</p>
                  </div>
                  <button 
                    onClick={fetchEnquiries}
                    className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1.5 rounded-md font-medium"
                  >
                    Refresh
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Received At</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Applicant Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact Details</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Inquiry Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedEnquiries.map((item) => (
                        <tr key={item._id} className="hover:bg-purple-50/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div>📧 {item.email}</div>
                            <div>📞 {item.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                              item.interest === 'residency'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}>
                              {item.interest === 'residency' 
                                ? '🎯 HR Residency Program' 
                                : '💬 Career Counselling'
                              }
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="text-purple-600 hover:text-purple-900 font-semibold"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {hrAcademyEnquiries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-gray-500">
                            No HR Academy enquiries received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
                    <span className="text-sm text-gray-700">
                      Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Details View Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-purple-900 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold">HR Academy Enquiry Details</h3>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-white/80 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Date Received</span>
                  <span className="text-sm text-gray-900 font-semibold">{formatDate(selectedEnquiry.createdAt)}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Source Channel</span>
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 mt-1 rounded-full bg-purple-100 text-purple-800">
                    HR Academy Page (/hr-academy)
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Applicant Name</span>
                <span className="text-base text-gray-900 font-bold">{selectedEnquiry.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-sm text-purple-600 hover:underline font-medium">{selectedEnquiry.email}</a>
                </div>
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-sm text-purple-600 hover:underline font-medium">{selectedEnquiry.phone}</a>
                </div>
              </div>

              <div className="border-t pt-4">
                <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Inquiry Type Selected</span>
                <span className="text-sm font-semibold text-slate-800">
                  {selectedEnquiry.interest === 'residency' 
                    ? '🎯 Certified HR Generalist Residency Program (100-Day)' 
                    : '💬 Free Career Counselling Session'
                  }
                </span>
              </div>

              <div className="border-t pt-4">
                <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider mb-1">Enquiry Message / Details</span>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-gray-700 border whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAcademyEnquiries;
