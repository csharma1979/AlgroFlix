import React from 'react';

const TermsConditions: React.FC = () => {
  return (
    <section id="terms" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600">Last Updated: January 8, 2026</p>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p>
            Welcome to AlgroFlix. These terms and conditions outline the rules and regulations for the use of AlgroFlix's Website, located at algroflix.com.
            By accessing this website we assume you accept these terms and conditions. Do not continue to use AlgroFlix if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Intellectual Property</h2>
          <p>
            Unless otherwise stated, AlgroFlix and/or its licensors own the intellectual property rights for all material on AlgroFlix. All intellectual property rights are reserved. You may access this from AlgroFlix for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">License to Use Content</h2>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Republish material from AlgoFlix</li>
            <li>Sell, rent or sub-license material from AlgoFlix</li>
            <li>Reproduce, duplicate or copy material from AlgoFlix</li>
            <li>Redistribute content from AlgoFlix</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">User Comments</h2>
          <p>
            This Agreement shall begin on the date hereof.
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. AlgroFlix does not filter, edit, publish or review Comments prior to their presence on the website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Hyperlinking to Our Content</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">iFrames</h2>
          <p>
            Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Content Liability</h2>
          <p>
            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 space-y-2 ml-4">
            <li>limit or exclude our or your liability for death or personal injury</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Limitation of Liability</h2>
          <p>
            In no event shall AlgroFlix nor its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AlgroFlix's website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us:<br />
            By email: info@algroflix.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;