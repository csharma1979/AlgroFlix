import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import Industries from './Industries';
import WhyChooseUs from './WhyChooseUs';
import Technologies from './Technologies';
import { API_BASE_URL } from '../config/apiConfig';

const LandingPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CTO",
      content: "AlgroFlix transformed our digital infrastructure. Their team delivered beyond expectations with innovative solutions and exceptional service.",
      avatar: "/src/assets/avatar1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Solutions Ltd.",
      role: "CEO",
      content: "Working with AlgroFlix has been a game-changer for our business. Their IT solutions helped us scale efficiently and securely.",
      avatar: "/src/assets/avatar2.jpg"
    },
    {
      id: 3,
      name: "Priya Sharma",
      company: "Innovate Corp",
      role: "Director of Operations",
      content: "The staff augmentation services from AlgroFlix were exceptional. We got top-tier talent that integrated seamlessly with our team.",
      avatar: "/src/assets/avatar3.jpg"
    }
  ];
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/public`);
        if (response.ok) {
          const data = await response.json();
          // Filter to published blogs and take only the 5 most recent ones
          const publishedBlogs = data
            .filter((blog: any) => blog.status === 'published')
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3); // Get only the 3 most recent blogs
          
          // Format the blogs to match the expected structure
          const formattedBlogs = publishedBlogs.map((blog: any) => ({
            id: blog._id,
            title: blog.title,
            excerpt: blog.shortDescription,
            date: new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            category: 'Technology', // Default category
            slug: blog.slug
          }));
          
          setBlogPosts(formattedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data if API fails
        const mockBlogs = [
          {
            id: 1,
            title: "The Future of Cloud Computing in 2024",
            excerpt: "Exploring the latest trends and innovations shaping the cloud computing landscape.",
            date: "Jan 15, 2024",
            category: "Technology",
            slug: "future-of-cloud-computing"
          },
          {
            id: 2,
            title: "Digital Transformation Strategies for SMBs",
            excerpt: "Practical approaches for small and medium businesses to embrace digital transformation.",
            date: "Jan 10, 2024",
            category: "Business",
            slug: "digital-transformation-strategies"
          },
          {
            id: 3,
            title: "Cybersecurity Best Practices for Remote Teams",
            excerpt: "Essential security measures for distributed workforce environments.",
            date: "Jan 5, 2024",
            category: "Security",
            slug: "cybersecurity-best-practices"
          }
        ];
        setBlogPosts(mockBlogs);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Company Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About AlgroFlix</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              AlgroFlix is a next-generation IT services, solutions, and staff augmentation company helping startups, SMEs, and enterprises accelerate digital transformation through scalable technology, skilled talent, and innovation-driven execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-700">Projects Completed</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">Happy Clients</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">Expert Professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Card View Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">IT Services</h3>
                <p className="text-gray-600 mb-4">End-to-end IT services and solutions for scalable, secure, and growth-oriented businesses.</p>
                <a 
                  href="/it-services" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Staff Augmentation</h3>
                <p className="text-gray-600 mb-4">Scale your teams rapidly with pre-vetted, highly skilled IT professionals.</p>
                <a 
                  href="/it-staff-augmentation" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-teal-500 to-green-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Software Development</h3>
                <p className="text-gray-600 mb-4">Tailor-made software solutions aligned to your business goals and objectives.</p>
                <a 
                  href="/it-services#custom-software" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-yellow-500 to-orange-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Web Development</h3>
                <p className="text-gray-600 mb-4">Modern, high-performance web experiences that reflect your brand and engage users.</p>
                <a 
                  href="/it-services#web-development" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-red-500 to-pink-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Mobile App Development</h3>
                <p className="text-gray-600 mb-4">Intelligent mobile solutions for a connected world with cross-platform support.</p>
                <a 
                  href="/it-services#mobile-apps" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Cloud & DevOps Services</h3>
                <p className="text-gray-600 mb-4">Cloud-native, scalable & secure infrastructure with DevOps best practices.</p>
                <a 
                  href="/it-services#cloud-devops" 
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <Industries />


      {/* Technologies Section */}
      <Technologies />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our clients have to say about their experience with AlgroFlix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Latest Insights & Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, insights, and best practices in IT and digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                    </div>
                  </div>
                </article>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <article key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-400"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">5 min read</span>
                      <Link to={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/blog" 
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
            >
              View All Articles
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join hundreds of satisfied clients who have accelerated their digital journey with AlgroFlix
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Schedule a Consultation
            </a>
            <a 
              href="/services" 
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;