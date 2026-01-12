import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

// Define types
type Blog = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
};

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10; // Show 10 blogs per page

  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on the current location
  const activeTab = location.pathname.includes('blog-management') ? 'blog-management' : 
                   location.pathname.includes('cookie-consents') ? 'cookie-consents' : 'dashboard';

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      setError('An error occurred while fetching blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, [navigate]);

  // Refetch blogs when switching to blog management tab
  useEffect(() => {
    if (activeTab === 'blog-management') {
      fetchBlogs();
    }
  }, [activeTab, fetchBlogs]); // Only fetch blogs when on dashboard or blog management page

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
            className={`px-4 py-3 block ${activeTab === 'dashboard' ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/dashboard/blog-management"
            className={`px-4 py-3 block ${activeTab === 'blog-management' ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Blog Management
          </Link>
          <Link 
            to="/admin/dashboard/cookie-consents"
            className="px-4 py-3 text-gray-700 hover:bg-gray-50 block"
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
              <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
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
          {(activeTab === 'dashboard' || location.pathname === '/admin/dashboard') && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard</h3>
                <p className="text-gray-600">
                  Welcome to the AlgroFlix admin panel. Use the navigation menu to manage your content.
                </p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-800">Total Blogs</h4>
                    <p className="text-3xl font-bold text-blue-600">{blogs.length}</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-green-800">Published</h4>
                    <p className="text-3xl font-bold text-green-600">
                      {blogs.filter(blog => blog.status === 'published').length}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-yellow-800">Drafts</h4>
                    <p className="text-3xl font-bold text-yellow-600">
                      {blogs.filter(blog => blog.status === 'draft').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'blog-management' || location.pathname.includes('blog-management')) && (
            <div className="max-w-6xl mx-auto">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {loading ? (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <p>Loading blogs...</p>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Blog Management</h3>
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => navigate('/admin/blog/new')}
                    >
                      Create New Blog
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {blogs
                          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) // Sort by last updated date
                          .slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage) // Apply pagination
                          .map((blog) => (
                          <tr key={blog._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{blog.author}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                blog.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {blog.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(blog.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(blog.updatedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                className="text-blue-600 hover:text-blue-900 mr-2"
                                onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                              >
                                View
                              </button>
                              <button 
                                className="text-blue-600 hover:text-blue-900 mr-2"
                                onClick={() => navigate(`/admin/blog/edit/${blog._id}`)}
                              >
                                Edit
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={async () => {
                                  if (window.confirm('Are you sure you want to delete this blog?')) {
                                    try {
                                      const token = localStorage.getItem('adminToken');
                                      const response = await fetch(`${API_BASE_URL}/api/blogs/${blog._id}`, {
                                        method: 'DELETE',
                                        headers: {
                                          'Authorization': `Bearer ${token}`,
                                        },
                                      });
                                      
                                      if (response.ok) {
                                        setBlogs(blogs.filter(b => b._id !== blog._id));
                                      } else {
                                        alert('Failed to delete blog');
                                      }
                                    } catch (err) {
                                      console.error(err);
                                      alert('An error occurred while deleting the blog');
                                    }
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination controls */}
                  {blogs.length > blogsPerPage && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * blogsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * blogsPerPage, blogs.length)}
                        </span>{' '}
                        of <span className="font-medium">{blogs.length}</span> results
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(blogs.length / blogsPerPage)))}
                          disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
                          className={`px-4 py-2 border rounded-md ${currentPage === Math.ceil(blogs.length / blogsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {blogs.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No blogs found. Create your first blog!</p>
                    </div>
                  )}
                </div>
              )}
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

export default AdminDashboard;