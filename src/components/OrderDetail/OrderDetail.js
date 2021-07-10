import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formGetData } from "../../api/ApiRequests";
import "./OrderDetail.css";
import SideBar from "../Sidebar/Sidebar";
import DeleteCategory from "../Modals/DeleteCategory";

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const location = useLocation();
  const [deleteOrder, setDeleteOrder] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/orders/${location.state.data.id}`,
          localStorage.getItem("token")
        );
        setOrderDetail(data.payload);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(orderDetail);

  return (
    <div>
      <div className="categories">
        <div>
          <SideBar />
        </div>
        <div className="category-listing">
          <table>
            <tbody>
              <tr>
                <th>Date Ordered</th>
                <th>Status</th>
                <th>Price</th>
                <th>Ordered By</th>
                <th>Ordered Item</th>
              </tr>

              <tr>
                <td>{new Date(orderDetail.dateOrdered).toDateString()}</td>
                <td>{orderDetail.status}</td>
                <td>${orderDetail.totalPrice}</td>
                <td>{orderDetail.user ? orderDetail.user.name : "null"}</td>
                <td>
                  {orderDetail.orderItems && (
                    <ol>
                      {orderDetail.orderItems.map((item) => (
                        <li key={item}>{item.product.richDescription}</li>
                      ))}
                    </ol>
                  )}
                </td>
                <td className="text-center">
                  <i
                    className="fas fa-edit edit"
                    // onClick={() => handleEditModal(category._id)}
                  ></i>
                  <i
                    className="fas fa-trash-alt delete"
                    onClick={() => setDeleteOrder(true)}
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <DeleteCategory
        show={deleteOrder}
        onHide={() => setDeleteOrder(false)}
        id={location.state.data.id}
        endpoint="orders"
      />
    </div>
  );
};

export default OrderDetail;
