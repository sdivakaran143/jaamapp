import React from 'react';
import styles from '../App.module.css';
import { Link } from 'react-router-dom';
export default function NavigationBar() {
  return (
    <div className={styles.NavigationBar}>
     <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/course">Course</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>
     </ul>
    </div>
  );
}
