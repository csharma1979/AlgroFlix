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
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-50 rounded-full filter blur-3xl opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: About Text & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Who We Are</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Pioneering Intelligent Tech Solutions & Practical Professional Growth
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                AlgroFlix is a next-generation technology and talent enablement company. We specialize in end-to-end IT services, scalable staff augmentation, and industry-oriented professional learning.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                By bridging the gap between technological innovation and practical career readiness, we help startups, SMEs, and enterprises build intelligent systems while nurturing the next generation of business and HR leaders.
              </p>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold group"
                >
                  Learn More About Our Journey 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Visual Metrics Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <span className="text-4xl mb-3 block">🚀</span>
                <div className="text-4xl font-extrabold text-blue-600 mb-1">100+</div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Projects Completed</h4>
                <p className="text-slate-500 text-xs">High-impact IT products delivered globally.</p>
              </div>

              <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <span className="text-4xl mb-3 block">🤝</span>
                <div className="text-4xl font-extrabold text-indigo-600 mb-1">50+</div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Happy Clients</h4>
                <p className="text-slate-500 text-xs">Long-term partnerships built on trust.</p>
              </div>

              <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <span className="text-4xl mb-3 block">👨‍🎓</span>
                <div className="text-4xl font-extrabold text-purple-600 mb-1">500+</div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Professionals Trained</h4>
                <p className="text-slate-500 text-xs">Industry-ready graduates from our Academy.</p>
              </div>

              <div className="bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-teal-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <span className="text-4xl mb-3 block">🏆</span>
                <div className="text-4xl font-extrabold text-teal-600 mb-1">15+ Yrs</div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Core Expertise</h4>
                <p className="text-slate-500 text-xs">Led by seasoned industry practitioners.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Services Card View Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Our Services & Academy</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Empowering organizations with next-gen technology and building the future of HR leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Card: AlgroFlix HR Academy */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 rounded-2xl shadow-xl overflow-hidden border border-purple-500/20 hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-0.5">
              <div className="p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl" />
                <div className="max-w-3xl relative z-10">
                  <span className="inline-block bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-teal-500/30">
                    Flagship Institution
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-4 mb-3">AlgroFlix HR Academy</h3>
                  <p className="text-slate-300 text-base md:text-lg mb-0 leading-relaxed font-light">
                    Bridge academic learning and corporate expectations through practical, simulator-driven HR Generalist residency programs, professional portfolios, and college consulting. We build industry-ready HR professionals.
                  </p>
                </div>
                <div className="flex-shrink-0 relative z-10">
                  <a 
                    href="/hr-academy" 
                    className="inline-block w-full md:w-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-teal-400/20 transition-all duration-300 text-center"
                  >
                    Explore HR Academy
                  </a>
                </div>
              </div>
            </div>

            {/* IT Services Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-blue-600 to-teal-500 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">💻</span>
                  <h3 className="text-xl font-bold">IT Services & Solutions</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    End-to-end IT services, tech infrastructure development, and digital transformation consulting built for high scale, reliability, and modern growth.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-services" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
                </a>
              </div>
            </div>

            {/* Staff Augmentation Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-500 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">👥</span>
                  <h3 className="text-xl font-bold">Staff Augmentation</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Scale your development, engineering, and support teams instantly with our pre-vetted, highly qualified, and dedicated technology professionals.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-staff-augmentation" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
                </a>
              </div>
            </div>

            {/* Custom Software Development Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-teal-600 to-emerald-500 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">⚙️</span>
                  <h3 className="text-xl font-bold">Custom Software</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Tailor-made software ecosystems, core databases, and API integrations designed specifically to address and solve your complex organizational challenges.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-services#custom-software" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
                </a>
              </div>
            </div>

            {/* Web Development Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-500 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">🌐</span>
                  <h3 className="text-xl font-bold">Web Development</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Modern, high-performance web applications built on secure React and Next architectures, designed to deliver exceptional branding and visual experiences.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-services#web-development" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
                </a>
              </div>
            </div>

            {/* Mobile App Development Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-rose-500 to-pink-500 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">📱</span>
                  <h3 className="text-xl font-bold">Mobile App Development</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Sleek, highly responsive native and cross-platform mobile apps for iOS and Android, leveraging the latest features for seamless client touchpoints.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-services#mobile-apps" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
                </a>
              </div>
            </div>

            {/* Cloud & DevOps Services Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-violet-600 p-6 flex flex-col justify-between text-white">
                  <span className="text-3xl">☁️</span>
                  <h3 className="text-xl font-bold">Cloud & DevOps</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Cloud migration, automated CI/CD pathways, containerization (Docker/Kubernetes), and robust security configurations for zero-downtime platforms.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a 
                  href="/it-services#cloud-devops" 
                  className="inline-block bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-2 px-5 rounded-lg text-sm transition-all duration-300"
                >
                  Learn More →
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

    </div>
  );
};

export default LandingPage;