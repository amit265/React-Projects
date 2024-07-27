// Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="w-10/12 sm:w-8/12 mx-auto p-8 bg-white dark:bg-gray-800 m-4">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Us
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        If you have any questions, comments, or concerns, we would love to hear
        from you. You can reach us through the following contact information:
      </p>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
          Email:
        </h3>
        <p className="text-gray-700 dark:text-gray-400">
          support@swiggyclone.com
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
          Phone:
        </h3>
        <p className="text-gray-700 dark:text-gray-400">+1 234 567 890</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
          Address:
        </h3>
        <p className="text-gray-700 dark:text-gray-400">
          123 Swiggy Street, Food City, FC 12345
        </p>
      </div>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        Or, you can fill out our contact form below, and we'll get back to you
        as soon as possible.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-900 dark:text-white"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-gray-900 dark:text-white"
          >
            Message:
          </label>
          <textarea
            id="message"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
