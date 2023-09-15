import { React, useState,useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom'
import {UserReferesh}  from "../App";

export const Login = (props) => {
    const Userreloard = useContext(UserReferesh);
    const navigate = useNavigate();
    const [mailid, setmailid] = useState("")
    const [password, setpassword] = useState("")

    const LoginWithDatas = async () => {
        try {
            await signInWithEmailAndPassword(auth, mailid, password);
                Userreloard();  
                navigate("/home")
        }
        catch (err) {
            navigate("/")
            alert("invalid user / Retry")
        }
    }

    return (
        <div>

            <input type="mailid" value={mailid} placeholder="enter mailid" onChange={(e) => {
                setmailid(e.target.value)
            }}></input>
            <input type="password" value={password} placeholder="enterPass" onChange={(e) => {
                setpassword(e.target.value)
            }}></input>

            <button onClick={LoginWithDatas}>Click</button>
        </div>
    )

}