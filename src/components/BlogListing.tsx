import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

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

const BlogListing: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch published blogs only
        const response = await fetch(`${API_BASE_URL}/api/blogs/public`);
        
        if (response.ok) {
          const data = await response.json();
          // Filter only published blogs
          const publishedBlogs = data.filter((blog: Blog) => blog.status === 'published');
          setBlogs(publishedBlogs);
          
          // Get 5 most recent blogs for the sidebar
          const sortedBlogs = [...publishedBlogs].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setRecentBlogs(sortedBlogs.slice(0, 5));
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

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main blog content */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 gap-8">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {blog.author}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{blog.title}</h2>
                      
                      <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                      
                      <Link 
                        to={`/blog/${blog.slug}`} 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Read More
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No blogs available yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent blogs sidebar */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <Link 
                      key={blog._id} 
                      to={`/blog/${blog.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(blog.createdAt)}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent posts.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogListing;