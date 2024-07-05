import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddQuiz.css'; // Make sure the path matches your file structure

const AddQuiz = () => {
  const initialQuestionState = { question: '', options: ['', '', '', ''], correctAnswer: '' };
  const [questions, setQuestions] = useState([initialQuestionState]);
  const [error, setError] = useState('');

  const addQuestion = () => {
    setQuestions([...questions, initialQuestionState]);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'question' || field === 'correctAnswer') {
      newQuestions[index][field] = value;
    } else {
      const optionIndex = parseInt(field.split('-')[1], 10);
      newQuestions[index].options[optionIndex] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled for each question
    for (const q of questions) {
      if (!q.question || q.options.some(option => option === '') || !q.correctAnswer) {
        setError('All fields are required for each question');
        return;
      }
    }

    try {
      // Send POST request to server with questions data
      await axios.post('http://localhost:5000/api/quizzes', { questions });
      alert('Quiz created successfully');
      setQuestions([initialQuestionState]); // Reset form after successful submission
      setError('');
    } catch (error) {
      console.error('Error adding quiz:', error.response ? error.response.data : error.message);
      alert('Error adding quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      {error && <div className="error">{error}</div>}
      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <div>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              required
            />
          </div>
          <div className="options-container">
            {q.options.map((option, optIndex) => (
              <div key={optIndex} className="option-wrapper">
                <label>Option {optIndex + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleInputChange(index, `option-${optIndex}`, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <label>Correct Answer:</label>
            <input
              type="text"
              value={q.correctAnswer}
              onChange={(e) => handleInputChange(index, 'correctAnswer', e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="add-button">+</button>
      <button type="submit" className="submit-button neon-button">Create Quiz</button>
    </form>
  );
};

export default AddQuiz;

