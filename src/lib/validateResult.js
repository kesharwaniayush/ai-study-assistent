const validDifficulties = ['Easy', 'Medium', 'Hard'];

export function validateQuiz(data, expectedCount) {
  const invalid = (error) => ({ valid: false, error });

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return invalid('The AI response was not in the expected format.');
  }
  if (typeof data.title !== 'string' || !data.title.trim()) {
    return invalid('The AI response was not in the expected format.');
  }
  if (typeof data.topic !== 'string' || !data.topic.trim()) {
    return invalid('The AI response was not in the expected format.');
  }
  if (!validDifficulties.includes(data.difficulty)) {
    return invalid('The AI response was not in the expected format.');
  }
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    return invalid('The AI response was not in the expected format.');
  }
  if (expectedCount && data.questions.length !== expectedCount) {
    return invalid('The AI response was not in the expected format.');
  }

  const questionIds = new Set();
  for (const [index, question] of data.questions.entries()) {
    if (!question || typeof question !== 'object' || Array.isArray(question)) {
      return invalid(`Question ${index + 1} is not valid.`);
    }
    if (typeof question.id !== 'string' || !question.id.trim()) {
      return invalid(`Question ${index + 1} is missing an ID.`);
    }
    if (questionIds.has(question.id)) {
      return invalid(`Question ${index + 1} has a duplicate ID.`);
    }
    questionIds.add(question.id);
    if (typeof question.question !== 'string' || !question.question.trim()) {
      return invalid(`Question ${index + 1} has no question text.`);
    }
    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      question.options.some((option) => typeof option !== 'string' || !option.trim())
    ) {
      return invalid(`Question ${index + 1} must have exactly four answer options.`);
    }
    if (
      !Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer > 3
    ) {
      return invalid(`Question ${index + 1} has an invalid correct answer.`);
    }
    if (typeof question.explanation !== 'string' || !question.explanation.trim()) {
      return invalid(`Question ${index + 1} has no explanation.`);
    }
  }

  return { valid: true, data };
}
