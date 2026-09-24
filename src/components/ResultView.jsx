import React from 'react';

import QuestionReview from './QuestionReview.jsx';

export default function ResultView({ quiz, answers, onRetry, onNewQuiz, retryMessage }) {
  const correct = answers.filter(
    (answer) =>
      quiz.questions.find((question) => question.id === answer.questionId)?.correctAnswer ===
      answer.selectedAnswer,
  ).length;
  const total = quiz.questions.length;
  const incorrect = total - correct;
  const percentage = Math.round((correct / total) * 100);
  const performance =
    percentage === 100
      ? 'A perfect score. You really know your stuff.'
      : percentage >= 70
        ? 'You’re building a solid understanding.'
        : percentage >= 40
          ? 'A good start. A little more practice goes a long way.'
          : 'Every attempt is progress. Keep at it.';

  return (
    <main className="result-workspace">
      <section className="score-card">
        <div className="score-decoration score-decoration-one">✳</div>
        <div className="score-decoration score-decoration-two">✧</div>
        <span className="eyebrow">THAT’S A WRAP</span>
        <h1>{percentage === 100 ? 'Beautifully done.' : 'You showed up.'}</h1>
        <p className="score-topic">{quiz.topic}</p>
        <div className="score-number">
          {correct}
          <span> / {total}</span>
        </div>
        <p className="score-percent">
          {percentage}% <span>correct</span>
        </p>
        <p className="performance-message">{performance}</p>
        <div className="score-stats">
          <div>
            <strong>{correct}</strong>
            <span>Correct</span>
          </div>
          <span className="stats-divider" />
          <div>
            <strong>{incorrect}</strong>
            <span>To revisit</span>
          </div>
          <span className="stats-divider" />
          <div>
            <strong>{total}</strong>
            <span>Questions</span>
          </div>
        </div>
        <div className="result-actions">
          <button className="button button-primary" onClick={onRetry} disabled={!incorrect}>
            Retry missed questions <span aria-hidden="true">↻</span>
          </button>
          <button className="button button-secondary" onClick={onNewQuiz}>
            Make another quiz <span aria-hidden="true">→</span>
          </button>
        </div>
        {retryMessage && (
          <p className="retry-note" role="status">
            {retryMessage}
          </p>
        )}
      </section>
      <QuestionReview questions={quiz.questions} answers={answers} />
    </main>
  );
}
