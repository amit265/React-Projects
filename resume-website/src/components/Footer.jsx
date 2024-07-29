import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}

export default Footer;
