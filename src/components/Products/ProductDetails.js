import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formGetData } from "../../api/ApiRequests";
// import "./OrderDetail.css";
import SideBar from "../Sidebar/Sidebar";
import DeleteCategory from "../Modals/DeleteCategory";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const location = useLocation();
  const [deleteOrder, setDeleteOrder] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/products/${location.state.data.id}`,
          localStorage.getItem("token")
        );
        setProductDetail(data.payload);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(productDetail);

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
                <th>Brand</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
              </tr>

              <tr
                //   onClick={() => handleProduct(product._id)}
                style={{ cursor: "pointer" }}
              >
                <td>{productDetail.brand}</td>
                <td>{productDetail.name}</td>
                <td>{productDetail.category && productDetail.category.name}</td>
                <td>${productDetail.price}</td>
                <td>{productDetail.rating} Star</td>
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

export default ProductDetail;
