import React from 'react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    "Skilled & experienced professionals",
    "Client-focused delivery",
    "Flexible engagement models",
    "Competitive pricing",
    "On-time delivery",
    "Strong QA processes",
    "Transparent communication",
    "Long-term partnership mindset"
  ];

  return (
    <section id="whyChooseUs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">Why Choose AlgroFlix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="font-bold text-lg text-blue-600">{reason}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;