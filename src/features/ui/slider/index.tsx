import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import { ArrowCard } from './arrowCard'
import { Card } from './card'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchNfts } from '../../../store/nftSlice'
import { motion } from 'motion/react'


export const Slider = () => {
    const dispatch = useAppDispatch()
    const { items, status, error } = useAppSelector((state) => state.nfts)

    const swiperRef = useRef<SwiperType | null>(null)

    useEffect(() => {
        // При первом рендере загружаем список NFT с API
        if (status === 'idle') {
            dispatch(fetchNfts())
        }
    }, [dispatch, status])

    useEffect(() => {
        // Swiper сам управляет шириной слайдов, нам тут ничего не нужно
    }, [items.length])

    const handleNext = () => {
        swiperRef.current?.slideNext()
    }

    const handlePrev = () => {
        swiperRef.current?.slidePrev()
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles.slider}>
            <h1 className={styles.title}>Weekly - Top NFT</h1>

            {status === 'loading' && <p className={styles.loading}>Загружаем NFT...</p>}
            {status === 'failed' && <p className={styles.error}>Ошибка: {error}</p>}

            {status === 'succeeded' && (
                <div className={styles.sliderRow}>
                    <Swiper
                        modules={[Mousewheel]}
                        mousewheel={{ forceToAxis: true }}
                        spaceBetween={24}
                        slidesPerView={'auto'}
                        loop
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                    >
                        {items.map((nft) => (
                            <SwiperSlide key={nft.id} style={{ width: 'auto' }}>
                                <Card id={nft.id} name={nft.name} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <ArrowCard onPrev={handlePrev} onNext={handleNext} />
        </motion.div>
    )
}