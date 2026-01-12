import React from 'react';

const ITStaffAugmentation: React.FC = () => {
  return (
    <section id="it-staff-augmentation" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IT Staff Augmentation Services</h1>
          <p className="text-xl text-gray-600">Scale Your Teams with the Right Talent, at the Right Time</p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 mb-6">
            AlgroFlix helps organizations scale their technology teams quickly by providing highly skilled, pre-vetted IT professionals through flexible engagement models. Our professionals integrate seamlessly with your internal teams, tools, and workflows.
          </p>
          <p className="text-lg text-gray-700">
            Whether you need short-term expertise or long-term team expansion, we ensure speed, quality, and reliability without the overhead of traditional hiring.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Roles We Provide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Technology Roles</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Software Developers (Frontend, Backend, Full Stack)</li>
                <li>Mobile App Developers</li>
                <li>UI/UX Designers</li>
                <li>QA & Automation Engineers</li>
                <li>DevOps Engineers</li>
                <li>Data Engineers & Analysts</li>
                <li>Cloud Architects</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Leadership & Management</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Project Managers</li>
                <li>Business Analysts</li>
                <li>Tech Leads</li>
              </ul>
              <p className="mt-4 text-gray-600">
                Each role is matched based on technical skills, domain experience, and communication ability.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Process for Staff Augmentation</h2>
          <p className="text-center text-lg text-gray-700 mb-8">How We Ensure the Right Fit Every Time</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Requirement Analysis", desc: "We understand your business goals, team structure, and technical requirements." },
              { step: "2", title: "Planning & Strategy", desc: "Define engagement model, timelines, and collaboration approach." },
              { step: "3", title: "Resource Selection & Allocation", desc: "Shortlist and onboard pre-vetted professionals aligned to your needs." },
              { step: "4", title: "Seamless Integration", desc: "Resources integrate with your tools, sprint cycles, and workflows." },
              { step: "5", title: "Continuous Performance Monitoring", desc: "Ongoing quality checks, feedback loops, and optimization." }
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technologies We Support</h2>
          <p className="text-center text-lg text-gray-700 mb-8">Expertise Across Modern & Enterprise Technologies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                category: "Programming & Frameworks", 
                techs: ["Java", "Python", "JavaScript", ".NET", "React", "Angular", "Vue", "Node.js", "Spring Boot", "Django"] 
              },
              { 
                category: "Mobile Technologies", 
                techs: ["Android", "iOS", "Flutter", "React Native"] 
              },
              { 
                category: "Cloud & DevOps", 
                techs: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins"] 
              },
              { 
                category: "Databases", 
                techs: ["MySQL", "PostgreSQL", "MongoDB", "Oracle", "Redis"] 
              }
            ].map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-blue-600 mb-3">{tech.category}</h3>
                <ul className="text-gray-600 space-y-1">
                  {tech.techs.map((t, idx) => (
                    <li key={idx} className="text-sm">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Ready to Scale Your Team?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Hire Skilled Developers
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
              Request a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ITStaffAugmentation;