import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="foot-bar bg-whitesmoke mt-4 bg-main-light">
          <div className="container py-3">
            <div className="row row-cols-1 row-cols-md-2 align-items-center g-3">
              <div className="col text-center text-md-start">
                <h1 className="fw-bold h2">
                  JOIN OUR KICKSOCIETY <br /> CLUB & GET 15% OFF
                </h1>
                <span>Sign up for free! Join the community!</span>
                <form className="d-flex flex-column flex-sm-row gap-3 mt-3">
                  <div className="flex-grow-1">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      aria-label="Email signup"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn bg-black text-white fw-bold px-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col text-center">
                <h1 className="display-3 fw-bold">KICKSOCIETY</h1>
              </div>
            </div>
          </div>
        </div>
        {/* Black Footer */}
        <div className="foot-bar bg-whitesmoke bg-black bg-main-light">
          <div className="container py-3">
            <div className="row w-100 p-3 rounded">
              {/* About Section */}
              <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                <h3 className="fw-bold secondary-color">About us</h3>
                <span className="text-white">
                  Welcome to KICKSOCIETY, your reference point for high-quality
                  sports footwear. Since 2024, we have been offering a curated
                  selection of the best sneakers and sports shoes, combining
                  style, comfort and performance.
                </span>
              </div>
              {/* Links Section */}
              <div className="col-12 col-lg-6">
                <div className="row w-100 g-3">
                  <div className="col-12 col-sm-6 col-xl-4">
                    <h5 className="fw-bold secondary-color ps-2">Categories</h5>
                    <ul className="text-white">
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Sneakers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none text-nowrap"
                        >
                          Running Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Basketball
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Training
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Lifestyle
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Soccer
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6 col-xl-4">
                    <h5 className="fw-bold secondary-color ps-2">Help</h5>
                    <ul className="text-white">
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none text-nowrap"
                        >
                          Order Status
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none text-nowrap"
                        >
                          Shipping & Delivery
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-white text-decoration-none"
                        >
                          Returns
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-xl-4">
                    <h5 className="fw-bold secondary-color ps-2">Follow us</h5>
                    <ul className="text-white">
                      <li>
                        <Link
                          to="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none"
                        >
                          <i
                            className="bi bi-instagram me-2"
                            style={{ color: "var(--instagram)" }}
                          ></i>
                          Instagram
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none"
                        >
                          <i
                            className="bi bi-facebook me-2"
                            style={{ color: "var(--facebook)" }}
                          ></i>
                          Facebook
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none"
                        >
                          <i
                            className="bi bi-twitter-x me-2"
                            style={{ color: "var(--twitter)" }}
                          ></i>
                          Twitter
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Payment Methods Section */}
        <div className="foot-bar bg-whitesmoke bg-black">
          <div className="container py-3 text-center">
            <h6 className="text-white mb-3">METODI DI PAGAMENTO</h6>
            <div className="d-flex justify-content-center gap-3">
              <i className="bi bi-credit-card fs-4 text-white"></i>
              <i className="bi bi-paypal fs-4 text-white"></i>
              <i className="bi bi-bank fs-4 text-white"></i>
              <i className="bi bi-cash-coin fs-4 text-white"></i>
            </div>
          </div>
        </div>
        <div className="foot-bar bg-whitesmoke bg-black border-top border-secondary">
          <div className="container py-2 text-center">
            <small className="text-white">© 2025 KICKSOCIETY - Tutti i diritti riservati</small>
          </div>
        </div>
      </footer>
    </>
  );
}
