import React, { useState, useRef } from "react";
import axios from "axios";
import bg from "../assets/images/bg.svg";
import contactbg from "../assets/images/contact.jpg";
import API from "../api";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const captcha = import.meta.env.VITE_API_CAPTCHA_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const recaptchaRef = useRef(null); // ✅ Fixed ref name
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, token) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/contact", {
        ...formData,
        recaptchaValue: token,
      });
      if (res?.status === 200) {
        toast.success("Message sent successfully!");
      }
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error sending message:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    id="contact"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 50%, rgba(70,15,158,0.9) 100%), url(${contactbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-screen  relative text-white px-2 md:px-20 py-12 flex flex-col"
    >
      <img
        src={contactbg}
        className="object-cover absolute top-0 left-0 opacity-30 h-full w-full"
        alt=""
      />
      {/* Top Heading */}
      <div className="text-center mb-5 animate-fadeIn">
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }}
          className="text-5xl font-extrabold drop-shadow-lg"
        >
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Have questions or feedback? Let’s talk! Our team is here to help you
          get the most out of TestCaseGenerator.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col justify-center items-center md:flex-row gap-12 flex-1">
        {/* Left Info */}
        <div className="md:w-1/2 flex h-full items-center justify-center animate-slideInLeft">
          <div className="md:w-[80%] w-full h-[80vh] p-8 md:p-12 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-3xl border border-white/20 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Why Reach Out?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Whether you need help setting up, have feature requests, or just
              want to share how TestCaseGenerator helped your team — we’d love
              to hear from you. We believe in building strong relationships
              with our users to make our tools better for everyone.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 text-2xl">📩</span>
                <span>Get quick responses from our support team</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 text-2xl">💡</span>
                <span>Share feedback to improve our product</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 text-2xl">🤝</span>
                <span>Collaborate on custom solutions tailored to your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 text-2xl">🚀</span>
                <span>Learn best practices to get the most from our platform</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 flex h-full items-center justify-center animate-slideInRight">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = await recaptchaRef.current.executeAsync();
                recaptchaRef.current.reset();
                await handleSubmit(e, token);
              } catch (err) {
                toast.error("reCAPTCHA verification failed");
              }
            }}
            className="md:w-[80%] w-full p-8 md:p-12 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-3xl border border-white/20 transform transition-all duration-500 hover:scale-105"
          >
            <h2 className="text-3xl text-left font-extrabold text-white mb-4">
              Send Us a Message
            </h2>

            {["name", "email", "contact"].map((field, idx) => (
              <div key={idx}>
                <label>{field.toUpperCase()}</label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "contact"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  placeholder={`Your ${field.charAt(0) + field.slice(1)}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 mb-5 rounded-lg text-white placeholder-gray-300 border border-white/30 bg-white/5 backdrop-blur-xl transition-all duration-300"
                />
              </div>
            ))}

            <label>Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 mb-5 rounded-lg bg-white/5 backdrop-blur-xl text-white placeholder-gray-300 border border-white/30 transition-all duration-300"
            ></textarea>

            <ReCAPTCHA
              sitekey={captcha}
              size="invisible"
              badge="bottomright"
              ref={recaptchaRef} 
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 cursor-pointer rounded-lg font-semibold text-white bg-violet-700 shadow-xs hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
