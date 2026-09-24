import React from 'react';

export default function LoadingState() {
  return (
    <main className="status-workspace" aria-live="polite">
      <div className="loading-card">
        <div className="loader-orbit">
          <span>✳</span>
        </div>
        <span className="eyebrow">A MOMENT FOR YOUR MIND</span>
        <h1>
          Putting your quiz
          <br />
          <em>together.</em>
        </h1>
        <p>Finding the most useful questions in what you shared.</p>
        <div className="loading-dots">
          <i />
          <i />
          <i />
        </div>
        <span className="loading-note">Usually takes just a few seconds</span>
      </div>
    </main>
  );
}
