import { useEffect, useState,useContext } from 'react';
import styles from '../App.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext,UserReferesh } from '../App';
const AllCourse = () => {
    const {user} = useContext(UserContext);
    const userreloard = useContext(UserReferesh);
    const [allcoursedata, setallcoursedata] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("http://Localhost:8080/allcourse");
            try{
                const filteredArray = response.data.filter((Product) =>!JSON.parse(sessionStorage.getItem("user")).Products.some((UserProducts) => UserProducts.product_id === Product._id));
                setallcoursedata(filteredArray);
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
            const res=await axios.post("http://localhost:8080/storePayment", paymentData);
            console.log(res.data);
            alert("Thanks for purchasing the product!...");
            userreloard();
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
            handler: (response)=>{
                handlePaymentSuccess(response,data)
            },
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
    
    return (
        <div className={styles.Course}>
            {allcoursedata.map((data, i) => {
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
                    )
                })
                }
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
                    )
                })
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