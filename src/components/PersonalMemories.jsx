import { useState } from "react";
import "./PersonalMemories.css";

export default function PersonalMemories({ onBack, onOpenSection }) {
  const [search, setSearch] = useState("");
  const [secret, setSecret] = useState(false);

  function handleSearch() {
    const value = search.trim().toLowerCase();

    if (value === "i love you") {
      setSecret(true);
      return;
    }

    if (value === "album") {
      onOpenSection("album");
    } else if (value === "history") {
      onOpenSection("history");
    } else if (value === "answers") {
      onOpenSection("questions");
    } else if (value === "gift") {
      onOpenSection("gift");
    } else if (value === "location") {
      onOpenSection("location");
    } else if (value === "love") {
      onOpenSection("calculator");
    } else {
      alert("Memory not found 💭❤️");
    }
  }

  return (
    <div className="personal-memories-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      {!secret ? (
        <div className="memories-card">

          <div className="memory-icon">
            💗
          </div>

          <h1>PERSONAL MEMORIES</h1>

          <p className="memory-subtitle">
            Some memories are waiting to be discovered...
          </p>

          <div className="memory-search-box">

            <input
              type="text"
              placeholder="Search your memory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              🔎 SEARCH
            </button>

          </div>

          <p className="memory-hint">
            💭 Search for a special memory...
          </p>

        </div>
      ) : (
        <div className="secret-memory">

          <div className="heart-rain">
            ❤️ 💕 💗 💖 💘 ❤️ 💕 💗 💖
          </div>

          <div className="big-heart">
            ❤️
          </div>

          <h1>
            LOVE YOU TOO BABY
          </h1>

          <p>
            ... 💕
          </p>

          <div className="secret-chat">
            <div className="chat-message">
              💬 love you soo much ❤️
            </div>
          </div>

          <button
            className="secret-close"
            onClick={() => {
              setSecret(false);
              setSearch("");
            }}
          >
            💗 BACK TO MEMORIES
          </button>

        </div>
      )}

    </div>
  );
}