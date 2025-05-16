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
                      <div className="col-12 col-md-6" key={sneaker.id}>
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
                {newestSneakers.result.map((sneaker) => (
                  <Link
                    className="list-group-item mb-3"
                    key={sneaker.id}
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <div className="d-flex flex-column flex-md-row">
                      <img
                        src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                        alt="Sneaker"
                        width="100%"
                        className="me-md-3 mb-3 mb-md-0"
                        style={{ maxWidth: "150px" }}
                      />
                      <div>
                        <h4 className="mb-2">{sneaker.name}</h4>
                        <p>{sneaker.description}</p>
                        {!sneaker.discounted_price ||
                        parseFloat(sneaker.discounted_price) >=
                          parseFloat(sneaker.price) ? (
                          <p className="mb-0">Price: {sneaker.price}&euro;</p>
                        ) : (
                          <>
                            <p className="mb-0">Price: {sneaker.price}&euro;</p>
                            <p>
                              Discounted:{" "}
                              {parseFloat(sneaker.discounted_price).toFixed(2)}
                              &euro;
                            </p>
                          </>
                        )}
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
