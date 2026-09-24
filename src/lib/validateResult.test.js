import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateQuiz } from './validateResult.js';

function makeQuiz() {
  return {
    title: 'Java inheritance',
    topic: 'Java inheritance',
    difficulty: 'Medium',
    questions: Array.from({ length: 5 }, (_, index) => ({
      id: `q${index + 1}`,
      question: `Question ${index + 1}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Option A is correct.',
    })),
  };
}

describe('validateQuiz', () => {
  it('accepts a complete quiz with the requested count', () => {
    const result = validateQuiz(makeQuiz(), 5);
    assert.equal(result.valid, true);
  });

  it('rejects empty or missing questions', () => {
    const quiz = makeQuiz();
    quiz.questions = [];
    assert.equal(validateQuiz(quiz).valid, false);
    assert.equal(validateQuiz(null).valid, false);
  });

  it('rejects a mismatched question count', () => {
    assert.equal(validateQuiz(makeQuiz(), 10).valid, false);
  });

  it('rejects an invalid correct answer index', () => {
    const quiz = makeQuiz();
    quiz.questions[0].correctAnswer = 4;
    assert.equal(validateQuiz(quiz).valid, false);
  });

  it('rejects questions with fewer than four options', () => {
    const quiz = makeQuiz();
    quiz.questions[0].options.pop();
    assert.equal(validateQuiz(quiz).valid, false);
  });
});
