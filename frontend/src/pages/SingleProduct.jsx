import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function SingleProduct() {
  const { sneakers } = useGlobalContext();
  const { slug } = useParams();
  const [productId, setProductId] = useState({
    state: "loading",
  });
  const [product, setProduct] = useState({
    state: "loading",
  });
  const [counter, setCounter] = useState(0);

  // gets the sneaker id starting from the slug so i can correctly to the fetch call
  function getSneakerId() {
    if (sneakers.state === "success") {
      const sneaker = sneakers.result.find((sneaker) => {
        if (sneaker.name.toLowerCase().replaceAll(" ", "-") === slug) {
          return sneaker;
        }
      });
      if (sneaker) {
        setProductId({
          state: "success",
          id: sneaker.id,
        });
      }
    }
  }

  // fetches the single sneaker with the dynamic id taken from the page url
  function fetchSneaker() {
    fetch(`http://localhost:3000/boolshop/api/v1/shoes/${productId.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setProduct({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }

  // each time the sneakers array or slug changes, call the function to get the new dynamic ID
  useEffect(() => {
    getSneakerId();
  }, [sneakers, slug]);

  // only when the id has been successfully stored, then the fetch call to the show route gets called
  useEffect(() => {
    if (productId.state === "success") fetchSneaker();
  }, [productId]);

  // switch case to ensure every situation is handled correctly
  switch (product.state) {
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
      // parses the string with an array format into an actual array
      const images = JSON.parse(product.result.image_urls);

      return (
        <>
          <div className="container single-page">
            <div className="row mx-1 pt-4">
              <div className="col-12 col-lg-1 order-2 order-lg-1 my-4 my-lg-0">
                <div className=" d-flex flex-lg-column justify-content-center align-items-center gap-3 thumbContainer">
                  {images?.map((image, index) => (
                    <>
                      <div
                        key={index}
                        className={
                          counter === index
                            ? `thumb-wrapper wrapper-border`
                            : "thumb-wrapper"
                        }
                      >
                        <img
                          src={images ? `/assets/${image}` : "/assets/01.webp"}
                          alt=""
                          onMouseOver={() => {
                            setCounter(index);
                          }}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-12 col-lg-8 order-1 order-lg-1">
                <div className="carouselContainer">
                  <div className="carousel d-flex align-items-center">
                    <img
                      src={
                        images
                          ? `/assets/${images[counter]}`
                          : "/assets/01.webp"
                      }
                      alt=""
                    />

                    <button
                      onClick={() =>
                        setCounter(
                          counter > 0 ? counter - 1 : images.length - 1
                        )
                      }
                      className=" btn-left"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      onClick={() =>
                        setCounter(
                          counter === images.length - 1 ? 0 : counter + 1
                        )
                      }
                      className="btn-right"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 order-3">
                <div className="d-flex flex-column detailsContainer">
                  <h1>{product.result.name}</h1>
                  <h2>
                    <Link to={""} className="text-secondary">
                      {product.result.brand}
                    </Link>
                  </h2>
                  {!product.result.discounted_price ||
                  parseFloat(product.result.discounted_price) >=
                    parseFloat(product.result.price) ? (
                    <p className="text-dark">
                      {parseFloat(product.result.price).toFixed(2)}&#8364;
                    </p>
                  ) : (
                    <p className="text-danger">
                      <span className="text-decoration-line-through text-muted ms-2">
                        {parseFloat(product.result.price).toFixed(2)}&#8364;
                      </span>{" "}
                      {parseFloat(product.result.discounted_price).toFixed(2)}
                      &#8364;
                    </p>
                  )}
                  <div className="d-flex justify-content-between mt-4">
                    <p>
                      <span className="text-secondary">Color:</span>
                      <span>colors{/*product.result.variant_colors*/}</span>
                    </p>
                    <p>
                      <span>n {/*product.result.variant_colors.length */}</span>
                      <span className="text-secondary">colors</span>
                    </p>
                  </div>

                  <div className="d-flex gap-2 circle-thumbs-container align-items-center flex-wrap">
                    {" "}
                    {/*refactor to cycle through the variants images */}
                    <div className="circle-thumb-wrapper">
                      {images && (
                        <img
                          className="circle-thumb-img"
                          src={`/assets/${images[0]}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="circle-thumb-wrapper">
                      {images && (
                        <img
                          className="circle-thumb-img"
                          src={`/assets/${images[0]}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="circle-thumb-wrapper">
                      {images && (
                        <img
                          className="circle-thumb-img"
                          src={`/assets/${images[0]}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div>
                      <div className="circle-thumb-wrapper">
                        {images && (
                          <img
                            className="circle-thumb-img"
                            src={`/assets/${images[0]}`}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3">
                    <span>Select</span>{" "}
                    <span className="text-secondary">size:</span>
                  </p>
                  <div className="sizes-container d-flex gap-3 flex-wrap">
                    {/*add selection logic here */}
                    <span className="size-badge">40</span>
                    <span className="size-badge">41</span>
                    <span className="size-badge">42</span>
                    <span className="size-badge">43</span>
                    <span className="size-badge">44</span>
                  </div>

                  <div className="mt-5">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum debitis in sed, eum enim, explicabo, eligendi vero
                      laborum facilis quas laboriosam ipsam eos at nihil
                      voluptatem blanditiis alias sint fugiat?
                    </p>
                  </div>

                  <button className="btn btn-main-light rounded-4 fs-4 my-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
}
