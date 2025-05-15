import { useEffect, useState } from 'react';

export default function PopUp() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('kickSocietyHasVisited');

        if (!hasVisited) {
            // Show the popup and save the visit
            setShowPopup(true);
            sessionStorage.setItem('kickSocietyHasVisited', 'true');
        }
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
                <div className="popup-content bg-dark text-white rounded shadow p-4 position-relative" style={{ minWidth: 340, maxWidth: 400 }}>
                    <button onClick={handleClose} type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" aria-label="Close"></button>
                    <h2 className="mb-3 text-main-light">Welcome to KickSociety!</h2>
                    <p className="mb-4">Thank you for visiting. Check out our latest sneakers!</p>
                    <div className="mb-3">
                        <label htmlFor="mailer" className="form-label text-main-light">Newsletter</label>
                        <input
                            type="email"
                            className="form-control bg-secondary text-white border-0"
                            name="mailer"
                            id="mailer"
                            aria-describedby="helpId"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button type="button" className="btn btn-main-light w-100 mb-2">Subscribe</button>
                </div>
            </div>
        )
    );
}