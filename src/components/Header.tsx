import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"> Medi_Connect Healthcare System</h1>
        <nav>
          <ul className="flex space-x-4">
            
            <li><a href="/dashboard" className="hover:underline">Home</a></li>
            <li><a href="/admin-login" className="hover:underline">Admin Login</a></li>
            <li><a href="/" className="hover:underline">Log Out</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
