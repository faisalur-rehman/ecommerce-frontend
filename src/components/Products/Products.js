import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/Sidebar";
import { Button } from "react-bootstrap";
import { formGetData } from "../../api/ApiRequests";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { payload },
        } = await formGetData("/products");
        setProducts(payload);
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
        <div className="add-new">
          <Button variant="primary" className="my-3">
            Add New
          </Button>
        </div>
        {/* <div className="totalOrders">
          <p>Total Orders: {orders.length}</p>
          <p>Your orders Count: {userOrders.length}</p>
        </div> */}
        <table>
          <tbody>
            <tr>
              <th>Brand</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  key={product._id}
                  // onClick={() => handleOrder(order._id, order.status)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>${product.price}</td>
                  <td>{product.rating} Star</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
