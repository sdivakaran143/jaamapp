import React,{useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from './utils/Firebase';
import { Login } from './Components/Login';
import axios from 'axios';
import styles from './App.module.css';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Course from './Components/Course';
export const UserContext = React.createContext();
export const UserReferesh = React.createContext();
function App() {
  const [user, setuser] = useState("NotSignIn");

  const GetUserData = () => {
    const fetchdata = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_LINK}/UserDetials`, { uid: auth.currentUser?.uid });
      HandleUser(response.data[0]);
      sessionStorage.setItem("user", JSON.stringify(response.data[0]));
      console.log(JSON.parse(sessionStorage.getItem("user")));
    }
    console.log("exectute");
    fetchdata();
  }
  
  const HandleUser = (userData) => {
    setuser(userData);
  };
  return (
    <div className={styles.App}>
      <UserContext.Provider value={{ user, HandleUser }}>
        <UserReferesh.Provider value={GetUserData}>
          <NavigationBar />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/course/*' element={<Course />} />
          </Routes>
        </UserReferesh.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;