import { useState } from "react";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = () => {
    // Add your logic to fetch product details by ID from the backend
    fetch("http://127.0.0.1:4000/api/listProducts/" + productId)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
        setProductDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setProductDetails(null);
      });
  };

  const handleDeleteProduct = () => {
    // Add your logic to delete the product by ID from the backend
    fetch(`http://127.0.0.1:4000/api/deleteProduct/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product deleted successfully");
          // Optionally, you can reset the form or perform other actions
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <h1>Delete Product</h1>
      <label htmlFor="productId">Product ID:</label>
      <input
        type="text"
        id="productId"
        name="productId"
        value={productId}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchProduct}>Fetch Product Details</button>

      {productDetails && (
        <div>
          <h2>Product Details</h2>
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="card shadow-sm">
                  <div className="internal-product-image">
                    <img
                      src={productDetails.image}
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="100%"
                      alt="Product"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{productDetails.title}</h5>
                    <p className="card-text">
                      Id: {productDetails.id} <br />
                      Category: {productDetails.category} <br />
                      Price: ${productDetails.price} <br />
                      Rating: {productDetails.rating}⭐<br />
                    </p>
                    <button onClick={handleDeleteProduct}>Delete Product</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
