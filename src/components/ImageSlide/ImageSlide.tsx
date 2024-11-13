import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './swiper.css'
import classNames from 'classnames/bind'
import styles from './ImageSlide.module.scss'
import { FaWindowClose } from 'react-icons/fa'

const cx = classNames.bind(styles)

interface Props {
  images: string[]
  open: boolean
  selectedIdx: number
  onClose: () => void
}

export default function ImageSlide({
  images,
  open = false,
  selectedIdx,
  onClose,
}: Props) {
  if (!open) return null

  return (
    <div className={cx('dim')}>
      <FaWindowClose className={cx('close')} onClick={onClose} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        // ref={swiperRef}
        initialSlide={selectedIdx}
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <img src={img} alt="갤러리 이미지" />
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </div>
  )
}
