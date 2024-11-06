import styles from './MedSearch.module.css';


export default function MedSearch() {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Enter Medicine Name" className={styles.input}/>
        </div>
    )
}