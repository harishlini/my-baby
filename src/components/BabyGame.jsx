import { useEffect, useMemo, useState } from "react";
import "./BabyGame.css";

import harishPhoto from "../assets/harish.jpg";
import hariniPhoto from "../assets/harini.jpg";

const TOTAL_LEVELS = 10;

const levels = [
  {
    title: "Missing Heart",
    subtitle: "Find the hidden heart",
  },
  {
    title: "Memory Match",
    subtitle: "Match the same pictures",
  },
  {
    title: "Love Tiles",
    subtitle: "Arrange the photo correctly",
  },
  {
    title: "Hidden Love",
    subtitle: "Find the hidden heart inside the photo",
  },
  {
    title: "Rotate My Love",
    subtitle: "Rotate every tile into the correct position",
  },
  {
    title: "Who Is It?",
    subtitle: "Choose the correct picture",
  },
  {
    title: "3 × 3 Love Puzzle",
    subtitle: "Complete the picture",
  },
  {
    title: "Couple Match",
    subtitle: "Match Harish and Harini",
  },
  {
    title: "Secret Love Code",
    subtitle: "Find the correct 4-digit code",
  },
  {
    title: "Catch My Love",
    subtitle: "Catch 5 hearts to complete the journey",
  },
];

function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function createTiles() {
  return shuffle(
    Array.from({ length: 9 }, (_, index) => index)
  );
}

function createRotations() {
  return Array.from({ length: 9 }, () => {
    const values = [0, 90, 180, 270];

    return values[Math.floor(Math.random() * values.length)];
  });
}

function tileStyle(image, index) {
  const row = Math.floor(index / 3);
  const col = index % 3;

  return {
    backgroundImage: `url(${image})`,
    backgroundSize: "300% 300%",
    backgroundPosition: `${col * 50}% ${row * 50}%`,
  };
}

