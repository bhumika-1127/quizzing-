import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/PlayQuiz.css';

const PlayQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const questionRefs = useRef([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        console.log('Fetched Quizzes:', response.data);
        setQuizzes(response.data);
        const initialAnswers = {};
        response.data.forEach((quiz) => {
          initialAnswers[quiz.id] = '';  // Ensure IDs match what is returned from the API
        });
        setSelectedAnswers(initialAnswers);
        console.log('Initial Selected Answers:', initialAnswers);
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAnswerClick = (quizId, selectedOption, index) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizId]: selectedOption,
    }));
    console.log('Updated Selected Answers:', { ...selectedAnswers, [quizId]: selectedOption });

    // Scroll to the next question
    if (index < quizzes.length - 1) {
      questionRefs.current[index + 1].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    quizzes.forEach((quiz) => {
      // Check the property name for the correct answer
      if (selectedAnswers[quiz.id] === quiz.correctAnswer) {
        totalScore++;
      } else {
        console.log(`Wrong Answer for Quiz ${quiz.id}: Selected ${selectedAnswers[quiz.id]}, Correct ${quiz.correctAnswer}`);
      }
    });

    setScore(totalScore);
    console.log('Total Score:', totalScore);

    const percentageScore = (totalScore / quizzes.length) * 100;
    console.log('Percentage Score:', percentageScore);
    let feedback;

    if (percentageScore >= 90) {
      feedback = `Well Done🎉🥳🤩! Your score is ${totalScore} out of ${quizzes.length}.`;
    } else if (percentageScore >= 50) {
      feedback = `Nice Try👏🙌! Your score is ${totalScore} out of ${quizzes.length}.`;
    } else {
      feedback = `Give it another shot😐👍! Your score is ${totalScore} out of ${quizzes.length}.`;
    }

    setFeedbackMessage(feedback);
    setShowResult(true);
  };

  const resetQuiz = () => {
    const initialAnswers = {};
    quizzes.forEach((quiz) => {
      initialAnswers[quiz.id] = '';
    });
    setSelectedAnswers(initialAnswers);
    setShowResult(false);
    setScore(0);
    setFeedbackMessage('');
  };

  return (
    <div className="container">
      <h2>Quizzes</h2>
      {!showResult ? (
        <div>
          <ul className="quiz-list">
            {quizzes.map((quiz, index) => (
              <li
                ref={(el) => (questionRefs.current[index] = el)}
                key={quiz.id}
                className="quiz-item"
              >
                <h3>{quiz.question}</h3>
                <ul className="options-list">
                  <li className="option-item">
                    <button
                      onClick={() =>
                        handleAnswerClick(quiz.id, quiz.option1, index)
                      }
                      className={`option-button ${
                        selectedAnswers[quiz.id] === quiz.option1
                          ? 'selected'
                          : ''
                      }`}
                    >
                      {quiz.option1}
                    </button>
                  </li>
                  <li className="option-item">
                    <button
                      onClick={() =>
                        handleAnswerClick(quiz.id, quiz.option2, index)
                      }
                      className={`option-button ${
                        selectedAnswers[quiz.id] === quiz.option2
                          ? 'selected'
                          : ''
                      }`}
                    >
                      {quiz.option2}
                    </button>
                  </li>
                  <li className="option-item">
                    <button
                      onClick={() =>
                        handleAnswerClick(quiz.id, quiz.option3, index)
                      }
                      className={`option-button ${
                        selectedAnswers[quiz.id] === quiz.option3
                          ? 'selected'
                          : ''
                      }`}
                    >
                      {quiz.option3}
                    </button>
                  </li>
                  <li className="option-item">
                    <button
                      onClick={() =>
                        handleAnswerClick(quiz.id, quiz.option4, index)
                      }
                      className={`option-button ${
                        selectedAnswers[quiz.id] === quiz.option4
                          ? 'selected'
                          : ''
                      }`}
                    >
                      {quiz.option4}
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitQuiz} className="neon-button">
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="result-container">
          <h3 className="result-text">Quiz Result</h3>
          <p>
            {feedbackMessage}
          </p>
          <button onClick={resetQuiz} className="neon-button">
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
