import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <section className="side_bar">
        <div className="dashboard_buttons" id="change_active">
          <Link className="types" id="dashboard">
            <span>Dashboard</span>
          </Link>
          <Link className="types" to="/categories">
            <span>Categories</span>
          </Link>
          <Link className="types" to="/products">
            <span>Products</span>
          </Link>
          <Link className="types" to="/orders">
            <span>Orders</span>
          </Link>
          <Link className="types" to="/customers">
            <span>Customers</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SideBar;
