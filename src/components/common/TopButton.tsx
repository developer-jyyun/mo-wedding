import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import styles from './TopButton.module.scss'
import classNames from 'classnames/bind'
import Button from './Button'

const cx = classNames.bind(styles)

export default function TopButton() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className={cx('TopButton')}>
      {showTop && (
        <Button
          shape="circle"
          icon={<IoIosArrowUp size={20} />}
          aria-label="맨 위로"
          title="맨 위로"
          onClick={goTop}
        />
      )}
    </div>
  )
}
