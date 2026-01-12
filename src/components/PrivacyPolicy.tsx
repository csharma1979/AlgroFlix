import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section id="privacy" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last Updated: January 8, 2026</p>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p>
            <strong>Introduction:</strong> AlgroFlix ("we", "us", or "our") operates the website algroflix.com (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Types of Data Collected</h3>
          <p><strong>Personal Data</strong></p>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code</li>
            <li>Usage Data</li>
          </ul>
          
          <p><strong>Usage Data</strong></p>
          <p>
            We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Use of Data</h2>
          <p>AlgroFlix uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Transfer of Data</h2>
          <p>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Disclosure of Data</h2>
          <p>
            We may disclose personal information if we believe in good faith that such action is necessary to:
          </p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Conform to applicable law or comply with legal process served on us</li>
            <li>Protect and defend our rights or property</li>
            <li>Act to protect the personal safety of users of the Service</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Security of Data</h2>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:<br />
            By email: info@algroflix.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;