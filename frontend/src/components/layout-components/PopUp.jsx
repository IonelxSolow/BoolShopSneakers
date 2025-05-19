import { useEffect, useState } from "react";

export default function PopUp() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });
  const [subscribeStatus, setSubscribeStatus] = useState("idle"); // idle, loading, success, error
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const hasVisited = localStorage.getItem("kickSocietyHasVisited");

    if (!hasVisited) {
      // Show the popup and save the visit
      setShowPopup(true);
      localStorage.setItem("kickSocietyHasVisited", "true");
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  function handleEmailChange(e) {
    setEmail({ email: e.target.value });
  }

  function checkEmailRegex(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSubscribe() {
    // reset error state
    setEmailError("");

    // Validate empty email
    if (!email.email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Validate email format
    if (!checkEmailRegex(email.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setSubscribeStatus({ status: "loading" });
    fetch("http://localhost:3000/boolshop/api/v1/send-email/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setSubscribeStatus({ status: "success", response: data });
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch((err) => {
        setSubscribeStatus({
          status: "error",
          error: err.message,
        });
      });
  }

  console.log(subscribeStatus);

  return (
    showPopup && (
      <div
        className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ background: "rgba(0,0,0,0.6)", zIndex: 1050 }}
      >
        <div
          className="popup-content bg-dark text-white rounded shadow p-4 position-relative"
          style={{ minWidth: 340, maxWidth: 400 }}
        >
          <button
            onClick={handleClose}
            type="button"
            className="btn-close btn-close-white position-absolute top-0 end-0 m-1"
            aria-label="Close"
          ></button>
          <h2 className="mb-3 text-main-light">Welcome to KickSociety!</h2>
          <p className="mb-4">
            Thank you for visiting. Check out our latest sneakers!
          </p>
          <div className="mb-3">
            <label htmlFor="mailer" className="form-label text-main-light">
              Newsletter
            </label>
            <input
              type="email"
              className={`form-control bg-secondary text-white border-0 ${
                emailError ? "is-invalid" : ""
              }`}
              name="mailer"
              id="mailer"
              value={email.email}
              onChange={handleEmailChange}
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              disabled={
                subscribeStatus.status === "loading" ||
                subscribeStatus.status === "success"
              }
            />
            {emailError && (
              <div className="invalid-feedback d-block">{emailError}</div>
            )}
            {subscribeStatus.status === "error" && (
              <div className="invalid-feedback d-block">
                {subscribeStatus.error}
              </div>
            )}
          </div>
          {subscribeStatus.status === "success" ? (
            <div className="alert alert-success mb-2 py-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              Successfully subscribed!
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-main-light w-100 mb-2"
              onClick={handleSubscribe}
              disabled={subscribeStatus.status === "loading"}
            >
              {subscribeStatus.status === "loading" ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          )}
        </div>
      </div>
    )
  );
}
