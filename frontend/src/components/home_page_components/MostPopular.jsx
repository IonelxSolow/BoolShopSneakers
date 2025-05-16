import { useGlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MostPopular() {
  const { sneakers } = useGlobalContext();

  const [counter, setCounter] = useState(1); // Convert to state

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => {
        if (prev < 28) {
          return prev + 1;
        }

        return 1;
      });
    }, 1000);
  }, []);

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
          <section className=" p-0 container-fluid hot-item">
            <div className="slider360 text-center">
              <img
                className="image360"
                src={
                  counter < 10
                    ? `/360/jd_030664_spin_0${counter}.jpeg`
                    : `/360/jd_030664_spin_${counter}.jpeg`
                }
                alt=""
              />
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
          </section>
        </>
      );
  }
}
