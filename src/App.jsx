import ScratchAlbum from "./components/ScratchAlbum";
import { useEffect, useState } from "react";
import "./App.css";
import LoveHistory from "./components/LoveHistory";
import Answers from "./components/Answers";
import GiftBox from "./components/GiftBox";
import FindBaby from "./components/FindBaby";
import PersonalMemories from "./components/PersonalMemories";
import BabyGame from "./components/BabyGame";

function App() {
  const words = ["I", "LOVE", "YOU", "BABY"];

  const [loading, setLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [section, setSection] = useState("home");

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [loveResult, setLoveResult] = useState(null);

  useEffect(() => {
    if (!loading) return;

    if (wordIndex >= words.length) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 700);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setWordIndex((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [wordIndex, loading]);

  function login() {
    if (username === "harishharini@2007" && password === "baby143") {
      setLoggedIn(true);
    } else {
      alert("Wrong username or password ❤️");
    }
  }

  function calculateLove() {
    if (
      name1.trim().toLowerCase() === "harini" &&
      name2.trim().toLowerCase() === "harish"
    ) {
      setLoveResult(101);
    } else {
      setLoveResult(67);
    }
  }

  /* =========================================================
     GLOBAL BACKGROUND
     This stays behind every page
  ========================================================= */

  const GlobalBackground = () => (
    <div className="global-love-background">
      <img src="/love-bg.jpg" alt="" />
      <div className="global-love-overlay"></div>
    </div>
  );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <>
        <GlobalBackground />

        <div className="loading-screen">
          {wordIndex < words.length && (
            <div className="loading-word">
              {words[wordIndex]}
            </div>
          )}
        </div>
      </>
    );
  }

  /* =========================================================
     LOGIN
  ========================================================= */

  if (!loggedIn) {
    return (
      <>
        <GlobalBackground />

        <div className="login-screen">

          <div className="floating-heart heart1">❤️</div>
          <div className="floating-heart heart2">💕</div>
          <div className="floating-heart heart3">💗</div>

          <div className="login-card">

            <div className="big-heart">❤️</div>

            <h1>MY BABY</h1>

            <p>Only for my special person ✨</p>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>
              ENTER MY WORLD ❤️
            </button>

          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     LOVE CALCULATOR
  ========================================================= */

  if (section === "calculator") {
    return (
      <>
        <GlobalBackground />

        <div className="section-page">

          <button
            className="back-button"
            onClick={() => setSection("home")}
          >
            ← Back
          </button>

          <div className="calculator-card">

            <div className="calculator-heart">❤️</div>

            <h1>LOVE CALCULATOR</h1>

            <p>Let's calculate our love...</p>

            <input
              placeholder="Enter your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />

            <input
              placeholder="Enter your boyfriend name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />

            <button
              className="calculate-button"
              onClick={calculateLove}
            >
              CALCULATE OUR LOVE ❤️
            </button>

            {loveResult !== null && (
              <div className="love-result">

                <div className="percentage">
                  {loveResult}%
                </div>

                <h3>❤️</h3>

                <div className="heart-explosion">
                  💕❤️ love connection ❤️💕
                </div>

              </div>
            )}

          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     ANSWERS
  ========================================================= */

  if (section === "questions") {
    return (
      <>
        <GlobalBackground />

        <Answers
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     GIFT
  ========================================================= */

  if (section === "gift") {
    return (
      <>
        <GlobalBackground />

        <GiftBox
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     LOCATION
  ========================================================= */

  if (section === "location") {
    return (
      <>
        <GlobalBackground />

        <FindBaby
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     PERSONAL MEMORIES
  ========================================================= */

  if (section === "memories") {
    return (
      <>
        <GlobalBackground />

        <PersonalMemories
          onBack={() => setSection("home")}
          onOpenSection={(sectionName) =>
            setSection(sectionName)
          }
        />
      </>
    );
  }

  /* =========================================================
     ALBUM
  ========================================================= */

  if (section === "album") {
    return (
      <>
        <GlobalBackground />

        <ScratchAlbum
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     GAME
  ========================================================= */

  if (section === "game") {
    return (
      <>
        <GlobalBackground />

        <BabyGame
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     HISTORY
  ========================================================= */

  if (section === "history") {
    return (
      <>
        <GlobalBackground />

        <LoveHistory
          onBack={() => setSection("home")}
        />
      </>
    );
  }

  /* =========================================================
     OTHER SECTIONS
  ========================================================= */

  if (section !== "home") {
    return (
      <>
        <GlobalBackground />

        <div className="section-page">

          <button
            className="back-button"
            onClick={() => setSection("home")}
          >
            ← Back
          </button>

          <div className="coming-soon">
            <div>❤️</div>
            <h1>{section}</h1>
            <p>
              This beautiful section is coming next...
            </p>
          </div>

        </div>
      </>
    );
  }

  /* =========================================================
     HOME
  ========================================================= */

  return (
    <>
      <GlobalBackground />

      <div className="home">

        <div className="moving-text text1">
          I LOVE YOU BABY ❤️
        </div>

        <div className="moving-text text2">
          I LOVE YOU BABY 💕
        </div>

        <div className="moving-text text3">
          I LOVE YOU BABY ✨
        </div>

        <header>

          <div className="logo-heart">❤️</div>

          <h1>MY BABY</h1>

          <p>
            Welcome to our little world ✨
          </p>

        </header>

        <div className="menu-grid">

          <button
            onClick={() => setSection("calculator")}
          >
            ❤️ Love Calculator
          </button>

          <button
            onClick={() => setSection("album")}
          >
            📸 Our Album
          </button>

          <button
            onClick={() => setSection("history")}
          >
            💌 History of Baby
          </button>

          <button
            onClick={() => setSection("game")}
          >
            🎮 Games of Baby
          </button>

          <button
            onClick={() => setSection("questions")}
          >
            💬 Tell Your Answers
          </button>

          <button
            onClick={() => setSection("gift")}
          >
            🎁 Gift For You
          </button>

          <button
            onClick={() => setSection("location")}
          >
            📍 Find Your Baby
          </button>

          <button
            onClick={() => setSection("memories")}
          >
            🔎 Personal Memories
          </button>

        </div>

      </div>
    </>
  );
}

export default App;