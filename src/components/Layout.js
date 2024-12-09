import React from "react";
import Header from "./Header";

const Layout = ({ pageTitle, breadcrumb, children }) => {
  return (
    <div className="layout">
      <Header title={pageTitle} breadcrumb={breadcrumb} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
