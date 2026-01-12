import React from 'react';

const Technologies: React.FC = () => {
  const techCategories = [
    { category: "Programming & Frameworks", techs: "Java, Python, JavaScript, .NET, React, Angular, Vue, Node.js, Spring Boot, Django" },
    { category: "Mobile", techs: "Android, iOS, Flutter, React Native" },
    { category: "Cloud & DevOps", techs: "AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins" },
    { category: "Databases", techs: "MySQL, PostgreSQL, MongoDB, Oracle, Redis" }
  ];

  return (
    <section id="technologies" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">Technologies We Work With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((tech, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-blue-600 mb-3">{tech.category}</h3>
              <p className="text-gray-600">{tech.techs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;