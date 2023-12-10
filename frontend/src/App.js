import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GET from "./Get";
import GETID from "./GetId";
import CreateProduct from "./Create";
import DeleteProduct from "./Delete";
import UpdateProduct from "./Update";
import About from "./About";
import bootstrap from "bootstrap";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <p>
            <Link to="/get" className="link">
              Get Product
            </Link>
            <Link to="/getid" className="link">
              Get by Id
            </Link>
            <Link to="/createProduct" className="link">
              Create Product
            </Link>
            <Link to="/updateProductid" className="link">
              Update Product
            </Link>
            <Link to="/deleteProductid" className="link">
              Delete Product
            </Link>
            <Link to="/about" className="link">
              About
            </Link>
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

export default App;
