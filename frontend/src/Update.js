import { useState, useEffect } from "react";

const UpdateProduct = () => {
  const [success, setSuccess] = useState(false);
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [formData, setFormData] = useState({
    id: productId,
    title: "",
    category: "",
    price: 0,
    rating: 0,
  });

  const handleIdInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert values to integers for specific fields
    const parsedValue =
      name === "id" || name === "price" || name === "rating"
        ? parseInt(value, 10)
        : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };
  

  const handleFetchProduct = () => {
    fetch("http://127.0.0.1:4000/api/listProducts/" + productId)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
        ...formData,
        ["id"]: Number(productDetails.id),
      });
    console.log("Form data submitted:", formData);

    try {
      const response = await fetch(
        "http://localhost:4000/api/updateProduct/" + productId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            ["id"]: Number(productDetails.id),
          }),
        }
      );

      if (response.ok) {
        console.log("Product updated successfully");
        setFormData({
          id: 0,
          title: "",
          category: "",
          price: 0,
          rating: 0,
        });
        setSuccess(true);
      } else {
        console.error("Failed to update product:", response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
  
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
          {/* <button onClick={}>Delete Product</button> */}
  
          <form onSubmit={handleSubmit}>
            {/* <label htmlFor="id">Id of Product to Update:</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            /> */}
  
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
  
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
  
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
  
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
            />
  
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
  
      {success ? (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
  
      }
export default UpdateProduct;
