import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import './Home.css';

import logo from '../assests/logo.png';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.5 }}
      className="home-container" 
    >
      <header >
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to DSA Tutorial</h1>
        <p>Data Structures and Algorithms Made Easy</p>
        <Link to="/login">
          <button>Profile</button>
        </Link>
      </header>

      <div className="content">
        <p>Data Structures and Algorithms (DSA) refer to the study of methods for organizing and storing data and the design of procedures (algorithms) for solving problems, which operate on these data structures. DSA is one of the most important skills that every computer science student must have. It is often seen that people with good knowledge of these technologies are better programmers than others and thus, crack the interviews of almost every tech giant. This DSA tutorial aims to help you learn Data Structures and Algorithms (DSA) quickly and easily.</p>

        <h2>What is DSA?</h2>
        <p>Data Structures and Algorithms (DSA) refer to the study of methods for organizing and storing data and the design of procedures (algorithms) for solving problems, which operate on these data structures.</p>

        <h2>How to learn DSA?</h2>
        <ol>
          <li>Learn at least one programming language (We leave this to your choice.)</li>
          <li>Learn Data Structures</li>
          <li>Learn Algorithms</li>
          <li>Learn about Time and Space complexities</li>
          <li>Practice Problems on DSA</li>
        </ol>
      </div>

      <footer className="footer">
        <p>"A journey of a thousand miles begins with a single step." - Lao Tzu</p>
        <p>© 2024 DSA Tutorial. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

export default Home;
