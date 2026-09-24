import React from 'react';

const letters = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, selectedAnswer, answerSubmitted, onSelect }) {
  return (
    <section className="question-card" aria-labelledby="question-title">
      <div className="question-kicker">
        <span className="tiny-spark">✳</span> TAKE A MOMENT TO THINK
      </div>
      <h2 id="question-title">{question.question}</h2>
      <div className="answer-list" role="group" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = answerSubmitted && question.correctAnswer === index;
          const isWrongPick = answerSubmitted && isSelected && !isCorrect;
          return (
            <button
              className={`answer-option${isSelected ? ' selected' : ''}${isCorrect ? ' correct' : ''}${isWrongPick ? ' incorrect' : ''}`}
              type="button"
              key={`${question.id}-${index}`}
              onClick={() => onSelect(index)}
              disabled={answerSubmitted}
              aria-pressed={isSelected}
            >
              <span className="option-letter">{isCorrect ? '✓' : letters[index]}</span>
              <span className="option-text">{option}</span>
              {isSelected && !answerSubmitted && (
                <span className="selected-check" aria-hidden="true">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>
      {answerSubmitted && (
        <div
          className={`feedback-panel ${selectedAnswer === question.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'}`}
          role="status"
        >
          <div className="feedback-heading">
            <span className="feedback-icon">
              {selectedAnswer === question.correctAnswer ? '✓' : '!'}
            </span>
            {selectedAnswer === question.correctAnswer
              ? 'That’s correct!'
              : 'Not quite — keep learning.'}
          </div>
          {selectedAnswer !== question.correctAnswer && (
            <p className="correct-answer">
              <strong>Correct answer:</strong> {letters[question.correctAnswer]}.{' '}
              {question.options[question.correctAnswer]}
            </p>
          )}
          <p className="explanation">
            <strong>Why?</strong> {question.explanation}
          </p>
        </div>
      )}
    </section>
  );
}
