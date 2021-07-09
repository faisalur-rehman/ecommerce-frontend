import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <section className="side_bar">
        <div className="dashboard_buttons" id="change_active">
          <Link className="btn" id="dashboard">
            <span>Dashboard</span>
          </Link>
          <Link className="btn active">
            <span>Categories</span>
          </Link>
          <Link className="btn">
            <span>Products</span>
          </Link>
          <Link className="btn">
            <span>Orders</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SideBar;
