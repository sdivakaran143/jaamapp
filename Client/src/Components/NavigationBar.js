import React, { useContext } from 'react';
import styles from '../App.module.css';
import { Link,useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { UserContext } from '../App';

export default function NavigationBar() {
  const navigate = useNavigate();
  const {HandleUser}=useContext(UserContext);
  const signout = async () => {
    try {
      await signOut(auth);
      HandleUser("NotSignIn")
      sessionStorage.removeItem("user");
      navigate("/")
      alert("sucessfully signout")
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={styles.NavigationBar}>
     <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/course">Course</Link></li>
        {/* <li><Link to="/about">About</Link></li> */}
        {/* <li><Link to="/support">Support</Link></li> */}
        <li><Link to="/login">LogIn</Link></li>
        <li><Link onClick={signout}>SignOut</Link></li>
     </ul>
    </div>
  );
}