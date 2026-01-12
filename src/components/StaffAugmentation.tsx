import React from 'react';

const StaffAugmentation: React.FC = () => {
  return (
    <section id="staffAugmentation" className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">IT Staff Augmentation</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          AlgroFlix enables organizations to scale teams rapidly by providing pre-vetted, highly skilled IT professionals through flexible engagement models.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default StaffAugmentation;