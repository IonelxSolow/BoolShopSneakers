import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import SearchBar from "../layout-components/SearchBar";
import Cart from "../Cart";
import Wishlist from "../Wishlist";
import { useWishlist } from "../../context/WhishlistContext";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // usiamo useLocation per ottenere i cambiamenti di posizione
    const location = useLocation();

    const navigate = useNavigate();

    // chiudiamo il menu quando la posizione cambia
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
    }, [location]);

    // funzione per aprire e chiudere il menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setIsSearchOpen(false);
            setIsCartOpen(false);
            setIsWishlistOpen(false);
        }
    };

    // funzione per aprire e chiudere la barra di ricerca
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setIsMenuOpen(false);
            setIsCartOpen(false);
            setIsWishlistOpen(false);
        }
    };

    // funzione per chiudere la whishlist
    const toggleWishlist = () => {
        if (location.pathname === "/wishlist") {
            return;
        }

        setIsWishlistOpen(!isWishlistOpen);
        if (!isWishlistOpen) {
            setIsSearchOpen(false);
            setIsMenuOpen(false);
            setIsCartOpen(false);
        }

        if (window.innerWidth <= 768) {
            // Reindirizza alla pagina del wishlist su dispositivi mobili
            navigate("/wishlist");
        } else {
            // Mostra il wishlist come componente su desktop
            setIsWishlistOpen(!isWishlistOpen);
        }
    };

    // funzione per aprire e chiudere il carrello
    const toggleCart = () => {
        if (location.pathname === "/cart") {
            return;
        }

        setIsCartOpen(!isCartOpen);
        if (!isCartOpen) {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
            setIsWishlistOpen(false);
        }
        if (window.innerWidth <= 768) {
            // Reindirizza alla pagina del carrello su dispositivi mobili
            navigate("/cart");
        } else {
            // Mostra il carrello come componente su desktop
            setIsCartOpen(!isCartOpen);
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

    const { wishlist } = useWishlist()
    const WishlistItemCount = wishlist.length;


    return (
        <>
            <header
                className={`header-container ${isVisible ? "header-visible" : "header-hidden"
                    } shadow-sm`}
            >
                <nav className="navbar custom-header py-3">
                    <div className="container d-flex justify-content-between align-items-center">
                        <button
                            className="burger-menu d-md-none border-0"
                            onClick={toggleMenu}
                        >
                            <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`}></i>
                        </button>
                        <div
                            className={`menu-list d-md-flex ${isMenuOpen ? "open" : "d-none"
                                }`}
                        >
                            <div className="items container d-flex flex-column flex-md-row gap-3 px-0">
                                <NavLink
                                    to="/all-products?tags=man"
                                    className="nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Man
                                </NavLink>
                                <NavLink
                                    to="/all-products?tags=woman"
                                    className="nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Woman
                                </NavLink>
                                <NavLink
                                    to="/all-products?tags=children"
                                    className="nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Children
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
                            <a className="nav-link cursor-pointer" onClick={toggleSearch}>
                                <i className="bi bi-search"></i>
                            </a>
                            <div className="position-relative">
                                <a className="nav-link cursor-pointer" onClick={toggleWishlist}>
                                    <i className="bi bi-box2-heart"></i>
                                </a>
                                {WishlistItemCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {WishlistItemCount}
                                    </span>
                                )}

                            </div>

                            <div className="position-relative">
                                <a
                                    className="nav-link icon-btn cart-btn cursor-pointer"
                                    onClick={toggleCart}
                                >
                                    <i className="bi bi-cart cursor-pointer"></i>
                                </a>
                                {cartItemCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    {isSearchOpen && (
                        <div className="search-bar container">
                            <SearchBar toggleSearch={toggleSearch} />
                        </div>
                    )}

                    {isCartOpen && (
                        <div className={`cart-dropdown container d-flex justify-content-end ${isCartOpen ? "open" : ""}`}>
                            <Cart toggleCart={toggleCart} isOpen={isCartOpen} />
                        </div>
                    )}

                    {isWishlistOpen && (
                        <div className={`cart-dropdown container d-flex justify-content-end ${isWishlistOpen ? "open" : ""}`}>
                            <Wishlist toggleWishlist={toggleWishlist} isOpen={isWishlistOpen} />
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
