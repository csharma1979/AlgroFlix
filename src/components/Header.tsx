import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStaffAugmentationDropdownOpen, setIsStaffAugmentationDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'itServices', label: 'IT Services', path: '/it-services' },

    { 
      id: 'staffAugmentation', 
      label: 'Staff Augmentation', 
      path: '', // Empty path makes it non-navigable
      hasDropdown: true,
      submenu: [
        { label: 'IT Staff Augmentation', path: '/it-staff-augmentation' },
        { label: 'Engagement Models', path: '/engagement-models' },
        { label: 'Industries We Serve', path: '/industries-we-serve' },
        { label: 'Why Choose AlgroFlix', path: '/why-choose-algoflix' }
      ]
    },
    /* { id: 'blog', label: 'Blog', path: '/blog' }, */
    { id: 'careers', label: 'Careers', path: '/careers' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  const handleClick = (sectionId: string, path: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    setIsStaffAugmentationDropdownOpen(false);
    
    // Navigate to the appropriate page only if path is provided
    if (path && location.pathname !== path) {
      navigate(path);
    }
  };

  const handleStaffAugmentationClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsStaffAugmentationDropdownOpen(!isStaffAugmentationDropdownOpen);
    setIsMenuOpen(true); // Keep menu open when services dropdown is clicked
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="AlgroFlix Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {navItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
                onMouseEnter={() => item.hasDropdown ? setIsStaffAugmentationDropdownOpen(true) : {}}
                onMouseLeave={() => item.hasDropdown ? setIsStaffAugmentationDropdownOpen(false) : {}}
              >
                {item.hasDropdown ? (
                  <div 
                    className={`font-medium cursor-pointer ${
                      activeSection === item.id ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
                    }`}
                    onClick={handleStaffAugmentationClick}
                    onTouchEnd={handleStaffAugmentationClick}
                  >
                    {item.label}
                    {isStaffAugmentationDropdownOpen && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50"
                      >
                        {item.submenu?.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={subItem.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
                            onClick={() => handleClick(item.id, subItem.path)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-medium ${
                      activeSection === item.id ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
                    }`}
                    onClick={() => {
                      handleClick(item.id, item.path);
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/hr-academy" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-wide transform hover:-translate-y-0.5"
            >
              AlgroFlix HR Academy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <div>
                    <div 
                      className={`block py-2 font-medium ${
                        activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsStaffAugmentationDropdownOpen(!isStaffAugmentationDropdownOpen);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        setIsStaffAugmentationDropdownOpen(!isStaffAugmentationDropdownOpen);
                      }}
                    >
                      {item.label} {isStaffAugmentationDropdownOpen ? '▲' : '▼'}
                    </div>
                    {isStaffAugmentationDropdownOpen && item.submenu && (
                      <div className="ml-4 space-y-2 mt-2">
                        {item.submenu.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={subItem.path}
                            className="block py-2 font-medium text-gray-600 hover:text-blue-500"
                            onClick={() => {
                              handleClick(item.id, subItem.path);
                              setIsStaffAugmentationDropdownOpen(false); // Close dropdown after selection on mobile
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-2 font-medium ${
                      activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      handleClick(item.id, item.path);
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-100">
              <Link
                to="/hr-academy"
                className="block text-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold py-2.5 px-4 rounded-full shadow-md text-sm transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                AlgroFlix HR Academy
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;