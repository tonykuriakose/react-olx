import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Heart from "../../assets/Heart";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Post.css"; 

function Posts() {
  const db = getFirestore();
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]);

  const handleImageClick = (product) => {
    history.push("/view", { product });
  };

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Quick Menu</h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-header text-end">
                <Heart />
              </div>
              <div
                className="card-img-top text-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleImageClick(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="img-fluid"
                  style={{ maxHeight: "150px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">&#x20B9; {product.price}</h5>
                <p className="card-text text-muted mb-1">{product.category}</p>
                <p className="card-text">{product.name}</p>
              </div>
              <div className="card-footer text-end text-muted">
                {product.createdAt
                  ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;



