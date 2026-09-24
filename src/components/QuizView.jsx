import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ProgressBar from './ProgressBar.jsx';

export default function QuizView({ quiz, onComplete, onExit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const question = quiz.questions[currentQuestionIndex];

  function submitAnswer() {
    if (selectedAnswer === null || answerSubmitted) return;
    const answer = { questionId: question.id, selectedAnswer };
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    setAnswerSubmitted(true);
  }

  function nextQuestion() {
    if (currentQuestionIndex === quiz.questions.length - 1) {
      onComplete(answers);
      return;
    }
    setCurrentQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  }

  return (
    <main className="workspace">
      <button type="button" className="back-link" onClick={onExit}>
        <span aria-hidden="true">←</span> Back to your notes
      </button>
      <div className="quiz-heading">
        <div>
          <span className="eyebrow">FOCUS SESSION</span>
          <h1>{quiz.topic}</h1>
          <p>{quiz.title}</p>
        </div>
        <span className={`difficulty-pill ${quiz.difficulty.toLowerCase()}`}>
          {quiz.difficulty}
        </span>
      </div>
      <div className="quiz-layout">
        <div className="quiz-main">
          <ProgressBar current={currentQuestionIndex} total={quiz.questions.length} />
          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            answerSubmitted={answerSubmitted}
            onSelect={setSelectedAnswer}
          />
          {!answerSubmitted ? (
            <button
              className="button button-primary action-button"
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
            >
              Check my answer <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className="button button-primary action-button" onClick={nextQuestion}>
              {currentQuestionIndex === quiz.questions.length - 1
                ? 'See my results'
                : 'Next question'}{' '}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <aside className="study-aside">
          <div className="aside-icon">✧</div>
          <h3>
            A little progress
            <br />
            goes a long way.
          </h3>
          <p>Take your time. Read each option carefully and trust what you’ve learned.</p>
          <div className="aside-bottom">
            <span className="aside-line" />
            YOU’VE GOT THIS
          </div>
        </aside>
      </div>
    </main>
  );
}
