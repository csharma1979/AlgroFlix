import React from 'react';

const AIChatWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default AIChatWidget;