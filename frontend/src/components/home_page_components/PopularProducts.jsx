import { useState, useEffect } from "react";
import { useWishlist } from "../../context/WhishlistContext";
import { Link } from "react-router-dom";

export default function PopularProducts() {
  const { wishlist, setWishlist } = useWishlist()
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

      const popularTotalPages = Math.ceil(popularSneakers.result.length / itemsPerPage);
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
      function addToWishList(sneaker) {
        // Example: add the sneaker to wishlist
        const newItem = {
          id: sneaker.id,
          name: sneaker.brand + " " + sneaker.name,
          price: sneaker.discounted_price && parseFloat(sneaker.discounted_price) < parseFloat(sneaker.price)
            ? parseFloat(sneaker.discounted_price)
            : parseFloat(sneaker.price),
          image: JSON.parse(sneaker.image_urls)[0],
          // add other properties as needed
          quantity: 1,
        };
        // check if item already is in wishlist
        const existingItem = wishlist.find(item => item.id === newItem.id);
        let updatedWishList;
        if (existingItem) {
          updatedWishList = wishlist.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedWishList = [...wishlist, newItem];
        }

        setWishlist(updatedWishList);
      }

      return (
        <>
          <section className="popular-displayer container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="fs-3 fs-md-2 fw-bold">Popular Items</h1>
              <button
                className="btn btn-main-light"
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
                    className="btn btn-main-light"
                    onClick={prevPopularPage}
                    disabled={popularPage === 0}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="btn btn-main-light"
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
                        <div className="card h-100 text-center position-relative">
                          <i
                            className="bi bi-heart-fill position-absolute text-danger fs-4"
                            style={{ top: "1rem", right: "1rem", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addToWishList(sneaker);
                            }} />
                          <Link
                            to={`/product/${sneaker.name
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                            className="text-decoration-none text-dark"
                            style={{ display: "block" }}
                          >
                            <img
                              className="card-img-top img-fluid"
                              src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                              alt={sneaker.name}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{sneaker.name}</h5>
                              {!sneaker.discounted_price ||
                                parseFloat(sneaker.discounted_price) >=
                                parseFloat(sneaker.price) ? (
                                <p className="text-dark">
                                  {parseFloat(sneaker.price).toFixed(2)}$
                                </p>
                              ) : (
                                <p className="text-danger">
                                  {parseFloat(sneaker.discounted_price).toFixed(2)}$
                                  <span className="text-decoration-line-through text-muted ms-2">
                                    {parseFloat(sneaker.price).toFixed(2)}$
                                  </span>
                                </p>
                              )}
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="list-group">
                {popularSneakers.result.map((sneaker) => (
                  <div className="list-group-item mb-3" key={sneaker.id}>
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
                          <p className="mb-0">Price: {sneaker.price}$</p>
                        ) : (
                          <>
                            <p className="mb-0">Price: {sneaker.price}$</p>
                            <p>
                              Discounted:{" "}
                              {parseFloat(sneaker.discounted_price).toFixed(2)}$
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </>
      );
  }
}
