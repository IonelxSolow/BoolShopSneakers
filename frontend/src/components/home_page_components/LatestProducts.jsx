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
      const newestTotalPages = Math.ceil(
        newestSneakers.result.length / itemsPerPage
      );
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
          <section className="newest-displayer container py-5">

            {isNewestGrid ? (
              <div className="row align-items-center h-100">
                {/* Sinistra: Titolo e frecce */}
                <div className="col-12 col-md-4 d-flex flex-column justify-content-between h-100">
                  <div className="superbold-title mb-4">
                    <span className="d-block newest-superbold">NEWEST</span>
                    <span className="d-block newest-superbold">DROPS</span>
                  </div>
                  <div className="carousel-controls-horizontal d-flex flex-row gap-3 mt-4">
                    <button
                      className="carousel-btn-custom d-flex align-items-center justify-content-center"
                      onClick={prevNewestPage}
                      disabled={newestPage === 0}
                      aria-label="Precedente"
                    >
                      <i className="bi bi-chevron-left d-flex"></i>
                    </button>
                    <button
                      className="carousel-btn-custom d-flex align-items-center justify-content-center"
                      onClick={nextNewestPage}
                      disabled={newestPage === newestTotalPages - 1}
                      aria-label="Successivo"
                    >
                      <i className="bi bi-chevron-right d-flex"></i>
                    </button>
                  </div>
                </div>
                {/* Destra: Prodotti */}
                <div className="col-12 col-md-8 d-flex justify-content-center gap-4">
                  {newestSneakers.result
                    .slice(newestPage * 2, newestPage * 2 + 2)
                    .map((sneaker) => (
                      <div
                        className="card sneaker-card-big text-center"
                        key={sneaker.id}
                        style={{ width: "100%", minHeight: "370px" }}
                      >
                        <Link
                          to={`/product/${sneaker.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          className="text-decoration-none text-dark"
                        >
                          <img
                            className="img-fluid"
                            src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                            alt={sneaker.name}
                            style={{
                              objectFit: "cover",
                              height: "auto",
                              borderRadius: "1.5rem 1.5rem 0 0",
                            }}
                          />
                          <div className="card-body p-3">
                            <h5 className="card-title mb-2 fw-bold fs-4">{sneaker.name}</h5>
                            <p className="card-text mb-0 fw-bold fs-5">
                              {sneaker.discounted_price &&
                                parseFloat(sneaker.discounted_price) < parseFloat(sneaker.price) ? (
                                <>
                                  <span className="text-danger">{parseFloat(sneaker.discounted_price).toFixed(2)}€</span>
                                  <span className="text-decoration-line-through text-secondary ms-2">
                                    {parseFloat(sneaker.price).toFixed(2)}€
                                  </span>
                                </>
                              ) : (
                                <span>{parseFloat(sneaker.price).toFixed(2)}€</span>
                              )}
                            </p>
                          </div>
                        </Link>
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
                      .replaceAll(" ", "-")}`}
                  >
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
                          <span className="text-dark">
                            {sneaker.price}&euro;
                          </span>
                        ) : (
                          <>
                            <span className="original-price">
                              {sneaker.price}&euro;
                            </span>
                            <span className="discount-price">
                              {parseFloat(sneaker.discounted_price).toFixed(2)}
                              &euro;
                            </span>
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
