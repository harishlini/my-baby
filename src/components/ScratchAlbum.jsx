import { useEffect, useRef } from "react";

function ScratchCard({ image, title }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 350;
    canvas.height = 300;

    ctx.fillStyle = "#5e24af";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 25px Arial";
    ctx.fillText(
      "SCRATCH OUR",
      canvas.width / 2,
      130
    );

    ctx.font = "bold 35px Arial";
    ctx.fillText(
      "MEMORY ❤️",
      canvas.width / 2,
      180
    );

    ctx.font = "16px Arial";
    ctx.fillText(
      "Scratch to reveal",
      canvas.width / 2,
      220
    );

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  function getPosition(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX =
      e.touches?.[0]?.clientX ?? e.clientX;

    const clientY =
      e.touches?.[0]?.clientY ?? e.clientY;

    return {
      x:
        (clientX - rect.left) *
        (canvas.width / rect.width),

      y:
        (clientY - rect.top) *
        (canvas.height / rect.height)
    };
  }

  function scratch(e) {
    if (!isDrawing.current) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { x, y } = getPosition(e);

    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    createHeart(e.clientX, e.clientY);
  }

  function startScratch(e) {
    isDrawing.current = true;
    scratch(e);
  }

  function stopScratch() {
    isDrawing.current = false;
  }

  function createHeart(x, y) {
    const heart = document.createElement("div");

    heart.innerText = "❤️";

    heart.style.position = "fixed";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = "none";
    heart.style.fontSize = "20px";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    heart.animate(
      [
        {
          transform: "translateY(0) scale(1)",
          opacity: 1
        },
        {
          transform:
            "translateY(-80px) translateX(20px) scale(1.5)",
          opacity: 0
        }
      ],
      {
        duration: 900,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      heart.remove();
    }, 900);
  }

  return (
    <div className="scratch-card">

      <div className="photo-container">

        <img
          src={image}
          alt={title}
          className="memory-photo"
        />

        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={startScratch}
          onMouseMove={scratch}
          onMouseUp={stopScratch}
          onMouseLeave={stopScratch}
          onTouchStart={startScratch}
          onTouchMove={scratch}
          onTouchEnd={stopScratch}
        />

      </div>

      <h3>{title}</h3>

    </div>
  );
}

export default function ScratchAlbum({ onBack }) {
  return (
    <div className="album-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="album-heading">
        <div>📸</div>

        <h1>OUR ALBUM</h1>

        <p>
          Scratch the memories ❤️
        </p>
      </div>

      <div className="scratch-grid">

        <ScratchCard
          image="/photos/photo1.jpg"
          title="Our First Memory ❤️"
        />

        <ScratchCard
          image="/photos/photo2.jpg"
          title="Our Special Moment 💕"
        />

        <ScratchCard
          image="/photos/photo3.jpg"
          title="Forever Memory 💗"
        />

      </div>

    </div>
  );
}