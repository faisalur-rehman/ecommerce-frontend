import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import { formGetData } from "../../api/ApiRequests";

const Customers = () => {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData("/users/get/count");
        console.log(data);
        setUserCount(data.userCount);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="categories">
      <div>
        <SideBar />
      </div>
      <div className="category-listing">
        <div className="totalOrders">
          <p>User Count: {userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Customers;
