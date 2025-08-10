import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/images/bg.svg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-api-endpoint.com/contact', formData);
      console.log("Form submitted successfully:", res.data);
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', contact: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex"
    >
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-12 text-white">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          AI Test Case Generator
        </h1>
        <p className="text-lg leading-relaxed max-w-xl drop-shadow">
          Automatically generate robust, AI-powered test cases for your codebase in seconds.  
          Connect with GitHub OAuth to fetch repositories, view files, generate detailed test cases, and get comprehensive summaries — all in one place.
        </p>
        <p className="mt-4 text-md opacity-80 drop-shadow">
          Save time, reduce errors, and improve code quality with automation.
        </p>
      </div>

      {/* Right Section (Contact Form) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 
                     animate-fadeIn scale-95 hover:scale-100 transition-all duration-500"
        >
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 mb-8">
            Contact Us
          </h2>

          {/* Input Fields */}
          {['name', 'email', 'contact'].map((field, idx) => (
            <input
              key={idx}
              type={field === 'email' ? 'email' : field === 'contact' ? 'tel' : 'text'}
              name={field}
              placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 mb-5 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 
                         text-white placeholder-gray-300 border border-violet-400 
                         focus:outline-none focus:ring-4 focus:ring-violet-500/50 
                         shadow-[0_0_15px_rgba(139,92,246,0.5)] 
                         transition-all duration-300"
            />
          ))}

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 mb-5 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 
                       text-white placeholder-gray-300 border border-violet-400 
                       focus:outline-none focus:ring-4 focus:ring-violet-500/50 
                       shadow-[0_0_15px_rgba(139,92,246,0.5)] 
                       transition-all duration-300"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 rounded-lg font-bold text-lg text-white 
                       bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 
                       hover:from-violet-400 hover:to-blue-400 
                       shadow-[0_0_20px_rgba(139,92,246,0.8)] hover:shadow-[0_0_25px_rgba(139,92,246,1)] 
                       transition-all duration-300"
          >
            🚀 Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
