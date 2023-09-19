import {SiPowerpages,SiDatabricks} from 'react-icons/si'
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

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
                        <p className={styles.hidden}>&nsbp;</p>
                        <Link to={data.link} target="_blank"className={[styles.Link,styles.Link1].join(' ')}><SiDatabricks/> View Course</Link>
                        <Link to={data.materials_link} target="_blank"className={[styles.Link,styles.Link2].join(' ')}>< SiPowerpages/> Materials</Link>
                    </div>
                    </div>
                    )})
                }
        </div>
    )
}
export default function MyCourse(){
    return (
        <div className={styles.Course}>
            {JSON.parse(sessionStorage.getItem("user"))?MyCoursegenerate(JSON.parse(sessionStorage.getItem("user")).Products):"Login to view Your course List"}
        </div>
    )
}