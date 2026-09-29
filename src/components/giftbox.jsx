import { useState } from "react";

export default function GiftBox({ onBack }) {
  const [password, setPassword] = useState("");
  const [opened, setOpened] = useState(false);
  const [wrong, setWrong] = useState(false);

  function unlockGift() {
    if (password === "harini") {
      setOpened(true);
      setWrong(false);
    } else {
      setWrong(true);
    }
  }

  return (
    <div className="gift-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      {!opened ? (
        <div className="gift-card">

          <div className="gift-title">
            <h1>GIFT FOR YOU 🎁</h1>
            <p>A little surprise is waiting...</p>
          </div>

          <div className="big-gift">
            🎁
          </div>

          <p>Enter the secret password ❤️</p>

          <input
            type="password"
            placeholder="Secret password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setWrong(false);
            }}
          />

          {wrong && (
            <div className="wrong-password">
              Wrong password 💔
            </div>
          )}

          <button
            className="gift-open-button"
            onClick={unlockGift}
          >
            OPEN MY GIFT ❤️
          </button>

        </div>
      ) : (
        <div className="opened-gift">

          <div className="emoji-rain">
            <span>❤️</span>
            <span>💕</span>
            <span>✨</span>
            <span>💗</span>
            <span>🎀</span>
            <span>❤️</span>
            <span>💖</span>
            <span>✨</span>
            <span>💕</span>
            <span>❤️</span>
          </div>

          <div className="opened-gift-icon">
            🎁
          </div>

          <h1>FOR MY BABY ❤️</h1>

          <p>
            I made this little surprise just for you.
          </p>

          <div className="video-container">
            <video controls playsInline>
              <source
                src="/videos/gift.mp4"
                type="video/mp4"
              />
              Your browser does not support video.
            </video>
          </div>

        </div>
      )}

    </div>
  );
}