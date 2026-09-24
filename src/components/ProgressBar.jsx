import React from 'react';

export default function ProgressBar({ current, total }) {
  const progress = total ? ((current + 1) / total) * 100 : 0;
  return (
    <div className="progress-wrap" aria-label={`Question ${current + 1} of ${total}`}>
      <div className="progress-label">
        <span>YOUR PROGRESS</span>
        <span>
          {current + 1} <span className="muted">/ {total}</span>
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin="1"
        aria-valuemax={total}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
