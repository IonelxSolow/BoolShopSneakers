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

  // gets the sneaker id starting from the slug so i can correctly to the fetch call
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

  // fetches the single sneaker with the dynamic id taken from the page url
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
                      src={
                        images
                          ? `/assets/${images[counter]}`
                          : "/assets/01.webp"
                      }
                      alt=""
                    />
                    <div className="carousel-navigation mt-5 d-flex gap-3 justify-content-end align-items-end p-3 align-self-end">
                      <button
                        onClick={() =>
                          setCounter(
                            counter > 0 ? counter - 1 : images.length - 1
                          )
                        }
                        className="btn btn-main-light"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <button
                        onClick={() =>
                          setCounter(
                            counter === images.length - 1 ? 0 : counter + 1
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
