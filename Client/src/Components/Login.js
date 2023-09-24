import * as React from 'react';
import {useState,useContext} from "react";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom'
import {UserReferesh}  from "../App";
import styles from '../App.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export const Login = () => {
    const [signin,setsignin]=useState(true);
    const Userreloard = useContext(UserReferesh);
    const navigate = useNavigate();
    const [isLoading,setLoading]=useState(false);
    const [password,setpassword]=useState("");
    const [userdata,setuserdata] = useState({
        mailid:"",
        name:"",
        phonenumber:"",
    })

    const LoginWithDatas = async () => {
        try {
            await signInWithEmailAndPassword(auth, userdata.mailid, password);
                Userreloard();  
                navigate("/home")
        }
        catch (err) {
            navigate("/")
            alert("invalid user / Retry")
        }
    }
    const SignUpWithDatas = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, userdata.mailid,password);
            const result = await axios.post(`${process.env.REACT_APP_API_LINK}/RegistertoDB`,{...userdata,uid:auth?.currentUser?.uid})
            console.log(result.data.message);
            setLoading(false);
            switchSignOption();
        }
        catch (err) {
            setLoading(false)
            navigate("/")
            alert("Existing user / Retry")
        }
    }
    const switchSignOption=()=>{
        setsignin(!signin)
    }

const styles2 =signin?styles.bg1:styles.bg2;
    return (
        <div className={[styles.loginbox,styles2].join(' ')}>
            <div>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
            <div className={styles.mainarea}>
                <h2>{(signin)?"LogIn":"SignUp"}</h2>
                {
                    (signin)?"":
                    (<div>
                    <TextField className={styles.inputfield} label="Name" variant="standard" type="text" value={userdata.name} placeholder="Enter Name" onChange={(e) => setuserdata({...userdata,name:e.target.value})} required />
                    <TextField className={styles.inputfield} label="PhoneNumber" variant="standard" type="number" value={userdata.phonenumber} placeholder="Enter PhoneNumber" onChange={(e) => setuserdata({...userdata,phonenumber:e.target.value})} required />
                    </div>)
                }
                <TextField className={styles.inputfield} label="MailID" variant="standard" type="mailid" value={userdata.mailid} placeholder="Enter MailID" onChange={(e) => {
                     setuserdata({...userdata,mailid:e.target.value});
                 }} required/>
                 <TextField className={styles.inputfield} label="Password" variant="standard" type="password" value={password} placeholder="Enter PassWord" onChange={(e) => {
                    setpassword(e.target.value);
                 }} required/> 
                <div className={styles.button}>
                        <Button onClick={(signin)?LoginWithDatas:SignUpWithDatas} variant="contained" color="primary">{(signin)?"LogIn":"SignUp"}</Button> 
                        <br/>
                        <button onClick={switchSignOption}>{(signin)?"New User ? SignUp":"Existing User? Login"}</button>
                </div>
            </div>
        </div>
    )

}