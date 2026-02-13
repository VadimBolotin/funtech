import { Logo } from '../../../assets/icon'
import { FooterNav } from './footerNav'
import styles from './styles.module.scss'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <Logo className={styles.logoIcon}/>
                        <h1 className={styles.title}>DiveSea</h1>
                    </div>
                    <FooterNav/>
                </div>
                <div className={styles.line}></div>
                <div className={styles.bottom}>
                    <p className={styles.desktop}>&copy; {new Date().getFullYear()}</p>
                    <p className={styles.mobile}>&copy; {new Date().getFullYear()} DiveSea All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}