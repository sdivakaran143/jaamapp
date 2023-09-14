import React from "react"
import styles from '../App.module.css';
import { Link,Routes,Route } from 'react-router-dom';
import { AllCourse,MyCourse } from "./CourseFolders";
export default function Course(){
    const CourseNavigation=()=>{
        return(
            <div>
                <Link to="/course/allcourse">All Courses</Link>
                <Link to="/course/mycourse">My Couses</Link>
            </div>
        )
    }
    return (
        <div className={styles.Course}>
            {CourseNavigation()}
            <div className={styles.Courselistbox}>
            <Routes>
                <Route exact path='/' element={<AllCourse/>}/>
                <Route exact path='/allcourse' element={<AllCourse/>}/>
                <Route exact path='/mycourse' element={<MyCourse/>}/>
            </Routes>
            </div>
        </div>
    )
}