import React from 'react';

export default function Header({ onHome }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome} aria-label="AI Study Assistant home">
        <span className="brand-mark" aria-hidden="true">
          ✳
        </span>
        <span>
          study<span className="brand-accent">mate</span>
        </span>
      </button>
      <div className="header-right">
        <span className="status-dot" />
        Your personal study space
      </div>
    </header>
  );
}
