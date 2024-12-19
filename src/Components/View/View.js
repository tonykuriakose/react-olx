import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import "./View.css";

function View() {
  const location = useLocation();
  const history = useHistory();
  const product = location.state?.product;

  const [editedProduct, setEditedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
  });

  if (!product) {
    return <p>No product details available.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        name: editedProduct.name,
        price: editedProduct.price,
      });
      alert("Product updated successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const productRef = doc(db, "products", product.id);
      await deleteDoc(productRef);
      alert("Product deleted successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="crudSection">
        <div className="crudTitle">
          <h2>Edit Product</h2>
        </div>

        <div className="crudForm">
          <div className="inputGroup">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="inputGroup">
            <label>Price (&#x20B9;)</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>

          <div className="crudButtons">
            <button className="updateBtn" onClick={handleUpdate}>
              Update Product
            </button>
            <button className="deleteBtn" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
