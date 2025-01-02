import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./View.css";

function View() {
  const location = useLocation();
  const history = useHistory();
  const product = location.state?.product;

  const [editedProduct, setEditedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
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

  const validateProduct = () => {
    let valid = true;
    const newErrors = { name: "", price: "" };

    if (!editedProduct.name.trim()) {
      newErrors.name = "Product name is required.";
      valid = false;
    }

    if (!editedProduct.price || editedProduct.price <= 0) {
      newErrors.price = "Price must be a positive number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUpdate = async () => {
    if (!validateProduct()) {
      return;
    }

    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        name: editedProduct.name,
        price: editedProduct.price,
      });
      toast.success("Product updated successfully!"); // Show success toast
      history.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product."); // Show error toast
    }
  };

  const handleDelete = async () => {
    try {
      const productRef = doc(db, "products", product.id);
      await deleteDoc(productRef);
      toast.success("Product deleted successfully!"); // Show success toast
      history.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product."); // Show error toast
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
              className={errors.name ? "error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="inputGroup">
            <label>Price (&#x20B9;)</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className={errors.price ? "error" : ""}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
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

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

export default View;

