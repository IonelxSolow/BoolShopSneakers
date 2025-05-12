import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function SingleProduct() {
  const { sneakers } = useGlobalContext();
  const { cart, setCart } = useCart();
  const { slug } = useParams();
  const [productId, setProductId] = useState({
    state: "loading",
  });
  const [product, setProduct] = useState({
    state: "loading",
  });
  const [counter, setCounter] = useState(0);
  const [variant, setVariant] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

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

  // used to change the activeIndex of the size selection to add style when selected
  function handleSizeClick(index) {
    setActiveIndex(index);
  }

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
      function addToCart() {
        const newItem = {
          name: product.result.brand + " " + product.result.name,
          color: variant === 0 ? colors[0] : colors[1],
          size: variant === 0 ? sizes[0][activeIndex] : sizes[1][activeIndex],
          price: product.result.price,
          image: variant === 0 ? images[0] : variantImages[0],
          sku:
            variant === 0
              ? product.result.variant_sku.split(",")[0]
              : product.result.variant_sku.split(",")[1],
          quantity: 1,
          variant_id:
            variant === 0
              ? product.result.variant_ids.split(",")[0]
              : product.result.variant_ids.split(",")[1],
        };

        // check if item already is in cart
        const existingItem = cart.find(
          (cartItem) => cartItem.sku === newItem.sku
        );
        let updatedCart;
        if (existingItem) {
          updatedCart = cart.map((item) =>
            item.sku === newItem.sku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cart, newItem];
        }

        setCart(updatedCart);

        console.log("Added item:", newItem);
        console.log("Updated cart:", updatedCart);
      }
      console.log(cart);

      // parses the string with an array format into an actual array
      const images = JSON.parse(product.result.image_urls);
      const variantImages = JSON.parse(product.result.variants[1].image_urls);
      const colors = [];
      product.result.variants.map((variant) => {
        colors.push(variant.color);
      });
      const formatSizes = `[${product.result.variant_sizes}]`;
      const sizes = JSON.parse(formatSizes);
      const colorString = colors.join(", ");

      return (
        <>
          <div className="container single-page">
            <div className="row mx-1 pt-4">
              <div className="col-12 col-xxl-1 order-2 order-xxl-1 my-4 my-xxl-0">
                <div className=" d-flex flex-xxl-column justify-content-center align-items-center gap-3 thumbContainer">
                  {variant === 0
                    ? images?.map((image, index) => (
                        <div
                          key={index}
                          className={
                            counter === index
                              ? `thumb-wrapper wrapper-border`
                              : "thumb-wrapper"
                          }
                        >
                          <img
                            src={
                              images ? `/assets/${image}` : "/assets/01.webp"
                            }
                            alt=""
                            onMouseOver={() => {
                              setCounter(index);
                            }}
                          />
                        </div>
                      ))
                    : variantImages?.map((image, index) => (
                        <div
                          key={index}
                          className={
                            counter === index
                              ? `thumb-wrapper wrapper-border`
                              : "thumb-wrapper"
                          }
                        >
                          <img
                            src={
                              images ? `/assets/${image}` : "/assets/01.webp"
                            }
                            alt=""
                            onMouseOver={() => {
                              setCounter(index);
                            }}
                          />
                        </div>
                      ))}
                </div>
              </div>
              <div className="col-12 col-xxl-8 order-1 order-xxl-1">
                <div className="carouselContainer">
                  <div className="carousel d-flex align-items-center">
                    {variant === 0 ? (
                      <img
                        src={
                          images
                            ? `/assets/${images[counter]}`
                            : "/assets/01.webp"
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        src={
                          images
                            ? `/assets/${variantImages[counter]}`
                            : "/assets/01.webp"
                        }
                        alt=""
                      />
                    )}

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
              <div className="col-12 col-xxl-3 order-3 d-flex">
                <div className="d-flex flex-column detailsContainer justify-content-between">
                  <h1 className="fw-bold text-uppercase">
                    {product.result.name}
                  </h1>
                  <h2>
                    <Link
                      to={`/all-products?brand=${product.result.brand}`}
                      className="text-secondary"
                    >
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
                      <span className="text-secondary">Color:</span>{" "}
                      <span>{colorString}</span>
                    </p>
                    <p>
                      <span>{colors.length} </span>
                      <span className="text-secondary">colors</span>
                    </p>
                  </div>

                  <div className="d-flex gap-2 circle-thumbs-container align-items-center flex-wrap">
                    {" "}
                    <div
                      className={`circle-thumb-wrapper ${
                        variant === 0 && " active-link"
                      }`}
                    >
                      {images && (
                        <img
                          onClick={() => setVariant(0)}
                          className="circle-thumb-img"
                          src={`/assets/${images[0]}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div>
                      <div
                        className={`circle-thumb-wrapper ${
                          variant === 1 && " active-link"
                        }`}
                      >
                        {variantImages && (
                          <img
                            onClick={() => setVariant(1)}
                            className="circle-thumb-img"
                            src={`/assets/${variantImages[0]}`}
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
                    {variant === 0
                      ? sizes[0].map((size, index) => (
                          <div
                            key={index}
                            onClick={() => handleSizeClick(index)}
                            className={`size-badge ${
                              activeIndex === index && "active-link"
                            }`}
                          >
                            {size}
                          </div>
                        ))
                      : sizes[1].map((size, index) => (
                          <div
                            key={index}
                            onClick={() => handleSizeClick(index)}
                            className={`size-badge ${
                              activeIndex === index && "active-link"
                            }`}
                          >
                            {size}
                          </div>
                        ))}
                  </div>
                  <p className="my-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Atque iste, quaerat iusto obcaecati suscipit modi veniam
                    ipsam ipsum ex provident.
                  </p>
                  <button
                    onClick={() => addToCart()}
                    className="btn btn-main-light rounded-4 fs-4 my-3"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <h1 className="pt-3 px-3 fw-bold text-uppercase">
              You might also like:
            </h1>
            <div className="suggestedItemsContainer d-flex pt-3 pb-4 px-3 gap-4">
              <div className="suggestedItemWrapper">
                {" "}
                {/*Replace with dynamic map*/}
                <img className="img-fluid" src="/assets/01.webp" alt="" />
              </div>
              <div className="suggestedItemWrapper">
                <img className="img-fluid" src="/assets/01.webp" alt="" />
              </div>
              <div className="suggestedItemWrapper">
                <img className="img-fluid" src="/assets/01.webp" alt="" />
              </div>
              <div className="suggestedItemWrapper">
                <img className="img-fluid" src="/assets/01.webp" alt="" />
              </div>
            </div>
          </div>
        </>
      );
  }
}
