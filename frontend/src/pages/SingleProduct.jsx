import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function SingleProduct() {
  const { sneakers, loading } = useGlobalContext();
  const { slug } = useParams();
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

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
        console.log(data);
        setProduct(data);
      });
  }, [productId]);

  return (
    <>
      <div className="container single-page">
        <div className="row">
          <div className="col-2">
            <div className="thumbContainer">
              <p>hello im the thumbcontainer</p>
            </div>
          </div>
          <div className="col-5">
            <div className="carouselContainer">
              <div className="carousel">
                <img
                  className="img-fluid"
                  src="/images/Scarpe/04_New_Balance/05_2002R/04_05_Variant_1/05_NewBalance2002R_01.webp"
                  alt=""
                />
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