export default function BabyGame({ onBack }) {
  const [started, setStarted] = useState(false);

  const [level, setLevel] = useState(1);

  const [completed, setCompleted] = useState([]);

  const [message, setMessage] = useState("");

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(0);

  const [showLevelComplete, setShowLevelComplete] =
    useState(false);

  const [gameFinished, setGameFinished] =
    useState(false);

  const [hint, setHint] = useState(false);

  /* LEVEL 1 */
  const [heartPosition, setHeartPosition] = useState({
    top: 45,
    left: 50,
  });

  /* LEVEL 2 */
  const [memoryCards, setMemoryCards] = useState([]);
  const [memoryOpen, setMemoryOpen] = useState([]);
  const [memoryMatched, setMemoryMatched] = useState([]);

  /* LEVEL 3 / 7 */
  const [tiles, setTiles] = useState([]);

  /* LEVEL 4 */
  const [hiddenHeartFound, setHiddenHeartFound] =
    useState(false);

  /* LEVEL 5 */
  const [rotations, setRotations] = useState([]);

  /* LEVEL 6 */
  const [selectedPhoto, setSelectedPhoto] =
    useState(null);

  /* LEVEL 8 */
  const [coupleCards, setCoupleCards] = useState([]);
  const [coupleOpen, setCoupleOpen] = useState([]);
  const [coupleMatched, setCoupleMatched] =
    useState([]);

  /* LEVEL 9 */
  const [code, setCode] = useState("");

  /* LEVEL 10 */
  const [finalHeartCount, setFinalHeartCount] =
    useState(0);

  const currentLevel = levels[level - 1];

  const photoOptions = useMemo(
    () =>
      shuffle([
        {
          id: "harish",
          image: harishPhoto,
          name: "Harish",
        },
        {
          id: "harini",
          image: hariniPhoto,
          name: "Harini",
        },
        {
          id: "both",
          image: harishPhoto,
          name: "Love",
        },
      ]),
    [level]
  );

  useEffect(() => {
    if (!started || showLevelComplete || gameFinished) {
      return;
    }

    const timer = setInterval(() => {
      setTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    started,
    showLevelComplete,
    gameFinished,
    level,
  ]);

  function startGame() {
    setStarted(true);
    setLevel(1);
    setCompleted([]);
    setScore(0);
    setTime(0);
    setGameFinished(false);
    setShowLevelComplete(false);

    prepareLevel(1);
  }

  function prepareLevel(nextLevel) {
    setHint(false);
    setMessage("");

    setHeartPosition({
      top: Math.floor(Math.random() * 60) + 20,
      left: Math.floor(Math.random() * 70) + 15,
    });

    const cards = shuffle([
      {
        id: 1,
        pair: "harish",
        image: harishPhoto,
      },
      {
        id: 2,
        pair: "harish",
        image: harishPhoto,
      },
      {
        id: 3,
        pair: "harini",
        image: hariniPhoto,
      },
      {
        id: 4,
        pair: "harini",
        image: hariniPhoto,
      },
    ]);

    setMemoryCards(cards);
    setMemoryOpen([]);
    setMemoryMatched([]);

    setTiles(createTiles());

    setRotations(createRotations());

    setHiddenHeartFound(false);

    setSelectedPhoto(null);

    const couple = shuffle([
      {
        id: 1,
        pair: "harish",
        image: harishPhoto,
      },
      {
        id: 2,
        pair: "harish",
        image: harishPhoto,
      },
      {
        id: 3,
        pair: "harini",
        image: hariniPhoto,
      },
      {
        id: 4,
        pair: "harini",
        image: hariniPhoto,
      },
    ]);

    setCoupleCards(couple);
    setCoupleOpen([]);
    setCoupleMatched([]);

    setCode("");

    /* LEVEL 10 */
    setFinalHeartCount(0);
  }

  function finishLevel() {
    setShowLevelComplete(true);

    setCompleted((previous) => {
      if (previous.includes(level)) {
        return previous;
      }

      return [...previous, level];
    });

    setScore((previous) => previous + 100);
  }

  function nextLevel() {
    if (level >= TOTAL_LEVELS) {
      setGameFinished(true);
      setShowLevelComplete(false);
      return;
    }

    const next = level + 1;

    setLevel(next);

    setShowLevelComplete(false);

    prepareLevel(next);
  }

  /* LEVEL SKIP */
  function skipToLevel(selectedLevel) {
    const nextLevel = Number(selectedLevel);

    setLevel(nextLevel);
    setShowLevelComplete(false);
    setGameFinished(false);

    prepareLevel(nextLevel);
  }

  /* LEVEL 1 */
  function collectHeart() {
    finishLevel();
  }

  /* LEVEL 2 */
  function openMemoryCard(index) {
    if (
      memoryOpen.includes(index) ||
      memoryMatched.includes(index) ||
      memoryOpen.length >= 2
    ) {
      return;
    }

    const nextOpen = [...memoryOpen, index];

    setMemoryOpen(nextOpen);

    if (nextOpen.length === 2) {
      const first = memoryCards[nextOpen[0]];
      const second = memoryCards[nextOpen[1]];

      if (first.pair === second.pair) {
        setTimeout(() => {
          setMemoryMatched((previous) => [
            ...previous,
            nextOpen[0],
            nextOpen[1],
          ]);

          setMemoryOpen([]);

          const matchedCount =
            memoryMatched.length + 2;

          if (matchedCount >= 4) {
            finishLevel();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryOpen([]);
        }, 800);
      }
    }
  }

  /* LEVEL 3 */
  function moveTile(index) {
    const emptyIndex = tiles.indexOf(8);

    const row = Math.floor(index / 3);
    const col = index % 3;

    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    const distance =
      Math.abs(row - emptyRow) +
      Math.abs(col - emptyCol);

    if (distance !== 1) {
      return;
    }

    const newTiles = [...tiles];

    [newTiles[index], newTiles[emptyIndex]] =
      [newTiles[emptyIndex], newTiles[index]];

    setTiles(newTiles);

    const solved = newTiles.every(
      (value, position) => value === position
    );

    if (solved) {
      finishLevel();
    }
  }

  /* LEVEL 4 */
  function findHiddenHeart() {
    if (!hiddenHeartFound) {
      setHiddenHeartFound(true);

      setTimeout(() => {
        finishLevel();
      }, 400);
    }
  }

  /* LEVEL 5 */
  function rotateTile(index) {
    const newRotations = [...rotations];

    newRotations[index] =
      (newRotations[index] + 90) % 360;

    setRotations(newRotations);

    const solved = newRotations.every(
      (rotation) => rotation === 0
    );

    if (solved) {
      finishLevel();
    }
  }

  /* LEVEL 6 */
  function choosePhoto(id) {
    setSelectedPhoto(id);

    if (id === "harini") {
      setTimeout(() => {
        finishLevel();
      }, 400);
    }
  }

  /* LEVEL 8 */
  function openCoupleCard(index) {
    if (
      coupleOpen.includes(index) ||
      coupleMatched.includes(index) ||
      coupleOpen.length >= 2
    ) {
      return;
    }

    const nextOpen = [...coupleOpen, index];

    setCoupleOpen(nextOpen);

    if (nextOpen.length === 2) {
      const first = coupleCards[nextOpen[0]];
      const second = coupleCards[nextOpen[1]];

      if (first.pair === second.pair) {
        setTimeout(() => {
          const newMatched = [
            ...coupleMatched,
            nextOpen[0],
            nextOpen[1],
          ];

          setCoupleMatched(newMatched);

          setCoupleOpen([]);

          if (newMatched.length >= 4) {
            finishLevel();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCoupleOpen([]);
        }, 800);
      }
    }
  }

  /* LEVEL 9 */
  function addCode(number) {
    if (code.length >= 4) {
      return;
    }

    const newCode = code + number;

    setCode(newCode);

    if (newCode === "2409") {
      setTimeout(() => {
        finishLevel();
      }, 400);
    }
  }

  function clearCode() {
    setCode("");
  }

  /* LEVEL 10 - NEW GAME */
  function catchFinalHeart() {
    const nextCount = finalHeartCount + 1;

    setFinalHeartCount(nextCount);

    if (nextCount >= 5) {
      setTimeout(() => {
        finishLevel();
      }, 400);

      return;
    }

    setHeartPosition({
      top: Math.floor(Math.random() * 60) + 20,
      left: Math.floor(Math.random() * 70) + 15,
    });
  }

  function showHint() {
    setHint(true);

    setTimeout(() => {
      setHint(false);
    }, 3000);
  }

  function renderMemoryCards(
    cards,
    open,
    matched,
    onClick
  ) {
    return (
      <div className="memory-grid">
        {cards.map((card, index) => {
          const visible =
            open.includes(index) ||
            matched.includes(index);

          return (
            <button
              key={card.id}
              className={`memory-card ${
                visible ? "memory-visible" : ""
              }`}
              onClick={() => onClick(index)}
            >
              {visible ? (
                <img
                  src={card.image}
                  alt=""
                />
              ) : (
                <span>❤️</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  function renderSlidingPuzzle(
    puzzleTiles,
    image,
    onMove
  ) {
    return (
      <div className="tile-puzzle">
        {puzzleTiles.map((tile, index) => {
          if (tile === 8) {
            return (
              <button
                key={index}
                className="empty-tile"
                onClick={() => onMove(index)}
              />
            );
          }

          return (
            <button
              key={index}
              className="image-tile"
              style={tileStyle(image, tile)}
              onClick={() => onMove(index)}
            />
          );
        })}
      </div>
    );
  }

  /* START */
  if (!started) {
    return (
      <div className="baby-game">

        <button
          className="game-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="game-start">

          <div className="start-glow">
            ❤️
          </div>

          <h1>
            OUR LOVE
            <span>PUZZLE JOURNEY</span>
          </h1>

          <p>
            10 levels.
            <br />
            10 little challenges.
            <br />
            One beautiful ending. ❤️
          </p>

          <div className="start-couple">

            <div>
              <img
                src={harishPhoto}
                alt="Harish"
              />

              <span>HARISH</span>
            </div>

            <strong>❤️</strong>

            <div>
              <img
                src={hariniPhoto}
                alt="Harini"
              />

              <span>HARINI</span>
            </div>

          </div>

          <button
            className="main-game-button"
            onClick={startGame}
          >
            START THE JOURNEY 💖
          </button>

          <div className="level-preview">
            10 LEVELS • 1 LOVE STORY
          </div>

        </div>
      </div>
    );
  }

  /* FINAL */
  if (gameFinished) {
    return (
      <div className="baby-game final-screen">

        <div className="final-card">

          <div className="final-fireworks">
            💕 ✨ ❤️ ✨ 💕
          </div>

          <h1>
            YOU DID IT!
          </h1>

          <p className="final-small">
            All 10 puzzles completed.
          </p>

          <div className="final-photos">

            <img
              src={harishPhoto}
              alt="Harish"
            />

            <div className="big-heart">
              ❤️
            </div>

            <img
              src={hariniPhoto}
              alt="Harini"
            />

          </div>

          <h2>
            HARISH ❤️ HARINI
          </h2>

          <p className="final-message">
            Some puzzles have one answer.
            <br />
            But our story has only one ending...
            <br />
            <strong>TOGETHER. ❤️</strong>
          </p>

          <div className="forever">
            ♾️ OUR LOVE FOREVER ♾️
          </div>

          <button
            className="main-game-button"
            onClick={() => {
              setStarted(false);
              setGameFinished(false);
            }}
          >
            PLAY AGAIN 💕
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="baby-game">

      <button
        className="game-back"
        onClick={onBack}
      >
        ← Back
      </button>

      {/* TOP */}
      <div className="game-top">

        <div className="game-title">

          <span>
            LEVEL {level}
          </span>

          <h1>
            {currentLevel.title}
          </h1>

          <p>
            {currentLevel.subtitle}
          </p>

        </div>

        <div className="game-stats">

          <div>
            ❤️
            <b>{score}</b>
          </div>

          <div>
            ⏱️
            <b>{time}s</b>
          </div>

        </div>

      </div>

      {/* LEVEL BAR */}
      <div className="level-bar">

        {levels.map((item, index) => {
          const number = index + 1;

          return (
            <button
              key={number}
              className={`
                level-dot
                ${number === level ? "active" : ""}
                ${
                  completed.includes(number)
                    ? "completed"
                    : ""
                }
              `}
              onClick={() => {
                if (
                  completed.includes(number) ||
                  number === 1
                ) {
                  setLevel(number);
                  prepareLevel(number);
                  setShowLevelComplete(false);
                }
              }}
            >
              {completed.includes(number)
                ? "✓"
                : number}
            </button>
          );
        })}

      </div>

      {/* LEVEL SKIP OPTION */}
      <div className="level-skip-box">
        <span>🚀 Skip to Level</span>

        <select
          value={level}
          onChange={(e) =>
            skipToLevel(e.target.value)
          }
        >
          {levels.map((item, index) => (
            <option
              key={index + 1}
              value={index + 1}
            >
              Level {index + 1} — {item.title}
            </option>
          ))}
        </select>
      </div>

      {/* GAME CARD */}
      <div className="game-card">

        {/* LEVEL 1 */}
        {level === 1 && (
          <div className="level-content">

            <h2>
              Find the hidden heart 💗
            </h2>

            <p>
              Don't click randomly...
              <br />
              Find the glowing heart.
            </p>

            <div className="heart-hunt">

              <div className="photo-half">
                <img
                  src={harishPhoto}
                  alt=""
                />
              </div>

              <button
                className="hidden-heart"
                style={{
                  top: `${heartPosition.top}%`,
                  left: `${heartPosition.left}%`,
                }}
                onClick={collectHeart}
              >
                ❤️
              </button>

            </div>

          </div>
        )}

        {/* LEVEL 2 */}
        {level === 2 && (
          <div className="level-content">

            <h2>
              Memory Match 🃏
            </h2>

            <p>
              Find both Harish cards and both Harini cards.
            </p>

            {renderMemoryCards(
              memoryCards,
              memoryOpen,
              memoryMatched,
              openMemoryCard
            )}

          </div>
        )}

        {/* LEVEL 3 */}
        {level === 3 && (
          <div className="level-content">

            <h2>
              Arrange My Love 🧩
            </h2>

            <p>
              Move the tiles and complete the photo.
            </p>

            {renderSlidingPuzzle(
              tiles,
              harishPhoto,
              moveTile
            )}

            {hint && (
              <div className="hint-box">
                Start by moving the tiles around the empty space.
              </div>
            )}

            <button
              className="hint-button"
              onClick={showHint}
            >
              💡 HINT
            </button>

          </div>
        )}

        {/* LEVEL 4 */}
        {level === 4 && (
          <div className="level-content">

            <h2>
              Hidden Love 🔍
            </h2>

            <p>
              Somewhere inside this picture...
              <br />
              there is one hidden heart.
            </p>

            <div
              className="hidden-photo"
              onClick={findHiddenHeart}
            >
              <img
                src={hariniPhoto}
                alt=""
              />

              <div className="search-zone zone-one" />
              <div className="search-zone zone-two" />
              <div className="search-zone zone-three" />

              {hiddenHeartFound && (
                <div className="found-heart">
                  ❤️
                </div>
              )}
            </div>

          </div>
        )}

        {/* LEVEL 5 */}
        {level === 5 && (
          <div className="level-content">

            <h2>
              Rotate My Love 🔄
            </h2>

            <p>
              Rotate every tile until the picture is straight.
            </p>

            <div className="rotate-grid">

              {rotations.map(
                (rotation, index) => (
                  <button
                    key={index}
                    className="rotate-tile"
                    style={{
                      ...tileStyle(
                        hariniPhoto,
                        index
                      ),
                      transform: `rotate(${rotation}deg)`,
                    }}
                    onClick={() =>
                      rotateTile(index)
                    }
                  >
                    <span>
                      ↻
                    </span>
                  </button>
                )
              )}

            </div>

          </div>
        )}

        {/* LEVEL 6 */}
        {level === 6 && (
          <div className="level-content">

            <h2>
              Who Is Your Baby? 💕
            </h2>

            <p>
              Choose the correct answer.
            </p>

            <div className="choice-grid">

              {photoOptions.map((item) => (
                <button
                  key={item.id}
                  className={`
                    photo-choice
                    ${
                      selectedPhoto === item.id
                        ? "selected"
                        : ""
                    }
                  `}
                  onClick={() =>
                    choosePhoto(item.id)
                  }
                >
                  <img
                    src={item.image}
                    alt=""
                  />

                  <span>
                    {item.name}
                  </span>
                </button>
              ))}

            </div>

            {selectedPhoto &&
              selectedPhoto !== "harini" && (
                <div className="wrong-answer">
                  Hmm... try again 😜
                </div>
              )}

          </div>
        )}

        {/* LEVEL 7 */}
        {level === 7 && (
          <div className="level-content">

            <h2>
              3 × 3 Love Puzzle 🧩
            </h2>

            <p>
              Complete Harini's picture.
            </p>

            {renderSlidingPuzzle(
              tiles,
              hariniPhoto,
              moveTile
            )}

          </div>
        )}

        {/* LEVEL 8 */}
        {level === 8 && (
          <div className="level-content">

            <h2>
              Couple Match 💞
            </h2>

            <p>
              Match the couple cards.
            </p>

            {renderMemoryCards(
              coupleCards,
              coupleOpen,
              coupleMatched,
              openCoupleCard
            )}

          </div>
        )}

        {/* LEVEL 9 */}
        {level === 9 && (
          <div className="level-content">

            <h2>
              Secret Love Code 🔐
            </h2>

            <p>
              Enter our special date code.
            </p>

            <div className="code-display">
              {code || "____"}
            </div>

            <div className="number-pad">

              {[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                0,
              ].map((number) => (
                <button
                  key={number}
                  onClick={() =>
                    addCode(number)
                  }
                >
                  {number}
                </button>
              ))}

              <button
                className="clear-code"
                onClick={clearCode}
              >
                CLEAR
              </button>

            </div>

            <div className="code-hint">
              💡 Hint: Her special day...
            </div>

          </div>
        )}

        {/* LEVEL 10 - NEW GAME */}
        {level === 10 && (
          <div className="level-content">

            <h2>
              Catch My Love 💖
            </h2>

            <p>
              Catch the heart 5 times!
              <br />
              Every heart brings you closer to the ending. ❤️
            </p>

            <div className="heart-hunt">

              <div className="photo-half">
                <img
                  src={hariniPhoto}
                  alt="Harini"
                />
              </div>

              <button
                className="hidden-heart"
                style={{
                  top: `${heartPosition.top}%`,
                  left: `${heartPosition.left}%`,
                }}
                onClick={catchFinalHeart}
              >
                ❤️
              </button>

            </div>

            <div
              style={{
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              💕 Hearts caught: {finalHeartCount}/5
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "15px",
              }}
            >
              Catch every heart to unlock the final surprise 💖
            </div>

          </div>
        )}

        {/* LEVEL COMPLETE */}
        {showLevelComplete && (
          <div className="level-complete">

            <div className="complete-heart">
              ❤️
            </div>

            <h2>
              LEVEL {level} COMPLETE!
            </h2>

            <p>
              You found another piece
              of our love story.
            </p>

            <div className="earned">
              +100 ❤️
            </div>

            <button
              className="next-button"
              onClick={nextLevel}
            >
              {level === TOTAL_LEVELS
                ? "FINISH ❤️"
                : "NEXT LEVEL →"}
            </button>

          </div>
        )}

      </div>

      <div className="bottom-message">
        {completed.length}/10 puzzles completed
        <span> • </span>
        Keep going, Baby ❤️
      </div>

    </div>
  );
}