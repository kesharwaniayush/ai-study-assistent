# AI Study Assistant

## Overview

AI Study Assistant turns a topic or your own study notes into a short, interactive multiple-choice quiz. It is a focused study tool rather than a chat interface: the model returns quiz data, and the React app validates and presents it as answer choices, explanations, and a results review.

## Features

- Free-form study input, with 5 or 10 questions and three difficulty levels
- AI-generated structured quizzes and immediate answer feedback
- Score tracking, question review, and retry for missed questions using the existing quiz data
- Clear empty, loading, network, timeout, and invalid-response states
- Server-side and frontend validation of AI output
- Request timeout and stale response protection
- Responsive, keyboard-accessible interface

## Tech stack

- React 18, Vite, JavaScript, and CSS
- Node.js and Express
- Gemini API (called by the server only)

## Architecture

```text
Student input
     ↓
React interface ── POST /api/generate-quiz ──→ Express server
     ↑                                              ↓
Interactive quiz ← validated JSON ← Gemini API (server-side key)
```

The Express endpoint builds a constrained prompt and asks Gemini for `application/json` with a response schema. The server parses and validates the provider response before returning it. The frontend validates it again before changing into the quiz state. The API key remains in the server environment and is never included in Vite or browser code.

## Setup

Requirements: Node.js 20.19 or newer and an internet connection for the Gemini API.

1. Install dependencies from this directory:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add a Gemini API key from Google AI Studio:

   ```env
   GEMINI_API_KEY=your_real_key_here
   GEMINI_MODEL=gemini-3.5-flash-lite
   PORT=3001
   ```

   `.env` is ignored by Git. Keep the key in this file; do not put it in any `src/` file or Vite variable.

3. Start the frontend and backend together:

   ```bash
   npm run dev
   ```

   Open the Vite URL printed in the terminal (usually `http://localhost:5173`). On localhost, the frontend calls Express on port 3001 directly, including when using `npm run preview`. In production on a hosted domain, configure your static host or reverse proxy to route `/api` to Express on the same origin.

4. Create a production frontend build:

   ```bash
   npm run build
   ```

   To run only the API use `npm run dev:server`. To serve the API in production use `npm start`; serve the generated `dist/` directory with a static host configured to proxy `/api` to that server.

## Validation and failure handling

`src/lib/validateResult.js` checks required strings, allowed difficulty, question count, four non-empty options, integer answer indexes, and explanations. Invalid content is rejected as a whole, so partial quiz data is never rendered. The API helper also handles network failures, malformed HTTP JSON, non-success responses, empty payloads, and a 45-second timeout. The server applies its own request validation and a 40-second provider timeout.

Each generation increments a `useRef` request ID. A result or error may update the screen only if its ID is still current, which keeps a slower earlier request from replacing the user's latest request. Retry filters the current quiz by the recorded answers and starts a new quiz state with those question objects; it makes no provider request.

## AI usage note

AI tools were used for development assistance, code generation, and implementation review. The final implementation should be reviewed and understood by the developer before submission; the developer should be able to explain the request flow, validation, and state transitions.

## Known limitations

- Model output can occasionally fail validation; the app asks the user to try again.
- Quiz quality depends on the detail and accuracy of the supplied topic or notes.
- Quiz generation requires a valid Gemini API key and provider availability.
- The quiz is kept in React state for the current session and is not saved after a page refresh.

## Time spent

Record actual development time here: ______ hours.

## Interview walkthrough

1. Trace `PromptInput` → `App.startGeneration` → `src/lib/api.js` → `POST /api/generate-quiz`.
2. Explain why Gemini is called by Express: the API key must not be shipped to browsers.
3. Show how JSON mode and the response schema shape the model output, then how server and frontend validation reject malformed data.
4. Walk through `QuizView` state: selected choice, submitted feedback, and final answer list.
5. Show how `ResultView` computes the score and how `retryWrongAnswers` reuses just the missed question objects.
6. Demonstrate empty input, a server/API error, a correct answer, a missed answer, and the review screen.

## Tests

Run the validation unit tests with:

```bash
npm test
```

Format the editable source and verify formatting with:

```bash
npm run format
npm run format:check
```

For an end-to-end smoke test, configure `.env`, run `npm run dev`, generate a quiz for `Java inheritance`, submit answers, and retry missed questions. Stop the API process to see the network error. A real provider integration test requires a working key and network access.
