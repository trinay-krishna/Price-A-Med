import styles from './Card.module.css';

export default function Card( { imageSrc, title } ) {
    return(
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <img className={styles.cardImage} src={imageSrc} alt="" />
                <h2>{title}</h2>
            </div>
        </div>
    )
}