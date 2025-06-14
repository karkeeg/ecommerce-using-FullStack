import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">
            BibekDev
          </h2>
          <p className="text-sm text-slate-300">
            Creating beautiful and functional web experiences. Specializing in
            React, Tailwind CSS, and modern frontend technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <a href="#" className="hover:text-indigo-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <FaEnvelope className="mt-1 text-indigo-400" />
              <span>support@bibekdevstore.com</span>
            </li>
            <li className="flex items-start gap-2">
              <FaPhoneAlt className="mt-1 text-indigo-400" />
              <span>+977 9860917585</span>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-indigo-400" />
              <span>Kathmandu, Nepal</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-slate-700 hover:bg-indigo-500 rounded-full transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-700 hover:bg-indigo-500 rounded-full transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-700 hover:bg-indigo-500 rounded-full transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-700 hover:bg-indigo-500 rounded-full transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 text-center text-sm text-slate-400 py-4">
        © {new Date().getFullYear()} BibekDev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
