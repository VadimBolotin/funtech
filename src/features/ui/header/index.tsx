import { useEffect, useState } from 'react'
import { Logo } from '../../../assets/icon'
import { HeaderNav } from './headerNav'
import styles from './styles.module.scss'
import { AnimatePresence,motion } from 'motion/react'

export const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || window.pageYOffset || 0
            setScrolled(scrollTop > 50) 
        }

        handleScroll() 

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
      }, [menuOpen])

    return (
        <div className={`
            ${styles.header} 
            ${scrolled ? styles.scrolled : ''}
            ${menuOpen ? styles.headerMenuOpen : ''}
        `}>
            <div className={styles.scaleWrapper}>
                <div className={`
                    ${styles.inner} 
                    ${scrolled ? styles.innerScrolled : ''}
                `}>
                    <motion.div
                        className={styles.logoWrapper}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Logo className={styles.logo} />
                        <span className={styles.logoText}>DiveSea</span>
                    </motion.div>

                    <motion.div
                        className={styles.desktopNav}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <HeaderNav />
                    </motion.div>
                    

                    <motion.div
                        className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span />
                        <span />
                        <span />
                    </motion.div>
                </div>
            </div>

            {/* Mobile меню с анимацией через motion */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: .4, ease: "easeInOut" }}
                    >
                        <HeaderNav onLinkClick={() => setMenuOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}