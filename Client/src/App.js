import React from 'react';
import styles from './App.module.css';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Course from './Components/Course';
import { Routes,Route,useNavigate } from 'react-router-dom';
import {auth} from './utils/Firebase';
import { Login } from './Components/Login';
import { signOut } from 'firebase/auth';
function App() {
  const navigate=useNavigate();
  const signout=async()=>{
    try{
      await signOut(auth);
      navigate("/")
    }
    catch(err){
      console.error(err);
    }
  } 
  return (
    <div className={styles.App}>
      <button onClick={signout}>signout</button>
      <NavigationBar/>
      <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/course/*' element={<Course/>}/>
          <Route ute exact path='/*' element={<Course/>}/>
      </Routes>
    </div>
  );
}

export default App;