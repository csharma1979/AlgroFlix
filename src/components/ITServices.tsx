import React from 'react';

const ITServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IT Services & Solutions
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Scalable Technology Solutions Built for Performance, Security & Growth
          </p>
          <p className="text-lg text-gray-600 max-w-5xl mx-auto mt-6">
            AlgroFlix delivers end-to-end IT services and solutions that help businesses build, modernize, and scale digital products with confidence. From custom software development to cloud-native platforms and ongoing support, we partner with organizations to turn technology into a strategic advantage.
          </p>
        </section>

        {/* Custom Software Development */}
        <section id="custom-software" className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Custom Software Development</h2>
            <p className="text-xl text-gray-700 mb-8">
              Tailor-Made Software Aligned to Your Business Goals
            </p>
            
            <p className="text-lg text-gray-600 mb-10">
              We design and develop custom software solutions that solve real business challenges and scale as your organization grows. Our team focuses on clean architecture, security, and performance to ensure long-term success.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">What We Deliver</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Web & enterprise application development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Custom-built business solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Secure, scalable architecture design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">API & third-party system integrations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Best For</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Startups building MVPs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Enterprises modernizing legacy systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Businesses needing domain-specific solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Web Development */}
        <section id="web-development" className="mb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Web Development</h2>
            <p className="text-xl text-gray-700 mb-8">
              Modern, High-Performance Web Experiences
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Web Capabilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Corporate & brand websites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Web portals & internal dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Responsive, UI/UX-driven design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">SEO-friendly and performance-optimized builds</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Focus Areas</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Usability & accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Scalable frontend architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Clean, maintainable code</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Enhanced user experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Cross-device compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Fast loading times</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Development */}
        <section id="mobile-apps" className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mobile App Development</h2>
            <p className="text-xl text-gray-700 mb-8">
              Intelligent Mobile Solutions for a Connected World
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mobile Solutions We Build</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Android & iOS native applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Cross-platform apps (Flutter, React Native)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Enterprise mobility solutions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Faster time-to-market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Consistent user experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Scalable backend integrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud & DevOps Services */}
        <section id="cloud-devops" className="mb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cloud & DevOps Services</h2>
            <p className="text-xl text-gray-700 mb-8">
              Cloud-Native, Scalable & Secure Infrastructure
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Cloud & DevOps Expertise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Cloud migration & optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">AWS, Microsoft Azure, and Google Cloud support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">CI/CD pipeline implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Infrastructure monitoring & management</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Outcomes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Improved system reliability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Reduced operational costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Faster release cycles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Maintenance & Support */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Maintenance & Support</h2>
            <p className="text-xl text-gray-700 mb-8">
              Reliable Support to Keep Your Systems Running Smoothly
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Support Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Performance tuning & optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Bug fixes & feature enhancements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Version upgrades & patch management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">24/7 monitoring & support</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why It Matters</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Minimized downtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Improved application lifespan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Continuous performance improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How We Deliver Value */}
        <section className="mb-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How We Deliver Value</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Agile & transparent delivery</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Security-first development approach</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable architectures</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated technical ownership</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm col-span-2 lg:col-span-1 lg:col-start-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Long-term partnership mindset</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 Ready to Build or Scale Your Technology?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how AlgroFlix can help you design, develop, and support technology solutions tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Get in Touch
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Request a Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Hire Skilled Developers
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ITServices;