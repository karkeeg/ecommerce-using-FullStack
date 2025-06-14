import React from "react";

const ServicesPage = () => {
  return (
    <div className="bg-slate-100 text-slate-800 py-12 px-4 md:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
          Our Services
        </h2>
        <p className="text-lg mb-10">
          We go beyond just products. Our services are designed to enhance your
          shopping experience and bring value at every step.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Personal Shopping Assistance
            </h3>
            <p>
              Need help choosing the right product? Our team provides live chat
              guidance and email consultations to help you decide.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Fast & Reliable Delivery
            </h3>
            <p>
              We’ve partnered with trusted couriers to ensure fast and reliable
              delivery across regions. Track your order in real-time.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Easy Returns & Support
            </h3>
            <p>
              Not happy with your purchase? Use our no-hassle return system and
              get full assistance from our responsive support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
