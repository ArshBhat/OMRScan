// pages/create-exam.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CreateExam.module.css';

const CreateExam = () => {
  const router = useRouter();
  const { courseId, courseName } = router.query;
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([{ question: '', points: 0 }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', points: 0 }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle exam creation logic here
    console.log('Exam Created:', { courseId, courseName, examName, questions });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Exam for Course: {courseName}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="examName" className={styles.label}>Exam Name</label>
          <input
            type="text"
            id="examName"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Questions</label>
          {questions.map((q, index) => (
            <div key={index} className={styles.questionGroup}>
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                required
                className={styles.questionInput}
              />
              <input
                type="number"
                placeholder="Points"
                value={q.points}
                onChange={(e) => handleQuestionChange(index, 'points', e.target.value)}
                required
                className={styles.questionInput}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion} className={styles.addQuestionButton}>
            Add Question
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
