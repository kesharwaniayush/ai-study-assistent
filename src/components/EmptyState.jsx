import React from 'react';

export default function EmptyState({ onCreate }) {
  return (
    <main className="status-workspace">
      <section className="empty-card">
        <div className="empty-illustration">✳</div>
        <span className="eyebrow">A FRESH PAGE</span>
        <h1>
          Every expert
          <br />
          started <em>curious.</em>
        </h1>
        <p>Drop in a topic or your notes and we’ll turn them into a quiz you can learn from.</p>
        <button className="button button-primary" onClick={onCreate}>
          Create your first quiz <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}
