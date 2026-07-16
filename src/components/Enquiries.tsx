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

const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hr-academy' | 'general'>('all');
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
    if (!window.confirm('Are you sure you want to delete this record?')) return;

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

  // Filter records
  const filteredEnquiries = enquiries.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  // Paginated records
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

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
              to="/admin/dashboard/blog-management" 
              className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
            >
              Blog Management
            </Link>
            <Link 
              to="/admin/dashboard/cookie-consents" 
              className="px-4 py-3 block text-gray-700 hover:bg-gray-50"
            >
              Cookie Consents
            </Link>
            <div className="px-4 py-3 bg-blue-50 border-r-4 border-blue-500 text-blue-600 font-medium">
              Enquiries & Applications
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Enquiries & Applications</h2>
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

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-6">
              {(['all', 'hr-academy', 'general'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                    filterType === type 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  {type === 'all' ? 'All Enquiries' : type === 'hr-academy' ? 'HR Academy' : 'General Contact'}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-600">Loading records...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Enquiry Records ({filteredEnquiries.length})</h3>
                  <button 
                    onClick={fetchEnquiries}
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md font-medium"
                  >
                    Refresh
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Received At</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact info</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Interest / Subj</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedEnquiries.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-55/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-550">
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
                            <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${
                              item.type === 'hr-academy' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.type === 'hr-academy' ? 'HR Academy' : 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                            {item.type === 'hr-academy' 
                              ? (item.interest === 'residency' ? 'Certified Program Enrollment' : 'Book Counselling')
                              : (item.service || 'General Enquiry')
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
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

                      {filteredEnquiries.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-500">
                            No enquiries found.
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
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-55"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-55"
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
            <div className="px-6 py-4 bg-slate-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Enquiry Details</h3>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
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
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 mt-1 rounded-full ${
                    selectedEnquiry.type === 'hr-academy' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedEnquiry.type === 'hr-academy' ? 'HR Academy' : 'General website contact'}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Sender Name</span>
                <span className="text-base text-gray-900 font-bold">{selectedEnquiry.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-sm text-blue-600 hover:underline">{selectedEnquiry.email}</a>
                </div>
                <div>
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-sm text-blue-600 hover:underline">{selectedEnquiry.phone}</a>
                </div>
              </div>

              {selectedEnquiry.type === 'hr-academy' ? (
                <div className="border-t pt-4">
                  <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Program / Option Selected</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {selectedEnquiry.interest === 'residency' 
                      ? 'Certified HR Generalist Residency Program (100-Day)' 
                      : 'Free Career Counselling Session Request'
                    }
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Company</span>
                    <span className="text-sm text-gray-900 font-semibold">{selectedEnquiry.company || 'Not Specified'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider">Service of Interest</span>
                    <span className="text-sm text-gray-900 font-semibold">{selectedEnquiry.service || 'Not Specified'}</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <span className="text-xs text-gray-450 block uppercase font-bold tracking-wider mb-1">Message Details</span>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-gray-700 border whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-sm transition"
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

export default Enquiries;
