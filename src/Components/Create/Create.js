
import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Context } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const { auth, user } = useContext(Context);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const storage = getStorage();
  const db = getFirestore();

  const handleSubmit = async () => {
    try {
      if (!image) {
        alert("Please upload an image");
        return;
      }
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
      history.push("/")
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
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;



