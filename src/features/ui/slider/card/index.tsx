import { useEffect, useMemo, useState } from 'react'
import { Mdi } from '@/assets/icon'
import styles from './style.module.scss'
import IMG1 from '@/assets/images/1.png'
import IMG2 from '@/assets/images/2.png'
import IMG3 from '@/assets/images/3.png'
import IMG4 from '@/assets/images/4.png'
import IMG5 from '@/assets/images/5.png'



type CardProps = {
    id: string
    name: string
}

const padTime = (value: number) => (value < 10 ? `0${value}` : String(value))

export const Card = ({ id, name }: CardProps) => {
    const images = [IMG1, IMG2, IMG3, IMG4, IMG5]

    // Выбор картинки по id (чтобы она была стабильной)
    const selectedImage = useMemo(() => {
        const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const index = hash % images.length
        return images[index]
    }, [id])
    // Рандомный срок окончания аукциона (в секундах), завязанный на id,
    // чтобы он был стабильным для каждой карточки
    const initialSeconds = useMemo(() => {
        const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const normalized = (hash % 1000) / 1000 // 0..1
        const minSeconds = 10 * 60 // минимум 10 минут
        const maxSeconds = 24 * 60 * 60 // максимум 24 часа
        return Math.floor(minSeconds + normalized * (maxSeconds - minSeconds))
    }, [id])

    const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                // Если время истекло, начинаем отсчет заново с initialSeconds
                if (prev <= 1) {
                    return initialSeconds
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [initialSeconds])

    const formattedTime = useMemo(() => {
        const hours = Math.floor(secondsLeft / 3600)
        const minutes = Math.floor((secondsLeft % 3600) / 60)
        const seconds = secondsLeft % 60

        return `${padTime(hours)}h ${padTime(minutes)}m ${padTime(seconds)}s`
    }, [secondsLeft])

    // Рандомная текущая ставка, но стабильная для каждой карточки (через id)
    const currentBid = useMemo(() => {
        const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0) * 3, 0)
        const normalized = (hash % 1000) / 1000 // 0..1
        const min = 0.1
        const max = 10
        const value = min + normalized * (max - min)
        return value.toFixed(2)
    }, [id])

    return (
        <div className={styles.card}>
            <div className={styles.inner}>
                <div className={styles.img}>
                    <img src={selectedImage} alt='img'/>

                    <p className={styles.data}>{formattedTime}</p>
                </div>

                <h2 className={styles.title}>{name}</h2>

                <div className={styles.descr}>
                    <div className={styles.current}>
                        <p className={styles.text}>Current bid</p>
                        <div className={styles.prace}>
                            <Mdi className={styles.mdi}/>
                            <p className={styles.cuurentPrace}>{currentBid}</p>
                        </div>
                    </div>

                    <a href="#" target='_blank' className={styles.btn}>
                        <p>
                            PLACE BID
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
}