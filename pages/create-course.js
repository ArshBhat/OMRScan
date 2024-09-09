// pages/create-course.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CreateCourse.module.css';

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the course to the database
    console.log('Course Created:', { courseName, courseDescription });
    router.push('/instructor-dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Course</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="courseName" className={styles.label}>Course Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="courseDescription" className={styles.label}>Course Description</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
