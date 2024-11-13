import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './ImageGallery.module.scss'
import ImageSlide from '@/components/ImageSlide/ImageSlide'
import { useState } from 'react'

const cx = classNames.bind(styles)

interface Props {
  images: string[]
}
export default function ImageGallery({ images }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(-1)

  const open = selectedIdx !== -1

  const handleSelectedImage = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }
  return (
    <>
      <Section className={cx('container')} title="Gallery">
        <ul className={cx('wrap-images')}>
          {images.map((img, idx) => (
            <li
              className={cx('image')}
              key={idx}
              onClick={() => {
                handleSelectedImage(idx)
              }}
            >
              <img src={img} alt="갤러리 이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageSlide
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}
