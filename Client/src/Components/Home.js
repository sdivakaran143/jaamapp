import React from "react"
import styles from '../App.module.css';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
export default function Home(){
  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <h1>Premium Couses To UpSkill Your Skills</h1>
        <p>Learn (almost) anything. Log in now to save on courses.</p>
        <div  className={styles.buttoncenter}>
      <Link to="/course"><Button variant="contained" color="secondary">Visit Courses</Button></Link>
      </div>
      </div>
    </div>
  )
}