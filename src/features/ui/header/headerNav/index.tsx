import styles from './styles.module.scss'

type HeaderNavProps = {
  onLinkClick?: () => void
}

export const HeaderNav = ({ onLinkClick }: HeaderNavProps) => {
  return (
    <nav className={styles.nav}>
      <a href="/" onClick={onLinkClick} target='_blank' className={styles.link}>
        <span>Discover</span>
      </a>
      <a href="/"  onClick={onLinkClick} target='_blank' className={styles.link}>
        <span>creators</span>
      </a>
      <a href="/" onClick={onLinkClick} target='_blank' className={styles.link}>
        <span>Sell</span>
      </a>
      <a href="/"  onClick={onLinkClick}target='_blank' className={styles.link}>
        <span>stats</span>
      </a>
    </nav>
  )
}