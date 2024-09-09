import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="OwlMark Logo" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/exams">Exams</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
