import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-16 left-4 z-50 p-2 bg-blue-600 text-white rounded-md focus:outline-none"
        aria-label="Toggle sidebar"
      >
        {isOpen ? 'Done Here?' : 'Menu'}
      </button>
      <nav
        className={`fixed top-16 left-0 h-full bg-white shadow-md p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
              }
              onClick={toggleSidebar}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
              }
              onClick={toggleSidebar}
            >
              Book Appointment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
              }
              onClick={toggleSidebar}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleSidebar}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserSidebar;
