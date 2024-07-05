import React from 'react';

function Home() {
  return (
    <div className="App">
        <header className="App-header">
        <img src='logo.png' className="App-logo" alt="logo"/>
        <p className='mt-2'>
          ONE STOP FOR QUIZZING.
        </p>
        <div><div className='line'>
        <a
          className="App-link create-btn neon-button"
          href="/create-quiz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create Quiz
        </a></div>
        <div className='line'><a
          className="App-link play-btn neon-button"
          href="/play-quiz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Quiz
        </a></div></div>
      </header>
    </div>
  );
}

export default Home;
