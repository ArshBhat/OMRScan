// pages/forgot-password.js
import React, { useState } from 'react';
import styles from '../styles/Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password recovery logic here
    console.log('Password recovery email sent to:', email);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Recovery Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
