import { ArrowLeft, ArrowRight } from '../../../../assets/icon'
import styles from './styles.module.scss'

type ArrowCardProps = {
    onPrev: () => void
    onNext: () => void
}

export const ArrowCard = ({ onPrev, onNext }: ArrowCardProps) => {
    return (
        <div className={styles.arrow}>
            <div className={styles.inner}>
                <div className={styles.left} onClick={onPrev}>
                    <ArrowLeft/>
                </div>
                <div className={styles.line}></div>
                <div className={styles.right} onClick={onNext}>
                    <ArrowRight/>
                </div>
            </div>
        </div>
    )
}