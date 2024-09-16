// pages/forgot-password.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending recovery email...');
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('A password recovery email has been sent to your email address. Please check your inbox.');
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setMessage('Failed to send recovery email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error sending recovery email. Please try again.');
    }
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
