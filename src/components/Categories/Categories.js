import React, { useEffect, useState } from "react";
import { formGetData } from "../../api/ApiRequests";
import SideBar from "../Sidebar/Sidebar";
import "./Categories.css";
import { Button } from "react-bootstrap";
import AddNew from "../Modals/AddNew";
import DeleteCategory from "../Modals/DeleteCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [addNewModal, setAddNewModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData("/categories");
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  function handleEditModal(id) {
    setId(id);
    setAddNewModal(true);
  }
  function handleDeleteModal(id) {
    setId(id);
    setDeleteCategory(true);
  }
  return (
    <>
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
                <th>Color</th>
                <th>Icon</th>
                <th>Name</th>
                <th></th>
              </tr>
              {categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.color}</td>
                    <td>{category.icon}</td>
                    <td>{category.name}</td>
                    <td className="text-center">
                      <i
                        className="fas fa-edit edit"
                        onClick={() => handleEditModal(category._id)}
                      ></i>
                      <i
                        className="fas fa-trash-alt delete"
                        onClick={() => handleDeleteModal(category._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddNew show={addNewModal} onHide={() => setAddNewModal(false)} id={id} />
      <DeleteCategory
        show={deleteCategory}
        onHide={() => setDeleteCategory(false)}
        id={id}
      />
    </>
  );
};

export default Categories;
