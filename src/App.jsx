import React, { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import PromptInput from './components/PromptInput.jsx';
import QuizView from './components/QuizView.jsx';
import ResultView from './components/ResultView.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorState from './components/ErrorState.jsx';
import EmptyState from './components/EmptyState.jsx';
import { generateQuiz } from './lib/api.js';
import { validateQuiz } from './lib/validateResult.js';

function friendlyError(error) {
  const code = error.code || error.message;
  if (code === 'network-error')
    return 'Unable to connect to the server. Check that it is running, then try again.';
  if (code === 'timeout')
    return 'This is taking longer than expected. Please try generating your quiz again.';
  if (code === 'invalid-json') return 'The AI returned an invalid response. Please try again.';
  if (code === 'empty-response') return 'No quiz was generated. Please try again.';
  if (code === 'invalid-ai-json') return 'The AI returned an invalid response. Please try again.';
  if (code === 'invalid-ai-shape')
    return 'The AI response was not in the expected format. Please try again.';
  if (code === 'missing-api-key')
    return 'The quiz service is not configured yet. Add a Gemini API key to the server .env file.';
  return 'Something went wrong while generating your quiz. Please try again.';
}

export default function App() {
  const [view, setView] = useState('input');
  const [input, setInput] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [retryMessage, setRetryMessage] = useState('');
  const requestId = useRef(0);
  const lastRequest = useRef(null);

  async function startGeneration(request = { input, questionCount, difficulty }) {
    const trimmedInput = request.input.trim();
    if (!trimmedInput) {
      setError('Please enter a topic or paste some notes first.');
      setView('input');
      return;
    }
    if (trimmedInput.length < 8) {
      setError(
        'Add a little more detail (at least 8 characters) so your quiz has enough to work with.',
      );
      setView('input');
      return;
    }

    const id = ++requestId.current;
    const normalizedRequest = { ...request, input: trimmedInput };
    lastRequest.current = normalizedRequest;
    setError('');
    setView('loading');

    try {
      const response = await generateQuiz(
        normalizedRequest.input,
        normalizedRequest.questionCount,
        normalizedRequest.difficulty,
      );
      if (id !== requestId.current) return;
      const validation = validateQuiz(response, normalizedRequest.questionCount);
      if (!validation.valid) {
        const shapeError = new Error(validation.error);
        shapeError.code = 'invalid-ai-shape';
        throw shapeError;
      }
      setQuiz(validation.data);
      setAnswers([]);
      setRetryMessage('');
      setView('quiz');
    } catch (requestError) {
      if (id !== requestId.current) return;
      setError(friendlyError(requestError));
      setView('error');
    }
  }

  function showInput() {
    requestId.current += 1;
    setError('');
    setView('input');
  }

  function handleComplete(finalAnswers) {
    setAnswers(finalAnswers);
    setRetryMessage('');
    setView('result');
  }

  function retryWrongAnswers() {
    const wrongQuestions = quiz.questions.filter((question) => {
      const answer = answers.find((item) => item.questionId === question.id);
      return answer && answer.selectedAnswer !== question.correctAnswer;
    });
    if (wrongQuestions.length === 0) {
      setRetryMessage('Perfect score! There are no questions to retry.');
      return;
    }
    setQuiz({ ...quiz, title: `Review: ${quiz.title}`, questions: wrongQuestions });
    setAnswers([]);
    setRetryMessage('');
    setView('quiz');
  }

  return (
    <div className="app-shell">
      <Header onHome={showInput} />
      {view === 'input' && (
        <PromptInput
          input={input}
          setInput={setInput}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onSubmit={() => startGeneration()}
          error={error}
        />
      )}
      {view === 'loading' && <LoadingState />}
      {view === 'error' && (
        <main className="status-workspace">
          <ErrorState
            message={error}
            onRetry={() => startGeneration(lastRequest.current)}
            onDismiss={showInput}
          />
        </main>
      )}
      {view === 'quiz' && quiz && (
        <QuizView quiz={quiz} onComplete={handleComplete} onExit={showInput} />
      )}
      {view === 'result' && quiz && (
        <ResultView
          quiz={quiz}
          answers={answers}
          onRetry={retryWrongAnswers}
          onNewQuiz={showInput}
          retryMessage={retryMessage}
        />
      )}
      {view === 'empty' && <EmptyState onCreate={showInput} />}
      <footer className="site-footer">
        <span>© 2026 studymate</span>
        <span>
          Made for the joy of figuring it out <i>✳</i>
        </span>
      </footer>
    </div>
  );
}
