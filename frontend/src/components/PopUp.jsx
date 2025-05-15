import { useEffect, useState } from 'react';

export default function PopUp() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('kickSocietyHasVisited');

        if (!hasVisited) {
            // Mostra il popup e salva la visita
            setShowPopup(true);
            sessionStorage.setItem('kickSocietyHasVisited', 'true');
        }
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Benvenuto su KickSociety!</h2>
                    <p>Grazie per la tua visita. Dai un'occhiata alle nostre ultime sneaker!</p>
                    <div class="mb-3">
                        <label for="" class="form-label">Newsletter</label>
                        <input
                            type="text"
                            class="form-control"
                            name="mailer"
                            id="mailer"
                            aria-describedby="helpId"
                            placeholder="Inserisci la tua email"
                        />
                    </div>
                    <button type="button">Invia</button>

                    <button onClick={handleClose}>Chiudi</button>
                </div>
            </div>
        )
    );
}