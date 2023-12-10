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
              <Link to="/get" className="link">GET</Link>
              <Link to="/getid" className="link">Get by Id</Link>
          </p>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/get" element={<GET />} />
          <Route path="/getid" element={<GETID />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

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
      {/* -------------
  Method GET all products
  -----------------*/}
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
      {/* -------------
  Method GET one product
  -----------------*/}
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
