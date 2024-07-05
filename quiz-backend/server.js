// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

app.use(cors());
app.use(express.json());

// server.js (continuation)
app.get('/api/quizzes', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, question, option1, option2, option3, option4, answer AS "correctAnswer" FROM quiz');
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching quizzes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/quizzes', async (req, res) => {
  const { questions } = req.body;
  try {
    for (const { question, options, correctAnswer } of questions) {
      console.log(question, options, correctAnswer);
      if (!question || !options || options.length !== 4 || !correctAnswer) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [option1, option2, option3, option4] = options;
      console.log(option1, option2, option3, option4);

      const queryText = `
        INSERT INTO quiz (question, option1, option2, option3, option4, answer)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const result = await pool.query(queryText, [question, option1, option2, option3, option4, correctAnswer]);
      console.log('Quiz added:', result.rows[0]);
    }

    res.status(201).json({ message: 'Quizzes added successfully' });
  } catch (error) {
    console.error('Error adding quiz:', error.message);
    res.status(500).json({ error: 'Failed to add quizzes' });
  }
});
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});