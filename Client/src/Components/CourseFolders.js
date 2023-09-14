import { useEffect, useState } from 'react';
import styles from '../App.module.css';
import axios from 'axios';
import { ProductCard } from 'react-ui-cards';
const AllCourse = () => {
    const [allcoursedata, setallcoursedata] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("http://Localhost:8080/allcourse");
            // const filteredArray = array1.filter((item1) =>!array2.some((item2) => item2.name === item1.name));

            setallcoursedata(response.data);
        }
        fetchdata();
    }, []);

    const handlePaymentSuccess = async (response,data) => {
        try {
            const paymentData = {
                data:response,
                detials:data
            };
            await axios.post("http://localhost:8080/storePayment", paymentData);
            alert("Success");
        } catch (error) {
            console.error("Error storing payment data:", error);
            setPaymentStatus("Failure");
        }
    };

    const openRazorpay = (data) => {
        const options = {
            key: "rzp_test_Yarqrw4ky1W1GP",
            key_secret: "ixSr6fiWCrRPo0HnlH5D5038",
            amount: data.price * 100,
            currency: "INR",
            name: "Readyme",
            description: "For testing purpose",
            handler: (response)=>{
                handlePaymentSuccess(response,data)
            },
            prefill: {
                name: "Divakaran",
                email: "developerd.mailme@gmail.com",
                contact: "9500366762",
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
const MyCourse = () => {
    return (
        <div className={styles.Course}>
            my coursee
        </div>
    )
}
export { AllCourse, MyCourse }