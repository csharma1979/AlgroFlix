import React from 'react';

const EngagementModels: React.FC = () => {
  return (
    <section id="engagement-models" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Engagement Models</h1>
          <p className="text-xl text-gray-600">Flexible Engagement Models That Adapt to Your Needs</p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700">
            AlgroFlix offers multiple engagement models designed to match different project scopes, budgets, and timelines.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Engagement Options</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Short-Term Hiring</h3>
              <p className="text-gray-600">
                Ideal for urgent needs, specific expertise, or short-duration projects.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Long-Term Staffing</h3>
              <p className="text-gray-600">
                Dedicated professionals for ongoing initiatives and long-term stability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Contract-Based Resources</h3>
              <p className="text-gray-600">
                Flexible contracts with defined deliverables and timelines.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Dedicated Teams</h3>
              <p className="text-gray-600">
                Fully aligned teams managed according to your project goals.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Work Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { model: "Remote", desc: "Full remote work setup with seamless collaboration tools" },
              { model: "Hybrid", desc: "Combination of remote and on-site work arrangements" },
              { model: "Onsite", desc: "Full-time on-site presence at your location" }
            ].map((workModel, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-3">{workModel.model}</h3>
                <p className="text-gray-600">{workModel.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Engagement Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Need Assessment", desc: "Understand project scope and resource expectations." },
              { step: "2", title: "Model Selection", desc: "Choose the most suitable engagement approach." },
              { step: "3", title: "Onboarding & Alignment", desc: "Smooth onboarding with defined communication channels." },
              { step: "4", title: "Ongoing Collaboration", desc: "Agile execution with transparent reporting." }
            ].map((process, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {process.step}
                </div>
                <h3 className="font-bold text-blue-600 mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technologies Aligned to Engagement</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              Our engagement models support all major modern tech stacks, cloud platforms, and enterprise tools, ensuring flexibility without technical limitations.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Find the Right Engagement Model</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Talk to Our Experts
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
              Get a Custom Staffing Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;