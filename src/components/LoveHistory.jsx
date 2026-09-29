import { useEffect, useState } from "react";

export default function LoveHistory({ onBack }) {
  const story = `Once upon a time, two hearts found a beautiful reason to smile...

💕🌙 நம்ம கதை — “நீ மட்டும்தான்” 🌙💕

Harini… 🥹❤️
இது வெறும் ஒரு கதை இல்ல…
இது எனக்கு நடந்த உண்மையான கதை. 💕✨

எனக்கு நினைவு தெரிந்த நாளிலிருந்து… 🌍💭
நான் பார்த்தவர்களில் 👀❤️
என் மனசுக்கு பிடித்த மாதிரியும் 🥰
எனக்காகவே படைக்கப்பட்டவள் மாதிரியும் ✨🫶
இருக்கிற ஒரே பொண்ணு…

அது நீதான்… ❤️🥹
நீ மட்டும்தான்… 💕🫵🏻🌹

நீ என்னை எவ்வளவு நல்லா பார்த்துக்கிற தெரியுமா? 🥹🫶🏻
ஒரு தாய் தன்னோட குழந்தையை 👩‍👦❤️
எப்படி அன்போடும் 🥰
அக்கறையோடும் 🤗
பாசத்தோடும் 💕 பார்த்துக்குவாளோ…

அதே மாதிரி… என்னை நீ பார்த்துக்கிற. 🥹❤️🫂

நான் உன்னை எவ்வளவோ கஷ்டப்படுத்தியிருக்கேன்… 😔💔
எவ்வளவோ சொல்லி திட்டியிருக்கேன்… 🥺
சில நேரம் உன்னை புரிஞ்சுக்காம நடந்திருக்கேன்… 😞💭

அதுக்காக என்னை மன்னிச்சிடு Harini… 🥹🙏🏻❤️

ஆனா… இத்தனைக்கும் பிறகும்… 🥺💗
நீ என்னை விட்டுப் போனதே இல்லை. 🫂❤️
ஒரு நாள்கூட என்னோட பேசாம இருந்ததே இல்லை. 🥹💕

அதுதான் எனக்கு இன்னும் ஆச்சரியம்… ✨🥹
என் குறைகளோட என்னை ஏத்துக்கிட்ட ஒரே மனசு…
உன்னோட மனசுதான். ❤️🫶🏻

நீ என் வாழ்க்கையில் வந்தது… 🌹✨
ஒரு சாதாரண விஷயம் இல்ல… ❤️

எனக்கு கிடைத்த அழகான வரம் நீதான். 🎁🥹💕
என் வாழ்க்கையின் அழகான நினைவு நீதான். 📸❤️
என் மனசுக்கு நிம்மதி நீதான். 🌙🫶🏻

எத்தனை நாட்கள் கடந்தாலும்… ⏳❤️
எத்தனை விஷயங்கள் மாறினாலும்… 🌎✨

என் மனசுக்கு பிடித்தவள் நீதான். ❤️
என்னை புரிஞ்சுக்கிட்டவள் நீதான். 🥹🫂
என்னை விட்டுப் போகாம இருந்தவள் நீதான். 💕
என் Baby-யும் நீதான். 🫶🏻👶🏻❤️

🌹 Harini… 🌹
என் வாழ்க்கையில் நீ இருக்கும் ஒவ்வொரு நாளும்
எனக்கு ஒரு அழகான நினைவு. 🥹❤️✨

I LOVE YOU DI MY BABY ❤️🥹🫶🏻💋💕🌹✨
UMMAAA 😘❤️🫂💋
And this story is still being written...`;

  const [text, setText] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setText(story.slice(0, index + 1));
      index++;

      if (index >= story.length) {
        clearInterval(timer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, []);

  function toggleMusic() {
    const audio = document.getElementById("love-song");

    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play();
      setMusicPlaying(true);
    }
  }

  return (
    <div className="history-page">

      <div className="history-hearts">
        <span>❤️</span>
        <span>💕</span>
        <span>💗</span>
        <span>❤️</span>
        <span>💖</span>
        <span>💕</span>
      </div>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="history-content">

        <div className="history-icon">
          💌
        </div>

        <h1>HISTORY OF BABY</h1>

        <div className="story-line"></div>

        <div className="story-card">
          <p>{text}</p>
        </div>

        <button
          className="music-button"
          onClick={toggleMusic}
        >
          {musicPlaying
            ? "⏸️ Pause Our Song"
            : "🎵 Play Our Song"}
        </button>

        <audio id="love-song" loop>
          <source
            src="/music/story.mp3"
            type="audio/mpeg"
          />
        </audio>

      </div>

    </div>
  );
}