import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="w-64 h-full bg-white shadow-md p-4">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
            }
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
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className="text-gray-700 hover:text-blue-600"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
