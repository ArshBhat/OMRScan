// pages/course-management.js
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/CourseManagement.module.css';

const CourseManagement = ({ courseId, courseName }) => {
  const [inviteLink, setInviteLink] = useState('');

  const generateInviteLink = () => {
    // Generate a unique invite link (this is just a placeholder)
    const link = `https://yourapp.com/join-course/${courseId}?token=${Math.random().toString(36).substr(2, 9)}`;
    setInviteLink(link);
  };

  return (
    <div className={styles.container}>
      <h1>Course Management</h1>
      <h2>Manage Course: {courseName}</h2>

      <div className={styles.section}>
        <h3>Add Students</h3>
        <button onClick={generateInviteLink} className={styles.generateLinkButton}>
          Generate Invite Link
        </button>
        {inviteLink && (
          <div className={styles.inviteLink}>
            <p>Invite Link:</p>
            <a href={inviteLink} target="_blank" rel="noopener noreferrer">
              {inviteLink}
            </a>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3>Create Exams</h3>
        <Link href={`/create-exam?courseId=${courseId}&courseName=${encodeURIComponent(courseName)}`} className={styles.createExamButton}>
          Create New Exam
        </Link>
      </div>
    </div>
  );
};

export default CourseManagement;
