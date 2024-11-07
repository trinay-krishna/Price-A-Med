import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import styles from './Landing.module.css';

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.name}>
                    <h1>Price A Med</h1>
                    <ul className={styles.navList}>
                        <a onClick={ () => navigate('/home') }>Home</a>
                        <a>Services</a>
                        <a>About</a>
                    </ul>
                </div>
                <div  className={styles.banner}>
                    <div className={styles.bannerInfo}>
                        <h1 className={styles.bannerTitle}>Smarter Choices for Your Health</h1>
                        <p className={styles.bannerText}>Explore options and make informed decisions on your prescriptions.</p>

                    </div>
                </div>
            </div>
            <div class={styles.spacer}></div>
            <div className={styles.services}>
                <h2>Services we offer</h2>
                <div className={styles.serviceDiv}>
                    <Card imageSrc={'/images/medicineBottle.jpg'} title={'Medication Price Comparison'} />
                    <Card imageSrc={'/images/insuranceCheck.jpg'} title={'Insurance Coverage Check'} />
                    <Card imageSrc={'/images/deliveryTruck.jpg'} title={'Home Delivery and Alternatives'} />
                    
                </div>
            </div>
            <div className={styles.about}>
                <img className={styles.aboutImage} src="/images/aboutImage.jpg" alt="" />
                <div className={styles.aboutInfo}>
                    <h2 className={styles.aboutHeading}>About</h2>
                    <p>
                        "Price A Med" is designed to help you make informed decisions about your prescriptions with ease.
                        We provide a simple, user-friendly way to search for medications, compare prices, and check
                        insurance coverage across multiple pharmacies. With real-time access to cost information and
                        availability at local and mail-order pharmacies, we make it easy for you to find the right medication
                        at the best price—conveniently from your phone or computer.
                    </p>

                    <p>
                        <strong className={styles.strong}>Our mission</strong> is to empower you to manage your healthcare costs, prioritize transparency, and bring
                        convenience right to your fingertips. Whether you’re looking for savings, alternative options, or
                        home delivery, Price A Med is here to support your healthcare journey.
                    </p>
                </div>
            </div>




        </div>
    )
}