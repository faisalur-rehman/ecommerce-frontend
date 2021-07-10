import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/Sidebar";
import { Button } from "react-bootstrap";
import { formGetData } from "../../api/ApiRequests";
import { useHistory } from "react-router-dom";
import NewProduct from "../Modals/NewProduct";

const Products = () => {
  const history = useHistory();
  const [newProduct, setNewProduct] = useState(false);

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

  function handleProduct(id) {
    history.push({
      pathname: `/product-details`,
      state: { data: { id } },
    });
  }

  return (
    <div className="categories">
      <div>
        <SideBar />
      </div>
      <div className="category-listing">
        <div className="add-new">
          <Button
            variant="primary"
            className="my-3"
            onClick={() => setNewProduct(true)}
          >
            Add New
          </Button>
        </div>

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
                  onClick={() => handleProduct(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>{product.category && product.category.name}</td>
                  <td>${product.price}</td>
                  <td>{product.rating} Star</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <NewProduct show={newProduct} onHide={() => setNewProduct(false)} />
    </div>
  );
};

export default Products;
