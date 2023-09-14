import { React, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
export const Login = (props) => {
    const navigate = useNavigate();
    const [mailid, setmailid] = useState("")
    const [password, setpassword] = useState("")

        const LoginWithDatas = async () => {
        try {
            await signInWithEmailAndPassword(auth, mailid, password);
            navigate("/home")
        }
        catch (err) {
            navigate("/")
            alert("invalid user")
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