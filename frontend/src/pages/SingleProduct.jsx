import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function SingleProduct() {
  const { sneakers, loading } = useGlobalContext();
  const { slug } = useParams();
  const [productId, setProductId] = useState({
    state: "loading",
  });
  const [product, setProduct] = useState({
    state: "loading",
  });
  const [counter, setCounter] = useState(0);
  console.log(counter);

  function getSneakerId() {
    if (loading === true) {
      console.log("Fetch didn't load"); // can implement possible 404 logic here
      return;
    }
    const sneaker = sneakers.find((sneaker) => {
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

  function fetchSneaker() {
    fetch(`http://localhost:3000/boolshop/api/v1/shoes/${productId.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          state: "success",
          result: data,
        });
        console.log(data);
      })
      .catch((err) => {
        setProduct({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }

  useEffect(() => {
    getSneakerId();
  }, [sneakers, slug]);

  useEffect(() => {
    if (productId.state === "success") fetchSneaker();
  }, [productId]);

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
      const images = JSON.parse(product.result.image_urls);
      return (
        <>
          <div className="container single-page">
            <div className="row">
              <div className="col-2">
                <div className="thumbContainer">
                  <p>hello im the thumbcontainer</p>
                  <p>{product.result.name}</p>
                </div>
              </div>
              <div className="col-5">
                <div className="carouselContainer">
                  <div className="carousel d-flex flex-column justify-content-between align-items-center">
                    <img
                      className="img-fluid"
                      src={`/assets/${images[counter]}`}
                      alt=""
                    />
                    <div className="carousel-navigation mt-5 d-flex gap-3 justify-content-end align-items-end p-3 align-self-end">
                      <button
                        onClick={() =>
                          setCounter((prevCounter) =>
                            prevCounter > 0
                              ? prevCounter - 1
                              : images.length - 1
                          )
                        }
                        className="btn btn-main-light"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <button
                        onClick={() =>
                          setCounter((prevCounter) =>
                            prevCounter < images.length - 1
                              ? prevCounter + 1
                              : 0
                          )
                        }
                        className="btn btn-main-light"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="detailsContainer">
                  <p>hello im the details Container</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
}
