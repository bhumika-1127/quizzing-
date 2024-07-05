import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddQuiz from './components/AddQuiz';
import PlayQuiz from './components/PlayQuiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<AddQuiz/>} />
          <Route path="/play-quiz" element={<PlayQuiz/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src='./src/quiz-img.png' className="App-logo" alt="logo" />
//         <p>
//           One stop for quizing.
//         </p>
//         <div><a
//           className="App-link"
//           href="/create-quiz"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Create Quiz
//         </a>
//         <a
//           className="App-link"
//           href="/play-quiz"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Play Quiz
//         </a></div>
//       </header>
//     </div>
//   );
// }

// export default App;
