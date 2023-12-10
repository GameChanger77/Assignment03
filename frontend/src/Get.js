import { useState, useEffect } from "react";

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
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {product.map((el) => (
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
                      Rating: {el.rating}⭐<br />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default GET;