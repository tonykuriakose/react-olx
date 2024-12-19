import React from "react";
import { useLocation } from "react-router-dom";
import "./View.css";

function View() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>
            {product.createdAt
              ? new Date(product.createdAt.seconds * 1000).toDateString()
              : "N/A"}
          </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{product.sellerName || "No name"}</p>
          <p>{product.sellerContact || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
