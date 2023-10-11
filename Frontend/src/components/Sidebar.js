import React from 'react';

const Sidebar = () => {
  return (
    <div class=" my-4">
    <div className="bg-dark text-light sidebar">
      <div className="logo">
        <i className="bi bi-house-door"></i>
        <span>My Sidebar</span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <i className="bi bi-person"></i> Profile
        </li>
        <li className="nav-item">
          <i className="bi bi-gear"></i> Settings
        </li>
        <li className="nav-item">
          <i className="bi bi-box-arrow-left"></i> Logout
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
