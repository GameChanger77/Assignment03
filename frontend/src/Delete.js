import { useState } from "react";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = () => {
    // Add your logic to fetch product details by ID from the backend
    fetch(`http://127.0.0.1:4000/api/listProducts/${productId}`)
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
          <p>ID: {productDetails.id}</p>
          <p>Title: {productDetails.title}</p>
          {/* Add other details as needed */}
          <button onClick={handleDeleteProduct}>Delete Product</button>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
