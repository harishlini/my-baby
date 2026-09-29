import { useState } from "react";
import "./FindBaby.css";

const babyLocation = {
  lat: 10.924975,
  lng: 78.742160,
};

export default function FindBaby({ onBack }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  function findLocation() {
    setLoading(true);

    setTimeout(() => {
      setLocation(babyLocation);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="find-baby-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      {!location ? (
        <div className="find-baby-card">

          <div className="location-heart">
            📍❤️
          </div>

          <h1>FIND YOUR BABY</h1>

          <p>
            Find my special location 💕
          </p>

          <button
            className="find-button"
            onClick={findLocation}
            disabled={loading}
          >
            {loading
              ? "Finding... 📍"
              : "FIND MY LOCATION ❤️"}
          </button>

        </div>
      ) : (
        <div className="location-result">

          <div className="location-success">
            📍
          </div>

          <h1>FOUND YOU! ❤️</h1>

          <p>
            Your special location is here 💕
          </p>

          <div className="coordinates">
            <b>Latitude:</b> {location.lat}
            <br />
            <b>Longitude:</b> {location.lng}
          </div>

          <a
            className="map-button"
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN LOCATION ON MAP 🗺️
          </a>

          <button
            className="again-button"
            onClick={() => setLocation(null)}
          >
            🔄 FIND AGAIN
          </button>

        </div>
      )}

    </div>
  );
}