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
          <svg className="wave-1hkxOo"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
              d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
              fill="currentColor">
            </path>
          </svg>
          <section className="bg-dark container-fluid">
            <div className="container p-3 mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="row p-4 m-auto">
                  <div className="col-lg-6 d-flex flex-column ">
                    <h1
                      className="fw-bolder display-1 mb-3 text-main-light text-decoration-underline text-uppercase">
                      Hot Item
                      <i className="bi bi-fire"></i>
                    </h1>
                    <div className="">
                      <h2 className="text-white  display-2 mb-3">{mostSoldSneaker.name}</h2>
                      {/* <p className="text-white">{mostSoldSneaker.description}</p> */}
                      <Link
                        to={`/product/${mostSoldSneaker.name
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        <button className="btn btn-main-light">Shop Now</button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <img
                      src={`/assets/${parsedImg}`}
                      className="img-fluid hot-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <svg className="wave-1hkxOo"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none">
              <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="white">
              </path>
            </svg>
          </section>
        </>
      );
  }
}
