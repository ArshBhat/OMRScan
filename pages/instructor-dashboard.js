// pages/instructor-dashboard.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/InstructorDashboard.module.css';

const courses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
  { id: 3, name: 'Course 3' },
];

const InstructorDashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Instructor Dashboard</h1>
      <h2>Your Courses</h2>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/course-management?courseId=${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/create-course" className={styles.newCourseButton}>
        Create New Course
      </Link>
    </div>
  );
};

export default InstructorDashboard;
