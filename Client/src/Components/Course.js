import React from "react"
import styles from '../App.module.css';
import { Link,Routes,Route } from 'react-router-dom';

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
            <Routes>
                <Route exact path='/course/allcourse' element={""}/>
                <Route exact path='/course/mycourse' element={""}/>
            </Routes>
        </div>
    )
}