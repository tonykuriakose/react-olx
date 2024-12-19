import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Heart from "../../assets/Heart";
import "./Post.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image" onClick={() => handleImageClick(product)}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>
                  {product.createdAt
                    ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;


