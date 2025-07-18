import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav
      className={`fixed top-16 left-0 h-full bg-white shadow-md p-4 transform transition-transform duration-500 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}
      style={{
        transitionProperty: 'transform, box-shadow',
        boxShadow: isOpen ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none',
      }}
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
            to="/bookappointment"
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
  );
};

export default UserSidebar;
