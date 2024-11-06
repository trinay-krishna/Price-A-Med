import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Price A Medddd</h1>
            <div className={styles.userProfile}>
                <img src="/defaultProfile.png" width={'80px'} alt="" />
                <img src="/cart.png" width={'70px'} alt="" />

            </div>
        </div>
    )
}