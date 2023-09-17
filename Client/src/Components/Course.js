import React from "react"
import styles from '../App.module.css';
import { Link, Routes, Route } from 'react-router-dom';
import { AllCourse, MyCourse } from "./CourseFolders";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function Course() {
    const CourseNavigation = () => {
        return (
            <div className={styles.navigations}>
                <ButtonGroup color="secondary" aria-label="medium secondary button group">
                    <Button><Link to="/course/allcourse">All Courses</Link></Button>
                    <Button><Link to="/course/mycourse">My Couses</Link></Button>
                </ButtonGroup>
            </div>
        )
    }
    return (
        <div className={styles.CourseContent}>
            {CourseNavigation()}
            <div className={styles.Course}>
                <div className={styles.Courselistbox}>
                    <Routes>
                        <Route exact path='/' element={<AllCourse />} />
                        <Route exact path='/allcourse' element={<AllCourse/>} />
                        <Route exact path='/mycourse' element={<MyCourse />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}