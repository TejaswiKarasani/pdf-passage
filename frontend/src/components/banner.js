import styles from '../styles/Banner.module.css';

function Banner() {
    return ( 
        <div className={styles.mainHeader}>
            <div className={styles.headerText}>PDF Passage</div>
            <div className={styles.spacer}></div>
            <a href="gmail.com" className={styles.link}>Contact Team</a>
        </div>
    );
}
export default Banner;
