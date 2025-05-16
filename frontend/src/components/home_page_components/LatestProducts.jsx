import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LatestProducts() {
  const [newestSneakers, setNewestSneakers] = useState({
    state: "loading",
  });
  useEffect(() => {
    fetch("http://localhost:3000/boolshop/api/v1/shoes/new")
      .then((res) => res.json())
      .then((data) => {
        setNewestSneakers({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setNewestSneakers({
          state: "error",
          message: err.message,
        });
        console.error;
      });
  }, []);
  //grid display logic
  const [isNewestGrid, setIsNewestGrid] = useState(true);
  //carousel logic
  const [newestPage, setNewestPage] = useState(0);
  const itemsPerPage = 3;

  switch (newestSneakers.state) {
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
      //switch display on click
      function switchNewestDisplay() {
        setIsNewestGrid(!isNewestGrid);
      }
      const newestTotalPages = Math.ceil(newestSneakers.result.length / itemsPerPage);
      //move back and forward for latest items
      function nextNewestPage() {
        if (newestPage < newestTotalPages - 1) {
          setNewestPage((prev) => prev + 1);
        }
      }
      function prevNewestPage() {
        if (newestPage > 0) {
          setNewestPage((prev) => prev - 1);
        }
      }

      return (
        <>

          <section className="newest-displayer container">
            <div class="line-wrapper mb-4">
              <div class="line"></div>
              <h1 className="fs-3 fs-md-2 fw-bold">Newest Drops</h1>
              <div class="line"></div>
            </div>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <button
                className="btn btn-main-light"
                onClick={switchNewestDisplay}
              >
                {isNewestGrid ? (
                  <i className="bi bi-list-task"></i>
                ) : (
                  <i className="bi bi-grid"></i>
                )}
              </button>
            </div>
            {isNewestGrid ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button
                    className="btn btn-main-light"
                    onClick={prevNewestPage}
                    disabled={newestPage === 0}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="btn btn-main-light"
                    onClick={nextNewestPage}
                    disabled={newestPage === newestTotalPages - 1}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
                <div className="row g-3">
                  {newestSneakers.result
                    .slice(
                      newestPage * itemsPerPage,
                      newestPage * itemsPerPage + itemsPerPage
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
                              src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                              alt={sneaker.name}
                            />

                            {!sneaker.discounted_price ||
                              parseFloat(sneaker.discounted_price) >=
                              parseFloat(sneaker.price) ? (
                              <p className="price-tag">
                                {parseFloat(sneaker.price).toFixed(2)}$
                              </p>
                            ) : (
                              <p className="price-tag">
                                {parseFloat(sneaker.discounted_price).toFixed(2)}$
                                <span className="text-decoration-line-through text-danger ms-2">
                                  {parseFloat(sneaker.price).toFixed(2)}$
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
                {newestSneakers.result.map((sneaker) => (
                  <Link
                    className="list-card m-auto"
                    key={sneaker.id}
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}>
                    <img
                      src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                      className="img-fluid"
                      alt="Sneaker"
                    />
                    <div className="listcard-content">
                      <h2 className="listcard-title">{sneaker.name}</h2>
                      <div className="price-section">
                        {!sneaker.discounted_price ||
                          parseFloat(sneaker.discounted_price) >=
                          parseFloat(sneaker.price) ? (
                          <span className="text-dark">{sneaker.price}&euro;</span>
                        ) : (
                          <>
                            <span className="original-price">{sneaker.price}&euro;</span>
                            <span className="discount-price">{parseFloat(sneaker.discounted_price).toFixed(2)}$&euro;</span>
                          </>
                        )}
                        <p className="description">{sneaker.description}</p>
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
