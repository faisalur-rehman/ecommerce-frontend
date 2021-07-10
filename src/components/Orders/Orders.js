import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import { formGetData } from "../../api/ApiRequests";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { payload },
        } = await formGetData("/orders");
        setOrders(payload);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  function handleOrder(id, status) {
    console.log(id, status);
    history.push({
      pathname: `/order-details`,
      state: { data: { id, status } },
    });
  }

  console.log(orders);
  return (
    <div className="categories">
      <div>
        <SideBar />
      </div>
      <div className="category-listing">
        <div className="add-new">
          <Button variant="primary" className="my-3">
            Add New
          </Button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Date Ordered</th>
              <th>Status</th>
              <th>Price</th>
              <th>Ordered By</th>
              <th>Ordered Item</th>
            </tr>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleOrder(order._id, order.status)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.dateOrdered}</td>
                  <td>{order.status}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.user ? order.user._id : "null"}</td>
                  <ol>
                    {order.orderItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  {/* <td className="text-center">
                    <i
                      className="fas fa-edit edit"
                      // onClick={() => handleEditModal(category._id)}
                    ></i>
                    <i
                      className="fas fa-trash-alt delete"
                      // onClick={() => handleDeleteModal(category._id)}
                    ></i>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
