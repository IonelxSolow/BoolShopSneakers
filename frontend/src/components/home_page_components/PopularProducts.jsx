import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

export default function PopularProducts() {
  const [popularSneakers, setPopularSneakers] = useState({
    state: "loading",
  });
  useEffect(() => {
    fetch(`${API_URL}/boolshop/api/v1/shoes/popular`)
      .then((res) => res.json())
      .then((data) => {
        setPopularSneakers({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setPopularSneakers({
          state: "error",
          message: err.message,
        });
      });
  }, []);

  switch (popularSneakers.state) {
    case "loading":
      return <h1>Loading...</h1>;

    case "error":
      return (
        <>
          <h1>Error loading product</h1>
          <p>{popularSneakers.message}</p>
        </>
      );

    case "success":
      return (
        <section className="popular-displayer container my-5">
          <div className="row g-4">
            {popularSneakers.result.slice(2, 6).map((sneaker, index) => (
              <div className="col-12 mt-0 col-md-3" key={sneaker.id}>
                <div className="position-relative  popular-card">
                  {!sneaker.discounted_price ||
                    parseFloat(sneaker.discounted_price) >=
                    parseFloat(sneaker.price) ? (
                    <p className="price-tag">
                      {parseFloat(sneaker.price).toFixed(2)}&euro;
                    </p>
                  ) : (
                    <p className="price-tag">
                      {parseFloat(sneaker.discounted_price).toFixed(
                        2
                      )}
                      &euro;
                      <span className="text-decoration-line-through text-danger ms-2">
                        {parseFloat(sneaker.price).toFixed(2)}&euro;
                      </span>
                    </p>
                  )}
                  <Link
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="text-decoration image-container text-dark"
                    style={{ display: "block" }}
                  >
                    <img
                      className="card-img-top img-fluid"
                      src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                      alt={sneaker.name}
                    />

                    <div className="pt-3 px-3">
                      {sneaker.brand === "New Balance" ? (
                        <h5 className="card-title fw-bold"> #{index + 2} {sneaker.name}</h5>
                      ) : (
                        <h5 className="card-title fw-bold">
                          #{index + 2} {sneaker.brand} {sneaker.name}
                        </h5>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
  }
}
