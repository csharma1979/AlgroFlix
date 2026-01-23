import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Building Intelligent IT Solutions & Scalable Teams for a Digital-First World
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          AlgroFlix is a next-generation IT services, solutions, and staff augmentation company helping startups, SMEs, and enterprises accelerate digital transformation through scalable technology, skilled talent, and innovation-driven execution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/contact" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Get in Touch
          </a>
          <a href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            Request Free Consultation
          </a>
          <a href="/it-staff-augmentation" className="bg-teal-400 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-500 transition duration-300">
            Hire Developers
          </a>
          <a href="/it-services" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition duration-300">
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;