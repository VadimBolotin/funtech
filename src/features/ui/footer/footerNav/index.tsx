import styles from './styles.module.scss'

export const FooterNav = () => {
    return (
        <nav className={styles.nav}>
            <a href="/" target='_blank' className={styles.link}>
                <span>Privacy Policy</span>
            </a>
            <a href="/" target='_blank' className={styles.link}>
                <span>Term & Conditions</span>
            </a>
            <a href="/" target='_blank' className={styles.link}>
                <span>About Us</span>
            </a>
            <a href="/" target='_blank' className={styles.link}>
                <span>Contact</span>
            </a>
      </nav>
    )
}