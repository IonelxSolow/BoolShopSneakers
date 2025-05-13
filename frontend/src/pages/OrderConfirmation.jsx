import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId, customerName, total } = location.state || {};

  if (!orderId) {
    return (
      <div className="container my-5 text-center">
        <h2>Nessun ordine da visualizzare</h2>
        <p>Sembra che tu sia arrivato qui per errore.</p>
        <Link to="/" className="btn btn-main-light mt-3">
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                {/* Usando icona Bootstrap invece di react-icons */}
                <i
                  className="bi bi-check-circle-fill text-success"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>
              <h1 className="display-4 mb-4">Ordine Confermato!</h1>
              <h2 className="mb-4">Grazie {customerName?.split(" ")[0]}</h2>

              <p className="lead mb-4">
                Il tuo ordine #{orderId} è stato confermato e sarà elaborato al
                più presto.
              </p>

              <div className="bg-light p-4 rounded mb-4">
                <p className="mb-1">
                  Una conferma dell'ordine è stata inviata al tuo indirizzo
                  email.
                </p>
                <p className="mb-0">
                  Riceverai un'altra email quando il tuo ordine verrà spedito.
                </p>
              </div>

              {total && (
                <div className="mb-4">
                  <h3>Totale ordine: €{total.toFixed(2)}</h3>
                </div>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/" className="btn btn-main-light btn-lg">
                  Torna allo Shopping
                </Link>
                <Link
                  to={`/account/orders/${orderId}`}
                  className="btn btn-outline-dark btn-lg"
                >
                  Dettagli Ordine
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
