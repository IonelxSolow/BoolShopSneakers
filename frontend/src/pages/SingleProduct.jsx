import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function SingleProduct() {
  const { sneakers, loading } = useGlobalContext();
  const { slug } = useParams();
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({
    state: "loading",
  });

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
      setProductId(sneaker.id);
    }
  }

  useEffect(() => {
    getSneakerId();
    fetch(`http://localhost:3000/boolshop/api/v1/shoes/3`)
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
                      src="/images/Scarpe/04_New_Balance/05_2002R/04_05_Variant_1/05_NewBalance2002R_01.webp"
                      alt=""
                    />
                    <div className="carousel-navigation mt-5 d-flex gap-3 justify-content-end align-items-end p-3 align-self-end">
                      <div className="btn btn-main-light">
                        <i className="bi bi-chevron-left"></i>
                      </div>
                      <div className="btn btn-main-light">
                        <i className="bi bi-chevron-right"></i>
                      </div>
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
