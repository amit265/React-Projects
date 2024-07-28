import React from "react";

const Modal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-indigo-700/90 text-center p-5 h-96 lg:w-[500px] rounded shadow-md">
        {/* modal content */}
        <h2 className="text-xl font-semibold mb-4 mt-6 uppercase">
          Please login here
        </h2>
        <form action="" className="px-4">
          <div className="mb-5">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="test@gmail.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6b7380] outline-none focus:border-[#6a64f1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="your password"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6b7380] outline-none focus:border-[#6a64f1] focus:shadow-md"
            />
          </div>
          <div>
            <button className="hover:shadow-md rounded-md bg-[#6a64f1] hover:bg-orange-600 py-3 px-8 text-base font-semibold text-white outline-none">
              Login
            </button>
          </div>
        </form>

        {/* modal close */}
        <button
          onClick={onClose}
          className="my-5 hover:shadow-md rounded-md bg-[#575557] hover:bg-orange-600 py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
