import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Context } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const storage = getStorage();
  const db = getFirestore();

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Product name is required.";
    if (!category.trim()) errors.category = "Category is required.";
    if (!price || price <= 0) errors.price = "Price must be a positive number.";
    if (!image) errors.image = "Product image is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const imageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded at:", imageUrl);

      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: new Date(),
      });

      history.push("/");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="Name"
            placeholder="Enter product name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="Category"
            placeholder="Enter product category"
          />
          {errors.category && <span className="error">{errors.category}</span>}
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="Price"
            placeholder="Enter product price"
          />
          {errors.price && <span className="error">{errors.price}</span>}
          <br />
        </form>
        <br />
        {image && (
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        <br />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
        />
        {errors.image && <span className="error">{errors.image}</span>}
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;

