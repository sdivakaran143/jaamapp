import { useEffect, useState,useContext} from 'react';
import * as React from 'react';
import styles from '../App.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext,UserReferesh } from '../App';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllCourse = () => {
    const {user} = useContext(UserContext);
    const userreloard = useContext(UserReferesh);
    const [allcoursedata, setallcoursedata] = useState([]);
    const [allcourseload, setallcourseload] = useState(true);
    const [alertState, setAlertState] = useState(false);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("https://jaam-app-api.onrender.com/allcourse");
            try{
                const filteredArray = response.data.filter((Product) =>!JSON.parse(sessionStorage.getItem("user")).Products.some((UserProducts) => UserProducts.product_id === Product._id));
                setallcoursedata(filteredArray);
                setallcourseload(false);
            }catch{
                setallcoursedata(response.data);
            }
        }
        fetchdata();
    }, [user]);
    
    const handlePaymentSuccess = async (response,data) => {
        try {
            const paymentData = {
                infos:response,
                id:data._id,
                user:user
            };
            await axios.post("https://jaam-app-api.onrender.com/storePayment", paymentData);
            userreloard();
            alert("Payment Successfull");
            setAlertState(true);
        } catch (error) {
            console.error("Error storing payment data:", error);
            alert("Failure ocured Retry / Try again Later ");
        }
    };
    // console.log(user.uid);
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
                color: "#3399cc",
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
                             background:`url("https://i.imgur.com/jRVDeI8.jpg") no-repeat`,
                             backgroundSize:"cover"
                            }}>
                            <span>&#8377; {data.price}</span>
                        </div>
                        <div className={styles.bottom}>
                            <h2>{data.tittle}</h2>
                            <p>{data.description}</p>
                            <p>{data.channel_name} | {data.instructor} | {data.duration} </p>
                            <button onClick={() => {openRazorpay(data)}}>Buy</button>
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

const MyCoursegenerate = (Products) => {
    return(
        <div className={styles.Course}>
             {Products.map((data, i) => {
                 return (
                    <div className={styles.card} key={i}>
                    <div className={styles.top}
                     style={{
                         background:`url("https://i.imgur.com/jRVDeI8.jpg") no-repeat`,
                         backgroundSize:"cover"
                        }}>
                        <span>Purchased</span>
                        {/* <img src='https://i.imgur.com/jRVDeI8.jpg'/> */}
                    </div>
                    <div className={styles.bottom}>
                        <h2>{data.tittle}</h2>
                        <p>{data.description}</p>
                        <p>{data.channel_name} | {data.instructor} | {data.duration} </p>
                        <Link to={data.link} target="_blank"className={[styles.Link,styles.Link1].join(' ')}>View Course</Link>
                        <Link to={data.materials_link} target="_blank"className={[styles.Link,styles.Link2].join(' ')}>Materials</Link>
                    </div>
                    </div>
                    )})
                }
        </div>
    )
}
const MyCourse = () => {
    return (
        <div className={styles.Course}>
            {JSON.parse(sessionStorage.getItem("user"))?MyCoursegenerate(JSON.parse(sessionStorage.getItem("user")).Products):"Login to view Your course List"}
        </div>
    )
}
export { AllCourse, MyCourse }