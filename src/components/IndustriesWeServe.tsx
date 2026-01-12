import React from 'react';

const IndustriesWeServe: React.FC = () => {
  return (
    <section id="industries-we-serve" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Industries We Serve</h1>
          <p className="text-xl text-gray-600">Industry-Specific Talent with Real-World Experience</p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700">
            AlgroFlix provides staff augmentation services across multiple industries, ensuring professionals understand both technology and domain challenges.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Industries We Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Information Technology",
              "Startups & SaaS",
              "FinTech",
              "Healthcare",
              "E-commerce",
              "Education & EdTech",
              "Manufacturing",
              "Retail",
              "Logistics & Supply Chain",
              "BFSI",
              "Media & Entertainment"
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-blue-600">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Industry Delivery Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Domain-specific requirement analysis", desc: "" },
              { title: "Talent selection based on industry exposure", desc: "" },
              { title: "Compliance & security awareness", desc: "" },
              { title: "Continuous domain alignment", desc: "" }
            ].map((process, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-blue-600 mb-2">{process.title}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technologies Across Industries</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              We align technologies based on industry standards, compliance needs, and scalability requirements.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Need Industry-Experienced Talent?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Hire Industry-Specific Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;