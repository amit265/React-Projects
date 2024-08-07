import React, { useState } from "react";
import emailjs from "emailjs-com";
const your_template_id = "template_qywkcyc";
const your_service_id = "service_yadn6hp";
const your_user_id = "4-5pbKubOcqAtgnHH";
const auto_reply_template_id = "template_pq1ubft"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [statusMessage, setStatusMessage] = useState("");
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(your_service_id, your_template_id, e.target, your_user_id)
    .then((result) => {
      // console.log(result.text);
      setStatusMessage("Message sent successfully!", result); // Set success message
      
      // Send auto-reply email
      emailjs.send(your_service_id, auto_reply_template_id, {
        to_email: formData.email,
        name: formData.name,
        message: formData.message
      }, your_user_id)
      .then((result) => {
        // console.log(result.text);
      }, (error) => {
        // console.log(error.text);
      });

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }, (error) => {
      // console.log(error.text);
      setStatusMessage("Error sending message. Please try again.", error); // Set error message
    });

  };


  return (
    <section className="py-12 text-[var(--text-color)]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl text-[var(--primary-color)] font-bold mb-6 lexend">Contact Us</h2>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4 text-[var(--background-color)]">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md "
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 text-[var(--background-color)]">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 text-[var(--background-color)]">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
          >
            Send Message
          </button>
        </form>
        {statusMessage && (
          <div className={`mt-4 p-4 max-w-xl mx-auto rounded-md ${statusMessage.includes("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
