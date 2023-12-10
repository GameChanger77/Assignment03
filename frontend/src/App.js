import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <p>
              <Link to="/get" className="link">Get Product</Link>
              <Link to="/getid" className="link">Get by Id</Link>
              <Link to="/createProduct" className="link">Create Product</Link>
              <Link to="/updateProductid" className="link">Update Product</Link>
              <Link to="/deleteProductid" className="link">Delete Product</Link>
              <Link to="/about" className="link">About</Link>
          </p>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/get" element={<GET />} />
          <Route path="/getid" element={<GETID />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/updateProductid" element={<UpdateProduct />} />
          <Route path="/deleteProductid" element={<DeleteProduct />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

const GET = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://127.0.0.1:4000/api/listProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }
  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Id: {el.id} <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating :{el.rating} <br />
    </div>
  ));
  return (
    <div>
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show all available Products.</h3>
        <div>Products {showAllItems}</div>
      </div>
    </div>
  );
};

const GETID = () => {
  const [oneProduct, setOneProduct] = useState([]);
  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://127.0.0.1:4000/api/listProducts/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct([data]);
        });
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Id : {el.id} <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));
  return (
    <div>
      <h1>Show one Product by Id </h1>
      <div>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        <div>{showOneItem}</div>
      </div>
    </div>
  );
};

const UpdateProduct = () => {
  return (
    <div>
      <h1>Update Product</h1>
      <h1>Update Product</h1>
      <h1>Update Product</h1>
    </div>
  );
};

const DeleteProduct = () => {
  return (
    <div>
      <h1>Delete Product</h1>
      <h1>Delete Product</h1>
      <h1>Delete Product</h1>
    </div>
  );
}

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to send the form data to the backend API for product creation
    console.log("Form data submitted:", formData);
    // You can use fetch or a library like axios to send a POST request to your API
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
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
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />

        {/* Add other form fields as needed */}
        
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>InSert Student information here lol</h1>
      <h1>InSert Student information here lol</h1>
      <h1>InSert Student information here lol</h1>
    </div>
  )
}

export default App;
