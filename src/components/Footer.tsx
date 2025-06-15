import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 p-4 mt-auto shadow-inner">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Medi_Connect Healthcare System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
