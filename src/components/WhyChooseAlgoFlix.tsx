import React from 'react';

const WhyChooseAlgoFlix: React.FC = () => {
  return (
    <section id="why-choose-algoflix" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose AlgroFlix</h1>
          <p className="text-xl text-gray-600">A Trusted Partner for Long-Term Team Scaling</p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700">
            AlgroFlix is not just a staffing provider — we are a technology partner invested in your success.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Organizations Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Skilled & experienced IT professionals",
              "Client-focused delivery approach",
              "Flexible engagement models",
              "Competitive pricing",
              "On-time project delivery",
              "Strong quality assurance",
              "Transparent communication",
              "Long-term partnership mindset"
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">{reason}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Delivery Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Quality over quantity", desc: "" },
              { title: "Transparency at every stage", desc: "" },
              { title: "Scalable team structures", desc: "" },
              { title: "Continuous improvement mindset", desc: "" }
            ].map((philosophy, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-bold text-blue-600 text-lg">{philosophy.title}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technologies & Process Advantage</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              Our standardized processes and modern technology expertise ensure predictable outcomes and reduced hiring risk.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with AlgroFlix Today</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Schedule a Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
              Hire Developers Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAlgoFlix;