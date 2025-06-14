import React from "react";
import { FaCheckCircle, FaRocket, FaStore, FaUsers, FaHeart } from "react-icons/fa";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <h2 className="text-4xl font-extrabold text-center text-indigo-500 dark:text-indigo-400 mb-6">
          About Us
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-14">
          Welcome to <span className="font-semibold text-slate-900 dark:text-white">BibekDev Store</span>,
          your go-to destination for stylish, high-quality, and affordable
          products. We blend innovation, style, and convenience in every
          purchase.
        </p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Our Story */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <div className="flex items-center space-x-4 mb-4">
              <FaRocket className="text-indigo-500 text-2xl" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                Our Story
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Built by passionate developers, BibekDev Store serves modern
              shoppers with elegant UI and practical UX. We’re always evolving
              to bring you the latest trends in fashion, electronics, home
              goods, and more — all in one place.
            </p>
          </div>

          {/* Why Shop With Us */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <div className="flex items-center space-x-4 mb-4">
              <FaStore className="text-indigo-500 text-2xl" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                Why Shop With Us?
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Wide range of curated, trending products
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Fast, secure, and mobile-friendly checkout
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Trusted logistics and delivery partners
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Friendly & responsive customer support
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Smooth, elegant shopping experience
              </li>
            </ul>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-4 text-indigo-500">
            <FaUsers className="text-2xl" />
            <h4 className="text-xl font-bold">Our Vision</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-md">
            We aim to empower customers with access to top-quality products and
            a seamless digital shopping experience — backed by innovation,
            transparency, and a passion for excellence.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-4 text-pink-500">
            <FaHeart className="text-2xl" />
            <h4 className="text-xl font-bold">Our Core Values</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 text-left mt-4 text-gray-600 dark:text-gray-300">
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-white mb-2">Customer First</h5>
              <p>We prioritize your satisfaction and strive to exceed expectations with every product.</p>
            </div>
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-white mb-2">Transparency</h5>
              <p>Clear communication and trust-building practices drive everything we do.</p>
            </div>
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-white mb-2">Innovation</h5>
              <p>We embrace technology to deliver the best digital shopping experience possible.</p>
            </div>
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-white mb-2">Sustainability</h5>
              <p>We support ethical sourcing and eco-friendly operations whenever possible.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
