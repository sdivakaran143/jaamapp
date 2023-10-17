import { useEffect, useState,useContext} from 'react';
import * as React from 'react';
import styles from '../App.module.css';
import axios from 'axios';
import {BsCart3} from 'react-icons/bs'
import { UserContext,UserReferesh } from '../App';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function  AllCourse(){
    const {user} = useContext(UserContext);
    const userreloard = useContext(UserReferesh);
    const [allcoursedata, setallcoursedata] = useState([]);
    const [alertState, setAlertState] = useState(false);
    const [allcourseload, setallcourseload] = useState(false);
    useEffect(() => {
        const fetchdata = async () => {
            setallcourseload(true);
            // console.log(process.env);
             const response = await axios.get("https://jaam-app-api.onrender.com/allcourse");
            //const response = await axios.get("http://192.168.113.123:8080/allcourse");
            try{
                const filteredArray = response.data.filter((Product) =>!JSON.parse(sessionStorage.getItem("user")).Products.some((UserProducts) => UserProducts.product_id === Product._id));
                setallcoursedata(filteredArray);
            }catch{
                setallcoursedata(response.data);
            }finally{
                setallcourseload(false);
            }
        }
        fetchdata();
    }, [user]);
    
    const handlePaymentSuccess = async (response,data) => {
        setAlertState(true);
        try {
            const paymentData = {
                Payment_id:response,
                Productdata:data,
                user:user
            };
            await axios.post("https://jaam-app-api.onrender.com/storePayment",paymentData);
            // await axios.post("http://192.168.113.123:8080/storePayment",paymentData);
            alert("Payment Successfull");
            userreloard();
        } catch (error) {
            console.error("Error storing payment data:", error);
            alert("Failure ocured Retry / Try again Later ");
        }
    };

    const openRazorpay = (data) => {
        const options = {
            key: "rzp_test_Yarqrw4ky1W1GP",
            key_secret: "ixSr6fiWCrRPo0HnlH5D5038",
            amount: data.price * 100,
            currency: "INR",
            name: "Courseify",
            description: "Payment For the Premium Courses",
            handler: (response)=>handlePaymentSuccess(response,data),
            prefill: {
                name: user.name,
                email: user.emailid,
                contact: user.phone,
            },
            notes: {
                address:"Developer Street,React(Tk),Web(DT)-404",
            },
            theme: {
                color: "#3366ff",
            },
        };
        if(sessionStorage.getItem("user")){
            var pay = new window.Razorpay(options);
            pay.open();
        }else
            alert("Please SignIn");
    };
    
    const handleClose=()=>{
        setAlertState(false);
    }

    return (
        <div className={styles.Course}>
            {(!allcourseload)?allcoursedata.map((data, i) => {
                return (
                    <div className={styles.card} key={i}>
                        <div className={styles.top}
                         style={{
                            background:`url(${data.image_link}) no-repeat center`,
                            backgroundSize:"cover",
                            }}>
                            <span>&#8377; {data.price}</span>
                        </div>
                        <div className={styles.bottom}>
                            <h2>{data.tittle}</h2>
                            <p>{data.description}</p>
                            <p>{data.channel_name} | {data.instructor} | {data.duration}</p>
                            <p className={styles.hidden}>&nsbp;</p>
                            <button onClick={() => {openRazorpay(data)}}><BsCart3/> Buy</button>
                        </div>
                    </div>
                    )}):<div><CircularProgress color="inherit"/></div>
                }
                <Snackbar open={alertState} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Thanks For Purchasing the Course
                </Alert>
                </Snackbar>
        </div>
    )
}
