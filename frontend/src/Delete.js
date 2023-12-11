import { useState } from "react";

const DeleteProduct = () => {
  const [success, setSuccess] = useState(false);
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  const handleIdInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = () => {
    // Add your logic to fetch product details by ID from the backend
    fetch('http://127.0.0.1:4000/api/listProducts/' + productId)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
        setProductDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setProductDetails(null);
        setSuccess(false);
      });
  };

  const handleDeleteProduct = () => {
    fetch(`http://127.0.0.1:4000/api/deleteProduct/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product deleted successfully");
          setProductId(0);
          setSuccess(true);
        } else {
          console.error("Error deleting product");
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setSuccess(false);
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
        onChange={handleIdInputChange}
      />
      <button onClick={handleFetchProduct}>Fetch Product Details</button>

      {productDetails && (
        <div>
          <h2>Product Details</h2>
          <p>ID: {productDetails.id}</p>
          <p>Title: {productDetails.title}</p>
          {/* Add other details as needed */}
          <button onClick={handleDeleteProduct}>Delete Product</button>
        </div>
      )}
      {success ? "Deleted Product Successfully" : ""}
    </div>
  );
};

export default DeleteProduct;
