import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific blog by slug
        const blogResponse = await fetch(`${API_BASE_URL}/api/blogs/public/${slug}`);
        
        if (blogResponse.ok) {
          const blogData = await blogResponse.json();
          if (blogData.status === 'published') {
            setBlog(blogData);
          } else {
            // If blog is not published, redirect to 404
            navigate('/404');
            return;
          }
        } else if (blogResponse.status === 404) {
          navigate('/404');
          return;
        } else {
          setError('Failed to fetch blog');
          return;
        }

        // Fetch recent blogs
        const recentResponse = await fetch(`${API_BASE_URL}/api/blogs/public`);
        if (recentResponse.ok) {
          const recentData = await recentResponse.json();
          // Filter only published blogs and sort by date
          const publishedBlogs = recentData
            .filter((blog: Blog) => blog.status === 'published')
            .sort((a: Blog, b: Blog) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 5);
          setRecentBlogs(publishedBlogs);
        }
      } catch (err) {
        setError('An error occurred while fetching blog details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

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
        <p className="text-gray-600">Loading blog...</p>
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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/blog" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main blog content */}
          <div className="md:w-2/3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {blog.author}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
              </div>
            </article>
          </div>

          {/* Recent blogs sidebar */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((recentBlog) => (
                    <Link 
                      key={recentBlog._id} 
                      to={`/blog/${recentBlog.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {recentBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(recentBlog.createdAt)}</p>
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

export default BlogDetail;