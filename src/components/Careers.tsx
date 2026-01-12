import React from 'react';

const Careers: React.FC = () => {
  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Join AlgroFlix</h1>
          <p className="text-xl text-gray-600">Be part of a growing technology company where innovation meets opportunity</p>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700">
            At AlgroFlix, we believe that our people are our greatest asset. We're always looking for talented, passionate individuals who want to make a difference in the world of IT services and solutions.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Learning-driven Culture", desc: "We encourage continuous learning and professional development" },
              { title: "Career Growth Opportunities", desc: "Clear paths for advancement and skill enhancement" },
              { title: "Flexible Work Environment", desc: "Options for remote, hybrid, or onsite work arrangements" },
              { title: "Competitive Compensation", desc: "Attractive salary packages and benefits" },
              { title: "Collaborative Teams", desc: "Work with diverse, talented professionals" },
              { title: "Innovation Focus", desc: "Work on cutting-edge technologies and projects" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Senior Full Stack Developer", 
                location: "Bangalore, India", 
                type: "Full-time",
                desc: "We're looking for an experienced Full Stack Developer with expertise in modern web technologies to join our dynamic team."
              },
              { 
                title: "Cloud Solutions Architect", 
                location: "Remote", 
                type: "Full-time",
                desc: "Join our cloud team as a Solutions Architect to design and implement scalable cloud infrastructure solutions."
              },
              { 
                title: "DevOps Engineer", 
                location: "Pune, India", 
                type: "Full-time",
                desc: "We need a skilled DevOps Engineer to help us optimize our deployment processes and infrastructure management."
              },
              { 
                title: "UI/UX Designer", 
                location: "Hyderabad, India", 
                type: "Full-time",
                desc: "Seeking a creative UI/UX Designer to enhance our product interfaces and user experiences."
              }
            ].map((job, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{job.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{job.location}</span>
                  <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Match?</h2>
          <p className="text-xl mb-8">Send us your resume and we'll keep you in mind for future opportunities</p>
          <a 
            href="mailto:careers@algroflix.com" 
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Submit Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Careers;