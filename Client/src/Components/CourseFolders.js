import { useEffect, useState,useContext } from 'react';
import styles from '../App.module.css';
import axios from 'axios';
import { ProductCard } from 'react-ui-cards';
import { UserContext,UserReferesh } from '../App';
const AllCourse = () => {
    const {user} = useContext(UserContext);
    const userreloard = useContext(UserReferesh);
    const [allcoursedata, setallcoursedata] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("http://Localhost:8080/allcourse");
            try{
                const filteredArray = response.data.filter((item1) =>!user.Products.some((item2) => item2.product_id === item1._id));
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
            setPaymentStatus("Failure");
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
            description: "For testing purpose",
            handler: (response)=>{
                handlePaymentSuccess(response,data)
            },
            prefill: {
                name: user.name,
                email: user.emailid,
                contact: user.phone,
            },
            notes: {
                address: "Razorpay Corporate office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div className={styles.Course}>
            {allcoursedata.map((data, i) => {
                return (
                    <ProductCard
                    key={i}
                    photos={[
                        'https://i.imgur.com/jRVDeI8.jpg'
                    ]}
                    price={data.price}
                        productName={data.title}
                        description={data.description}
                        buttonText='Buy'
                        onClick={() => {openRazorpay(data)}}
                        />
                        )
                    })
                }
        </div>
    )
}

const MyCoursegenerate = (Products) => {
    return(
        <div>
             {Products.map((data, i) => {
            return (
                <ProductCard
                    key={i}
                    photos={[
                        'https://i.imgur.com/jRVDeI8.jpg'
                    ]}
                    price="Purchased"
                    productName={data.title}
                    description={data.description}
                    buttonText='Go to Course'
                    url={data.link}
                    />
                    )
        })
        }
        </div>
    )
}
const MyCourse = () => {
    const {user,HandleUser} = useContext(UserContext);
    return (
        <div className={styles.Course}>
            {user.uid?MyCoursegenerate(user.Products):"Login to view Your course List"}
        </div>
    )
}
export { AllCourse, MyCourse }