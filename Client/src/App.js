import React from 'react';
import styles from './App.module.css';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Course from './Components/Course';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className={styles.App}>
      <NavigationBar/>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/course/*' element={<Course/>}/>
          <Route exact path='*' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;