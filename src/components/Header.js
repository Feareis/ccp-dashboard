import React from "react";
import "./css/Header.css";

const Header = ({ title, breadcrumb }) => {
  return (
    <div className="header">
      <div className="breadcrumb">{breadcrumb}</div>
      <div className="header-content">
        <h1>{title}</h1>
        <div className="header-actions">
          <input type="text" className="search-input" placeholder="Search here" />
        </div>
      </div>
    </div>
  );
};

export default Header;
