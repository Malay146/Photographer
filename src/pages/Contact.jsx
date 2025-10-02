import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Footer from '../components/Footer';
import "../index.css"

const Contact = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Parallax effect for hero image
  const handleMouseMove = (e) => {
    const hero = heroRef.current;
    const image = imageRef.current;
    if (!hero || !image) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    gsap.to(image, {
      rotationX: -rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Animation for contact cards
  useGSAP(() => {
    gsap.fromTo('.contact-card', 
      { 
        y: 100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            ref={imageRef}
            src="https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg"
            alt="Contact hero"
            className="w-full h-full object-cover opacity-30 will-change-transform scale-110"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-1"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-2"></div>
        
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Main Heading with Enhanced Typography */}
          <div className="mb-8 relative">
            <h1 className="font-noto text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 tracking-tight leading-none">
              <span className="relative inline-block">
                Let's Create Together
                {/* <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div> */}
              </span>
            </h1>
          </div>
          
          {/* Enhanced Description */}
          <div className="relative mb-12">
            <p className="font-lato text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-relaxed font-light text-gray-200">
              Every great photograph starts with a 
              <span className="font-semibold text-white relative mx-2">
                conversation
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/40"></div>
              </span>
            </p>
            <p className="font-lato text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mt-6 text-gray-300 font-light">
              Let's discuss your vision and bring it to life through the art of photography
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
            <button 
              onClick={() => document.querySelector('.contact-cards-container').scrollIntoView({ behavior: 'smooth' })}
              aria-label="Navigate to contact information section"
              className="group relative px-8 py-4 border-2 border-white text-white font-bold font-lato text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-noto text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              Get In Touch
            </h2>
            <p className="font-lato text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're planning a wedding, need corporate headshots, or want to capture life's precious moments, 
              I'm here to help tell your story through the lens.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="contact-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="contact-card bg-zinc-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-lato font-bold text-xl mb-2">Phone</h3>
              <p className="font-lato text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="contact-card bg-zinc-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-lato font-bold text-xl mb-2">Email</h3>
              <p className="font-lato text-gray-600">hello@photographer.com</p>
            </div>

            <div className="contact-card bg-zinc-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-lato font-bold text-xl mb-2">Studio</h3>
              <p className="font-lato text-gray-600">123 Creative Street<br />Art District, NY 10001</p>
            </div>

            <div className="contact-card bg-zinc-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-lato font-bold text-xl mb-2">Hours</h3>
              <p className="font-lato text-gray-600">Mon - Fri: 9AM - 6PM<br />Weekends: By Appointment</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto contact-form">
            <div className="bg-zinc-950 rounded-3xl p-8 md:p-12">
              <h3 className="font-noto text-3xl md:text-5xl font-bold text-white text-center mb-8">
                Start Your Project
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-lato text-lg mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white text-black text-lg rounded-xl p-4 outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-lato text-lg mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white text-black text-lg rounded-xl p-4 outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-lato text-lg mb-2">
                    Project Type
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black text-lg rounded-xl p-4 outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="corporate">Corporate Photography</option>
                    <option value="event">Event Photography</option>
                    <option value="commercial">Commercial Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-lato text-lg mb-2">
                    Tell me about your project *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full bg-white text-black text-lg rounded-xl p-4 outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    placeholder="Describe your vision, timeline, location, and any specific requirements..."
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    aria-label="Submit contact form to start your photography project"
                    className="bg-white hover:bg-gray-200 text-black font-bold font-lato text-lg px-12 py-4 rounded-xl transition-colors duration-300 uppercase tracking-wide"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="font-noto text-3xl md:text-5xl font-bold text-black mb-8">
            Follow the Journey
          </h3>
          <p className="font-lato text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay connected and see behind-the-scenes moments, recent work, and photography tips.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Instagram', url: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { name: 'YouTube', url: '#', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              { name: 'Facebook', url: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { name: 'Twitter', url: '#', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                aria-label={`Follow us on ${social.name} for photography updates and behind-the-scenes content`}
                className="flex items-center justify-center w-16 h-16 bg-black rounded-full hover:bg-gray-800 transition-colors duration-300 group"
              >
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;