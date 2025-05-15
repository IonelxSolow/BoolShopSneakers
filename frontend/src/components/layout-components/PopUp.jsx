import { useEffect, useState } from 'react';

export default function PopUp() {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle, loading, success, error

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

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleSubscribe = () => {
        // Reset error state
        setEmailError('');
        
        // Validate email
        if (!email.trim()) {
            setEmailError('Please enter your email');
            return;
        }
        
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        
        // Simulate API call
        setSubscribeStatus('loading');
        
        // Fake successful subscription after 1 second
        setTimeout(() => {
            setSubscribeStatus('success');
            
            // Close popup after 2 seconds of showing success message
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }, 1000);
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
                            className={`form-control bg-secondary text-white border-0 ${emailError ? 'is-invalid' : ''}`}
                            name="mailer"
                            id="mailer"
                            value={email}
                            onChange={handleEmailChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter your email"
                            disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    {subscribeStatus === 'success' ? (
                        <div className="alert alert-success mb-2 py-2">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Successfully subscribed!
                        </div>
                    ) : (
                        <button 
                            type="button" 
                            className="btn btn-main-light w-100 mb-2"
                            onClick={handleSubscribe}
                            disabled={subscribeStatus === 'loading'}
                        >
                            {subscribeStatus === 'loading' ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Subscribing...
                                </>
                            ) : 'Subscribe'}
                        </button>
                    )}
                </div>
            </div>
        )
    );
}