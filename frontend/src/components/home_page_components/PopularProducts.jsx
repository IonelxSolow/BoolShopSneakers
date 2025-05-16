import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PopularProducts() {
  const [popularSneakers, setPopularSneakers] = useState({
    state: "loading",
  });
  useEffect(() => {
    fetch("http://localhost:3000/boolshop/api/v1/shoes/popular")
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
        console.error;
      });
  }, []);
  //grid display logic
  const [isPopularGrid, setIsPopularGrid] = useState(true);
  //carousel logic
  const [popularPage, setPopularPage] = useState(0);
  const itemsPerPage = 3;
  switch (popularSneakers.state) {
    case "loading":
      return (
        <h1>Loading...{/* Create a loader component to replace this */}</h1>
      );
    case "error":
      return (
        <>
          <h1>Error loading product</h1>
          <p>{product.message}</p>
        </>
      );
    case "success":
      //switch displayer on click
      function switchPopularDisplay() {
        setIsPopularGrid(!isPopularGrid);
      }

      const popularTotalPages = Math.ceil(
        popularSneakers.result.length / itemsPerPage
      );
      //move back and forward for popular items
      function nextPopularPage() {
        if (popularPage < popularTotalPages - 1) {
          setPopularPage((prev) => prev + 1);
        }
      }
      function prevPopularPage() {
        if (popularPage > 0) {
          setPopularPage((prev) => prev - 1);
        }
      }

      return (
        <>
          <section className="popular-displayer container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="fs-3 fs-md-2 fw-bold">Popular Items</h1>
              <button
                className="btn btn-home-light"
                onClick={switchPopularDisplay}
              >
                {isPopularGrid ? (
                  <i className="bi bi-list-task"></i>
                ) : (
                  <i className="bi bi-grid"></i>
                )}
              </button>
            </div>

            {isPopularGrid ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button
                    className="btn btn-home-light"
                    onClick={prevPopularPage}
                    disabled={popularPage === 0}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="btn btn-home-light"
                    onClick={nextPopularPage}
                    disabled={popularPage === popularTotalPages - 1}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className="row g-3">
                  {popularSneakers.result
                    .slice(
                      popularPage * itemsPerPage,
                      popularPage * itemsPerPage + itemsPerPage
                    )
                    .map((sneaker) => (
                      <div className="col-12 col-md-4" key={sneaker.id}>
                        <div className="card sneaker-card h-100 text-center">
                          <Link
                            to={`/product/${sneaker.name
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                            className="text-decoration-none text-dark"
                            style={{ display: "block" }}
                          >
                            <img
                              className=" img-fluid"
                              src={`/assets/${
                                JSON.parse(sneaker.image_urls)[0]
                              }`}
                              alt={sneaker.name}
                            />

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
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="list-group">
                {popularSneakers.result.map((sneaker) => (
                  <Link
                    className="list-group-item list-group-item-action mb-3 rounded shadow-sm hover-shadow"
                    key={sneaker.id}
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <div className="d-flex flex-column flex-md-row align-items-center">
                      <div className="col-md-3 text-center mb-3 mb-md-0">
                        <img
                          src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                          alt={sneaker.name}
                          className="img-fluid rounded"
                          style={{ maxWidth: "200px", height: "auto" }}
                        />
                      </div>
                      <div className="col-md-9">
                        <h4 className="mb-2 fw-bold">{sneaker.name}</h4>
                        <p className="text-muted mb-3">{sneaker.description}</p>
                        <div className="d-flex align-items-center">
                          {!sneaker.discounted_price ||
                          parseFloat(sneaker.discounted_price) >=
                            parseFloat(sneaker.price) ? (
                            <p className="mb-0 fs-5 fw-bold text-primary">
                              {parseFloat(sneaker.price).toFixed(2)}&euro;
                            </p>
                          ) : (
                            <div className="d-flex align-items-center gap-2">
                              <p className="mb-0 fs-5 fw-bold text-primary">
                                {parseFloat(sneaker.discounted_price).toFixed(2)}&euro;
                              </p>
                              <p className="mb-0 text-decoration-line-through text-muted">
                                {parseFloat(sneaker.price).toFixed(2)}&euro;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      );
  }
}
