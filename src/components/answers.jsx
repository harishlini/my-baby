import { useState } from "react";

const questions = [
  {
    question: "When did we have our first kiss? ❤️",
    correctAnswer: "Jan 7",
    options: [
      "Feb 8",
      "Jan 7",
      "April 4",
      "Jan 1",
    ],
  },
  {
    question: "How many times have we stayed in a room together? ❤️",
    correctAnswer: "6 times",
    options: [
      "4 times",
      "7 times",
      "5 times",
      "6 times",
    ],
  },
  {
    question: "What do I like the most? ❤️",
    options: [
      "Gulab Jamun 🍯",
      "Halwa 🍬",
      "Pongal 🍚",
      "Ice Cream 🍦",
    ],
  },
];

export default function Answers({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  function selectAnswer(answer) {
    // Question 3
    if (current === 2) {
      const updated = [...answers];
      updated[current] = answer;
      setAnswers(updated);

      setShowWrong(true);

      setTimeout(() => {
        setShowWrong(false);
        setShowSurprise(true);
      }, 1200);

      return;
    }

    // Check correct answer
    if (answer !== questions[current].correctAnswer) {
      setShowWrong(true);

      setTimeout(() => {
        setShowWrong(false);
      }, 1200);

      return;
    }

    // Save correct answer
    const updated = [...answers];
    updated[current] = answer;
    setAnswers(updated);

    // Creative question transition
    setIsChanging(true);

    setTimeout(() => {
      setCurrent(current + 1);
      setIsChanging(false);
    }, 650);
  }

  function nextQuestion() {
    if (!answers[current]) {
      alert("Please choose an answer ❤️");
      return;
    }

    if (current < questions.length - 1) {
      setIsChanging(true);

      setTimeout(() => {
        setCurrent(current + 1);
        setShowSurprise(false);
        setShowWrong(false);
        setIsChanging(false);
      }, 650);
    } else {
      localStorage.setItem(
        "hariniAnswers",
        JSON.stringify(answers)
      );

      alert("Your answers are saved ❤️");

      setCurrent(0);
      setAnswers([]);
      setShowSurprise(false);
      setShowWrong(false);
    }
  }

  const q = questions[current];

  return (
    <div className="answers-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div
        className={`answers-card ${
          isChanging ? "question-changing" : ""
        }`}
      >

        <div className="answers-heart">
          💌
        </div>

        <p className="question-number">
          Question {current + 1} / {questions.length}
        </p>

        <h1>Tell Your Answers</h1>

        <h2>{q.question}</h2>

        <div className="answer-options">

          {q.options.map((option, index) => (
            <button
              key={index}
              className={
                answers[current] === option
                  ? "answer-option selected"
                  : "answer-option"
              }
              onClick={() => selectAnswer(option)}
              disabled={current === 2 && showSurprise}
            >
              {option}
            </button>
          ))}

        </div>

        {showWrong && (
          <div className="wrong-answer">
            ❌ Not this one... Try again ❤️
          </div>
        )}

        {showSurprise && (
          <div className="love-surprise">

            <div className="surprise-heart">
              ❤️
            </div>

            <h2>
              Actually...
            </h2>

            <p>
              The thing I like the most is
            </p>

            <h1>
              YOU, BABY! ❤️
            </h1>

            <p>
              None of those options can beat you. 💕
            </p>

          </div>
        )}

        {current === 2 && showSurprise && (
          <button
            className="next-answer"
            onClick={nextQuestion}
          >
            SUBMIT ❤️
          </button>
        )}

      </div>

    </div>
  );
}