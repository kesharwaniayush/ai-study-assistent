import React from 'react';

const examplePrompt =
  'Create a quiz about Computer Networks covering TCP, UDP, IP addressing and DNS.';

export default function PromptInput({
  input,
  setInput,
  questionCount,
  setQuestionCount,
  difficulty,
  setDifficulty,
  onSubmit,
  error,
  disabled,
}) {
  const characterLimit = 5000;
  return (
    <main className="home-workspace">
      <section className="hero-intro">
        <div className="hero-badge">
          <span>✳</span> YOUR STUDY SIDEKICK
        </div>
        <h1>
          Make learning
          <br /> <span>stick.</span>
        </h1>
        <p>
          Big topic, messy notes, curious mind. Turn what you’re studying into a little quiz that
          makes it all click.
        </p>
      </section>
      <section className="composer-card" aria-labelledby="composer-heading">
        <div className="composer-heading">
          <div className="composer-icon">✎</div>
          <div>
            <span className="eyebrow">LET’S GET STARTED</span>
            <h2 id="composer-heading">What are you learning?</h2>
          </div>
        </div>
        <label className="sr-only" htmlFor="study-input">
          Paste your notes or enter a topic
        </label>
        <textarea
          id="study-input"
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, characterLimit))}
          placeholder="Paste your notes or enter a topic...&#10;&#10;The more detail you share, the better your quiz will be."
          rows="5"
          maxLength={characterLimit}
          disabled={disabled}
        />
        <div className="textarea-meta">
          <span>✨ &nbsp;Your notes stay yours. Let’s make them count.</span>
          <span>
            {input.length} / {characterLimit}
          </span>
        </div>
        <div className="control-row">
          <fieldset className="choice-control">
            <legend>QUESTIONS</legend>
            <div className="segmented-control">
              {[5, 10].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={questionCount === count ? 'active' : ''}
                  onClick={() => setQuestionCount(count)}
                  disabled={disabled}
                >
                  {count}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="choice-control difficulty-control">
            <legend>DIFFICULTY</legend>
            <div className="segmented-control">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={difficulty === level ? 'active' : ''}
                  onClick={() => setDifficulty(level)}
                  disabled={disabled}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            className="button button-primary generate-button"
            onClick={onSubmit}
            disabled={disabled}
          >
            Generate my quiz <span aria-hidden="true">→</span>
          </button>
        </div>
        {error && (
          <div className="inline-error" role="alert">
            {error}
          </div>
        )}
      </section>
      <div className="example-strip">
        <span className="example-icon">✦</span>
        <div>
          <span className="eyebrow">NEED A STARTING POINT?</span>
          <p>
            <button
              type="button"
              className="example-link"
              onClick={() => setInput(examplePrompt)}
              disabled={disabled}
            >
              Try this: “{examplePrompt}”
            </button>
          </p>
        </div>
        <span className="example-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="trust-row">
        <span>✳ &nbsp;Made for curious minds</span>
        <span>·</span>
        <span>No flashcards. Just understanding.</span>
      </div>
    </main>
  );
}
