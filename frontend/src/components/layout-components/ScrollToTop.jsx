import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Mostra il pulsante quando l'utente scorre più di 300px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Funzione per tornare in cima alla pagina
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="btn btn-main-light position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg"
                    style={{
                        zIndex: 1000,
                        width: "48px",
                        height: "48px",
                        minWidth: "48px",
                        minHeight: "48px",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        right: "2rem",
                        bottom: "2rem",
                        left: "auto",
                        top: "auto"
                    }}
                    aria-label="Torna in cima"
                >
                    <i className="bi bi-arrow-up-short fs-4"></i>
                </button>
            )}
        </>
    );
} 