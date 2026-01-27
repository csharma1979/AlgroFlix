import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About AlgroFlix</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building Intelligent IT Solutions & Scalable Teams for a Digital-First World
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 mb-6">
            AlgroFlix is a technology-driven IT services and staff augmentation company committed to helping organizations accelerate their digital journey. We specialize in delivering custom software solutions, modern IT services, and highly skilled professionals tailored to evolving business needs.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            With a strong focus on innovation, reliability, and performance, AlgroFlix partners with startups, mid-sized companies, and enterprises worldwide to build secure, scalable, and future-ready technology solutions.
          </p>
          
          <p className="text-lg text-gray-700">
            Our flexible engagement models and customer-centric approach allow us to adapt quickly to changing requirements while maintaining quality, transparency, and efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To become a trusted global technology partner recognized for innovation, reliability, and impactful digital solutions.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To empower businesses by delivering intelligent IT services, skilled talent, and scalable solutions that drive sustainable growth and long-term success.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Integrity & Transparency",
              "Innovation & Excellence",
              "Customer-Centric Approach",
              "Collaboration & Ownership",
              "Continuous Learning"
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <h3 className="font-bold text-blue-600">{value}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Choose AlgroFlix Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">Why Choose AlgroFlix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Skilled & experienced professionals",
              "Client-focused delivery",
              "Flexible engagement models",
              "Competitive pricing",
              "On-time delivery",
              "Strong QA processes",
              "Transparent communication",
              "Long-term partnership mindset"
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <h3 className="font-bold text-lg text-blue-600">{reason}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8">Partner with AlgroFlix to accelerate your digital journey</p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;