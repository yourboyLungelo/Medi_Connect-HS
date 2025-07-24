import React from "react";

const Header = ({ toggleSidebar, isAdmin = false }) => {
  const role = localStorage.getItem("role") || "";
  const idNumber = localStorage.getItem("idNumber") || "";

  const handleHomeClick = () => {
    if (role === "doctor") {
      window.location.href = "/doctorDashboard";
    } else if (role === "nurse") {
      window.location.href = "/nurseDashboard";
    } else if (role === "admin") {
      window.location.href = "/adminDashboard";
    } else if(role === "patient" && idNumber){
      window.location.href = "/dashboard";
    }else{
      //alert("Access Denied: Invalid role");
    }
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleSidebar} title="Toggle Sidebar">
          <img src="/logo.png" alt="Medi_Connect Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold"> Medi_Connect Healthcare System</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={handleHomeClick}
                className="rounded-md text-white bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-700 transition shadow"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = "/admin-login"}
                className="rounded-md text-white bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-700 transition shadow"
              >
                Admin Login
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = "/"}
                className="rounded-md text-white bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-700 transition shadow"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
