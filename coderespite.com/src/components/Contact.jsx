import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, send data to backend)
    console.log(formData);
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md text-black"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md text-black"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
