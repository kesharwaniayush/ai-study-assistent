import React from 'react';

export default function ErrorState({ message, onRetry, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      <span className="error-symbol">!</span>
      <div className="error-copy">
        <strong>We hit a small snag.</strong>
        <p>{message}</p>
      </div>
      <div className="error-actions">
        <button className="error-retry" onClick={onRetry}>
          Try again
        </button>
        <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
          ×
        </button>
      </div>
    </div>
  );
}
