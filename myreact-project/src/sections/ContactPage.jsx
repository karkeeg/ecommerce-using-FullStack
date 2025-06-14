import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactPage = () => {
  return (
    <section className="bg-slate-100 py-12 px-6 text-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
          Get in Touch
        </h2>
        <p className="mb-10 text-lg">
          We'd love to hear from you. Feel free to reach out using any of the
          contact details below.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <FiMail className="text-indigo-500 text-3xl mb-2" />
            <p>support@bibekdevstore.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FiPhone className="text-indigo-500 text-3xl mb-2" />
            <p>+977 9860917585</p>
          </div>
          <div className="flex flex-col items-center">
            <FiMapPin className="text-indigo-500 text-3xl mb-2" />
            <p>Kathmandu, Nepal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
