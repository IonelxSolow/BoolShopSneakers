import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function MostPopular() {
  const { sneakers } = useGlobalContext();

  switch (sneakers.state) {
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
      let mostSoldSneaker = sneakers.result[0];
      sneakers.result.forEach((sneaker) => {
        if (sneaker.sold_copies > mostSoldSneaker.sold_copies) {
          mostSoldSneaker = sneaker;
        }
      });

      const parsedImg = JSON.parse(mostSoldSneaker.image_urls)[0];

      return (
        <>
          <section className="bg-light p-3 mb-5 container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="row p-4">
                <div className="col-lg-6 d-flex flex-column justify-content-between">
                  <h1 className="fw-bolder display-2">Most Popular 🔥</h1>

                  <div>
                    <h4 className="">{mostSoldSneaker.name}</h4>
                    <p>{mostSoldSneaker.description}</p>
                    <Link
                      to={`/product/${mostSoldSneaker.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      <button className="btn btn-main-light">Shop Now</button>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    src={`/assets/${parsedImg}`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      );
  }
}
