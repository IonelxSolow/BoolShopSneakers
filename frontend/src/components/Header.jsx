import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"

import SearchBar from "./SearchBar"
import Cart from "./Cart"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

    // usiamo useLocation per ottenere i cambiamenti di posizione
    const location = useLocation(); 

    // chiudiamo il menu quando la posizione cambia
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
    }, [location]);

  // funzione per aprire e chiudere il menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsSearchOpen(false);
      setIsCartOpen(false);
    }
  };

  // funzione per aprire e chiudere la barra di ricerca
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMenuOpen(false);
      setIsCartOpen(false);
    }
  };

  // funzione per aprire e chiudere il carrello
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  // chiudiamo il menu quando la finestra viene ridimensionata
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    // aggiungiamo l'event listener per il resize
    window.addEventListener("resize", handleResize);

    // serveamo per rimuovere l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Mostra header se si scorre verso l'alto
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

    const { cart } = useCart();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className={`header-container ${isVisible ? 'header-visible' : 'header-hidden'} shadow-sm`}>
        <nav className="navbar custom-header py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <button
              className="burger-menu d-md-none border-0"
              onClick={toggleMenu}
            >
              <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`}></i>
            </button>
            <div
              className={`menu-list d-md-flex ${
                isMenuOpen ? "open" : "d-none"
              }`}
            >
              <div className="items container d-flex flex-column flex-md-row gap-3 px-0">
                <NavLink
                  to="/men"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Men
                </NavLink>
                <NavLink
                  to="/women"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Women
                </NavLink>
                <NavLink
                  to="/kids"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kids
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/"
              className="navbar-brand mx-auto text-center fw-bolder"
            >
              <h4 className="fw-bolder m-0">KICKSOCIETY</h4>
            </NavLink>
            <div className="d-flex justify-content-end align-items-center gap-3">
              <a href="#" className="nav-link" onClick={toggleSearch}>
                <i className="bi bi-search"></i>
              </a>
              <a href="#" className="nav-link">
                <i className="bi bi-person"></i>
              </a>
              <a href="#" className="nav-link icon-btn cart-btn" onClick={toggleCart}>
                <i className="bi bi-cart"></i>
              </a>
                            {cartItemCount > 0 && (
                                <span className="badge bg-dark text-white position-absolute translate-middle">
                                    {cartItemCount}
                                </span>
                            )}
            </div>
          </div>
          {isSearchOpen && (
            <div className="search-bar container">
              <SearchBar toggleSearch={toggleSearch} />
            </div>
          )}

          {isCartOpen && (
            <div className={`cart-dropdown ${isCartOpen ? "open" : ""}`}>
              <Cart toggleCart={toggleCart} isOpen={isCartOpen} />
            </div>
          )}
        </nav>
      </header>
    </>
  );
}





