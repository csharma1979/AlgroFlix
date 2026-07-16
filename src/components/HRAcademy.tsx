import React, { useState } from 'react';
import { API_BASE_URL } from '../config/apiConfig';

const HRAcademy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>('individual');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'residency',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modules = [
    { num: 1, title: 'HR Fundamentals', details: 'Overview of HR roles, organizational structures, employee lifecycle, and modern workplace dynamics.' },
    { num: 2, title: 'Talent Acquisition', details: 'End-to-end recruitment process, sourcing strategies, candidate screening, interviewing methodologies, ATS usage, and recruiter hacks.' },
    { num: 3, title: 'Core HR Operations', details: 'Onboarding processes, maintenance of employee records, attendance & leave management systems, and exit procedures.' },
    { num: 4, title: 'Payroll & Compensation', details: 'CTC structuring, PF, ESI, TDS calculations, payroll processing workflows, and benefit administration.' },
    { num: 5, title: 'HR Compliance', details: 'Labor laws, statutory filings, legal compliance frameworks, internal audits, and grievance handling.' },
    { num: 6, title: 'HR Policies', details: 'Drafting employee handbooks, formulating company policies, standard operating procedures, and establishing code of conduct.' },
    { num: 7, title: 'HR Documentation', details: 'Drafting offer letters, employment contracts, warning letters, appraisal letters, and legal agreements.' },
    { num: 8, title: 'HR Analytics', details: 'Key HR metrics, data visualization, building HR dashboards, and using analytics for strategic business decisions.' },
    { num: 9, title: 'HR Business Partner (HRBP)', details: 'Strategic HR integration, stakeholder management, employee engagement frameworks, and change management.' },
    { num: 10, title: 'AI for HR Professionals', details: 'Leveraging AI tools, prompt engineering for HR tasks, automation of recruitment copy, and AI-driven engagement analysis.' },
    { num: 11, title: 'Corporate Communication', details: 'Professional email writing, business presentation skills, conflict resolution dialogues, and executive communication.' },
    { num: 12, title: 'HR Residency Project', details: 'Hands-on execution of full HR setup for a simulated corporate entity, mirroring a real HR department operation.' }
  ];

  const benefits = [
    { title: 'Practical Learning', desc: 'Real corporate scenarios and practical tasks.', icon: '🎯' },
    { title: 'Industry Mentorship', desc: 'Learn directly from experienced HR leaders.', icon: '👥' },
    { title: 'Corporate HR Residency', desc: 'Experience first-hand how an HR department works.', icon: '🏢' },
    { title: 'Professional Portfolio', desc: 'Graduate with real HR projects you can showcase.', icon: '📁' },
    { title: 'AI for HR', desc: 'Master modern AI tools to automate and supercharge HR tasks.', icon: '🤖' },
    { title: 'Placement Readiness', desc: 'Intense grooming including Resume, LinkedIn, and Mock Interviews.', icon: '💼' }
  ];

  const tools = [
    'Professional Resume', 'LinkedIn Profile', '150+ HR Templates', 'HR Playbook',
    'Payroll Workbook', 'HR Dashboards', 'AI Prompt Library', 'HR Documentation Toolkit',
    'Employee Handbook', 'Recruitment Toolkit', 'HR Residency Project', 'Placement Readiness Report'
  ];

  const steps = [
    { label: 'Learn', desc: 'Conceptual foundations' },
    { label: 'Practice', desc: 'Hands-on training' },
    { label: 'Simulate', desc: 'Corporate sandbox' },
    { label: 'Present', desc: 'Communication skills' },
    { label: 'Build Portfolio', desc: 'Practical demonstration' },
    { label: 'Become Industry Ready', desc: 'Successful transition' }
  ];

  const roadmap = [
    { title: 'Student', desc: 'Acquiring theoretical foundations' },
    { title: 'HR Resident', desc: 'Practicing real-world corporate tasks' },
    { title: 'HR Professional', desc: 'Executing core HR operations' },
    { title: 'HR Business Partner', desc: 'Driving business alignment' },
    { title: 'HR Leader', desc: 'Shaping organizational strategies' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const subject = formData.interest === 'residency' 
        ? 'HR Academy - Residency Enrollment Request' 
        : 'HR Academy - Career Counselling Session Request';
        
      const body = `
        New enquiry received for AlgroFlix HR Academy:
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Enquiry Type: ${formData.interest === 'residency' ? 'Enroll in certified program' : 'Book counselling session'}
        Message: ${formData.message}
      `;

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'algroflix@gmail.com',
          subject,
          body,
          senderInfo: { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone,
            interest: formData.interest,
            message: formData.message,
            type: 'hr-academy'
          }
        })
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been received. Our counselor will contact you shortly.'
        });
        setFormData({ name: '', email: '', phone: '', interest: 'residency', message: '' });
      } else {
        throw new Error('Failed submission');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or reach us at Support@algroflix.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('enroll-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Academy Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#311042] to-[#0f172a] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_45%)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-teal-400 uppercase bg-teal-400/10 rounded-full border border-teal-500/20 backdrop-blur-sm">
              AlgroFlix HR Academy
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Corporate HR Learning | Consulting | Research
            </h1>
            <p className="text-xl md:text-2xl text-blue-300 font-semibold mb-6">
              India's Practical HR Learning Institute
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              At AlgroFlix HR Academy, we bridge the gap between academic learning and corporate expectations through practical, industry-focused HR education. Our programs are designed by experienced HR leaders to prepare students for real-world HR careers through live projects, corporate simulations, HR Residency Programs, AI-powered learning, and professional mentoring.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-0.5"
              >
                🎯 Enroll Now
              </button>
              <button 
                onClick={scrollToContact}
                className="bg-slate-900/60 hover:bg-slate-900 border-2 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300 backdrop-blur-sm"
              >
                🎯 Book Free Career Counselling
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-slate-900">About AlgroFlix HR Academy</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                AlgroFlix HR Academy is a practical HR learning platform dedicated to preparing the next generation of HR professionals.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-6">
                <p className="text-xl font-semibold text-indigo-950 italic">
                  "Our mission is simple: Transform HR students into Industry-Ready HR Professionals."
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Unlike traditional coaching institutes, we focus on experiential learning, corporate simulations, practical documentation, AI-powered HR tools, and business-ready skills. Every learner graduates with a <strong>Professional HR Portfolio</strong> that demonstrates practical capability—not just a certificate.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl mb-4">👁️</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To become India's most trusted Practical HR Learning Institute by empowering aspiring HR professionals with industry-relevant skills, ethical values, and business acumen.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To bridge the gap between classroom learning and corporate expectations through practical training, mentorship, AI-enabled learning, and real-world HR experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Why Choose AlgroFlix?</h2>
            <p className="text-slate-600 mt-4">
              We design specialized pathways to prepare you for the complex world of modern human resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methodology */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Methodology</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Our Learning Methodology</h2>
            <p className="text-slate-600 mt-4">
              We apply an interactive 6-step loop to guarantee every concept is translated into action.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mx-auto mb-4 text-lg">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{step.label}</h4>
                  <p className="text-slate-500 text-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Residency Deep Dive */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <span className="text-teal-400 font-bold text-sm tracking-widest uppercase">Signature Learning Experience</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">HR Residency Program</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Students work as an active HR team for a simulated company. They don't just solve case studies; they handle real-life scenarios, create policies, and execute standard operating procedures exactly like a real corporate HR department.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  'Recruitment', 'Onboarding', 'Payroll', 'Compliance',
                  'HR Policies', 'Employee Engagement', 'Performance Management', 'HR Analytics',
                  'Business Presentations'
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 flex items-center space-x-2">
                    <span className="text-teal-400">✓</span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Program Catalog</h2>
            <p className="text-slate-600 mt-4">
              Accelerate your HR career with our flagship immersive program.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl shadow-xl overflow-hidden border border-slate-800">
            <div className="p-8 md:p-12 bg-gradient-to-r from-indigo-950 to-slate-900 border-b border-slate-800">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="bg-teal-400 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Flagship Program
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-3">Certified HR Generalist Residency Program</h3>
                  <p className="text-slate-400 mt-2">100-Day Career Accelerator</p>
                </div>
                <button 
                  onClick={scrollToContact}
                  className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-3 px-8 rounded-lg transition"
                >
                  Apply to Program
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-4">Suitable For:</h4>
                <div className="flex flex-wrap gap-2">
                  {['MBA HR Students', 'BBA Students', 'Fresh Graduates', 'Working Professionals', 'Career Transition Professionals'].map((audience, idx) => (
                    <span key={idx} className="bg-slate-800 px-4 py-1.5 rounded-full text-sm text-slate-300 border border-slate-700">
                      👨‍🎓 {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h4 className="text-xl font-bold text-slate-100 mb-6">Course Modules</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((mod, idx) => {
                  const isExpanded = expandedModule === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-slate-800/50 rounded-xl border transition-all duration-300 ${
                        isExpanded ? 'border-indigo-500/55' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : idx)}
                        className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-semibold flex items-center space-x-3">
                          <span className="text-teal-400 text-sm font-mono">Mod {mod.num}</span>
                          <span className="text-white text-base md:text-lg">{mod.title}</span>
                        </span>
                        <span className="text-slate-400 font-bold text-lg">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">
                          {mod.details}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Toolkit</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">What Makes Us Different?</h2>
            <p className="text-slate-600 mt-4 font-semibold">
              Every learner receives an extensive professional toolkit for career survival:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tools.map((tool, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-3 hover:shadow-md transition">
                <span className="text-teal-500 font-bold text-lg">✓</span>
                <span className="font-medium text-slate-800 text-sm">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Mentor */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1 text-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold mx-auto shadow-lg mb-6">
                  UP
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Usha Pandey</h3>
                <p className="text-blue-600 font-semibold mt-1">Founder</p>
                <p className="text-slate-500 text-xs mt-2">AlgroFlix HR Academy</p>
              </div>

              <div className="lg:col-span-2">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Meet Your Mentor</span>
                <h4 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  HR Leader | HR Business Partner | HR Strategist | Corporate Trainer
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  With 15+ years of experience across IT, Engineering, Higher Education, Operations, and Strategic HR, Usha Pandey has led HR transformation, talent acquisition, HR operations, compliance, performance management, and organizational development initiatives.
                </p>
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-slate-800 font-medium italic">
                    "Her vision is to make HR education practical, industry-driven, and career-focused."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Career & Corporate) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Comprehensive HR Services</h2>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === 'individual'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                For Individuals (Career Services)
              </button>
              <button
                onClick={() => setActiveTab('corporate')}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === 'corporate'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                For Corporate & Colleges
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'individual' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Resume Building', desc: 'Crafting compelling resumes designed to pass ATS screening.' },
                  { title: 'LinkedIn Optimization', desc: 'Setting up profiles to stand out for headhunters.' },
                  { title: 'Mock Interviews', desc: 'Realistic mock drills with performance evaluations.' },
                  { title: 'Corporate Grooming', desc: 'Enhancing professional presentation skills and behavior.' },
                  { title: 'HR Portfolio Creation', desc: 'Consolidating modules into a showcase-ready work portfolio.' },
                  { title: 'Career Counselling', desc: 'Personalized career path consulting for long-term growth.' },
                  { title: 'Placement Assistance', desc: 'Direct mapping with corporate and partner openings.' },
                  { title: 'Networking Sessions', desc: 'Exclusive access to industry peers and senior HR mentors.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2 text-base md:text-lg">💎 {item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Campus Recruitment', desc: 'End-to-end recruitment process management for institutions.' },
                  { title: 'Faculty Development Program', desc: 'Equipping faculty with the latest HR technologies & methodologies.' },
                  { title: 'Corporate HR Training', desc: 'Upskilling employee networks on statutory laws & compliance.' },
                  { title: 'HR Workshops', desc: 'Specialized interactive classroom modules for businesses.' },
                  { title: 'Guest Lectures', desc: 'Bringing top-tier industry experts to classrooms.' },
                  { title: 'College Partnerships', desc: 'MOU integrations for academic credit systems.' },
                  { title: 'HR Consulting', desc: 'Auditing, policy-framing, compliance structural support.' },
                  { title: 'Staff Augmentation', desc: 'Providing industry-trained HR residents for immediate project assistance.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2 text-base md:text-lg">💼 {item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Success Roadmap */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Success Roadmap</h2>
            <p className="text-slate-600 mt-4">
              Here is how your professional trajectory evolves at AlgroFlix HR Academy.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-5xl mx-auto">
            {roadmap.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm text-center flex-1 w-full md:w-auto">
                  <div className="text-teal-600 font-mono text-xs font-bold uppercase mb-2">Step 0{idx + 1}</div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
                {idx < roadmap.length - 1 && (
                  <div className="text-2xl text-slate-400 rotate-90 md:rotate-0">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Success Quote */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-xl md:text-2xl max-w-3xl mx-auto italic font-light text-slate-300">
            "We don't measure success by the number of certificates we issue. We measure success by the careers our learners build."
          </p>
        </div>
      </section>

      {/* Registration Form / Contact Us */}
      <section id="enroll-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Apply Now / Query Session</h2>
              <p className="text-slate-600 mt-2">
                Fill out the form below to enroll or book a free 1-on-1 counseling session with our expert mentors.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold text-slate-700 mb-2">Inquiry Type</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  >
                    <option value="residency">Enroll in Certified HR Residency Program</option>
                    <option value="counselling">Book Free Career Counselling Session</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Enquiry Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  placeholder="Tell us about yourself or ask a question..."
                />
              </div>

              {formStatus.type && (
                <div className={`p-4 rounded-lg text-sm font-medium ${
                  formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Info Card Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center text-sm text-slate-500">
          <h4 className="font-bold text-slate-700 text-lg mb-2">AlgroFlix HR Academy</h4>
          <p className="mb-4">From Campus to Corporate</p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-medium">
            <span>📧 Support@algroflix.com</span>
            <span>📞 +91 74899 47522</span>
            <span>🌐 www.algroflix.com</span>
            <span>📍 Bhopal, Madhya Pradesh</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRAcademy;
