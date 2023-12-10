import { useState, useEffect } from "react";

const UpdateProduct = () => {
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
      id: 0,
      title: "",
      category: "",
      price: 0,
      rating: 0,
    });
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Convert values to integers for specific fields
        const parsedValue = name === 'id' || name === 'price' || name === 'rating'
          ? parseInt(value, 10)
          : value;
      
        setFormData({
          ...formData,
          [name]: parsedValue,
        });
      };
      
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
      
        try {
          const response = await fetch("http://localhost:4000/api/updateProduct/" + formData.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            console.log("Product updated successfully");
            setFormData({
                id: 0,
                title: "",
                category: "",
                price: 0,
                rating: 0,
              })
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Id of Product to Update:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />

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

        {success ? "Product updated successfully" : ""}
      </div>
    );
  };

  
export default UpdateProduct;