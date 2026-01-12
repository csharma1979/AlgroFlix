import React from 'react';

const Industries: React.FC = () => {
  const industries = [
    "Information Technology", "Startups & SaaS", "FinTech & BFSI", 
    "Healthcare", "E-commerce & Retail", "Education & EdTech", 
    "Manufacturing", "Logistics & Supply Chain", "Media & Entertainment"
  ];

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">Industries We Serve</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-blue-50 transition-colors duration-300">
              <h3 className="font-bold text-lg text-gray-800">{industry}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;