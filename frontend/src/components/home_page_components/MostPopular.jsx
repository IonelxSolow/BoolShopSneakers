import { useGlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

export default function MostPopular() {
  const { sneakers } = useGlobalContext();

  const [counter, setCounter] = useState(1); // Convert to state
  const [popularSneakers, setPopularSneakers] = useState({
    state: "loading",
  });

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => {
        if (prev < 28) {
          return prev + 1;
        }

        return 1;
      });
    }, 200);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/boolshop/api/v1/shoes/popular`)
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
        console.error(err);
      });
  }, []);

  switch (sneakers.state) {
    case "loading":
      return (
        <h1>Loading...{/* Create a loader component to replace this */}</h1>
      );
    case "error":
      return (
        <>
          <h1>Error loading products</h1>
          <p>{sneakers.message}</p>
        </>
      );
    case "success":
      let mostSoldSneaker = sneakers.result[0];
      sneakers.result.forEach((sneaker) => {
        if (sneaker.sold_copies > mostSoldSneaker.sold_copies) {
          mostSoldSneaker = sneaker;
        }
      });

      return (
        <>
          {/* <svg
            className="wave-1hkxOo"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              class="wavePath-haxJK1 animationPaused-2hZ4IO"
              d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
              fill="currentColor"
            ></path>
          </svg> */}
          <div className="py-5" style={{ backgroundColor: "var(--bs-secondary)" }}>
            <section className=" p-0 container hot-item my-3">
              <div className="row gap-3 d-flex justify-content-between align-items-center">
                <div className="item-description text-start  col-12 col-lg-4 order-lg-2">
                  <div className="superbold-title mb-5">
                    <span className="d-block newest-superbold" style={{ fontSize: "8rem", color: "var(--main-light)" }}>HOT</span>
                    <span className="d-block newest-superbold ps-3 text-light text-outline">ITEMS</span>
                  </div>
                  <div>
                    <p className="item-brand fs-3 fw-bold text-light">{mostSoldSneaker.brand}</p>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <p className="item-title fs-4 fst-italic m-0 text-light">#1 {mostSoldSneaker.name}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="item-price mb-0 fw-bold fs-3" style={{ color: "var(--main-light)" }}>{mostSoldSneaker.price}&euro;</p>
                        <Link
                          className="show-tag ms-3"
                          to={"/product/air-force-1"}>SHOP NOW
                        </Link>
                      </div>
                    </div>
                    <p className="item-description fs-5 text-secondary pe-4">
                      Timeless Style. Everyday Comfort.
                      Step into a legend with the Nike Air Force 1 Low  an icon that blends classic basketball heritage with modern streetwear appeal.
                    </p>


                  </div>
                </div>
                <Link
                  className="slider360 text-center position-relative col-12 col-lg-7 order-lg-1 ps-3"
                  to={"/product/air-force-1"}>
                  < img
                    className="image360 img-fluid rounded-3"
                    src={
                      counter < 10
                        ? `/360/jd_030664_spin_0${counter}.jpeg`
                        : `/360/jd_030664_spin_${counter}.jpeg`
                    }
                    alt=""
                  />
                </Link>

              </div>
              {/* <svg
              className="wave-1hkxOo"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="white"
              ></path>
            </svg> */}
            </section >
          </div>
        </>
      );
  }
}
