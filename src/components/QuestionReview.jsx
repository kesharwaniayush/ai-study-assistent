import React from 'react';

const letters = ['A', 'B', 'C', 'D'];

export default function QuestionReview({ questions, answers }) {
  return (
    <section className="review-section">
      <div className="review-heading">
        <div>
          <span className="eyebrow">TAKE IT WITH YOU</span>
          <h2>Your question review</h2>
        </div>
        <span className="review-count">{questions.length} questions</span>
      </div>
      <div className="review-list">
        {questions.map((question, index) => {
          const answer = answers.find((item) => item.questionId === question.id);
          const isCorrect = answer?.selectedAnswer === question.correctAnswer;
          return (
            <article
              className={`review-item ${isCorrect ? 'review-item-correct' : 'review-item-wrong'}`}
              key={`${question.id}-${index}`}
            >
              <div className="review-status">
                <span>{isCorrect ? '✓' : '!'}</span>
                {isCorrect ? 'Got it' : 'Review this'}
              </div>
              <h3>{question.question}</h3>
              {!isCorrect && (
                <p className="review-correct-answer">
                  <strong>Answer:</strong> {letters[question.correctAnswer]}.{' '}
                  {question.options[question.correctAnswer]}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
