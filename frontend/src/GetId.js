import { useState, useEffect } from "react";

const GETID = () => {
  const [oneProduct, setOneProduct] = useState([]);
  function getOneProduct(id) {
    console.log(id);
    fetch("http://127.0.0.1:4000/api/listProducts/" + id)
    .then((response) => response.json())
    .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        setOneProduct([data]);
    });
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
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {oneProduct.map((el) => (
                <div className="col" key={el.id}>
                  <div className="card shadow-sm">
                    <div className="internal-product-image">
                      <img
                        src={el.image}
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="100%"
                        alt="Product"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{el.title}</h5>
                      <p className="card-text">
                        Id: {el.id} <br />
                        Category: {el.category} <br />
                        Price: ${el.price} <br />
                        Rating: {el.rating}★<br />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GETID;
