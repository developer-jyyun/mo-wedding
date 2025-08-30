import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'
import { IoIosArrowDown } from 'react-icons/io'

const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
  variant?: 'contact' | 'account'
  defaultOpen?: boolean
  leftIcon?: React.ReactNode
}

export default function Accordion({
  label,
  children,
  variant,
  defaultOpen = false,
  leftIcon,
}: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  // height 애니메이션 처리
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (expanded) {
      // 열릴 때: scrollHeight로 설정 → transition 끝나면 auto
      el.style.height = el.scrollHeight + 'px'
      const timer = setTimeout(() => {
        el.style.height = 'auto'
      }, 500) // transition 시간과 동일
      return () => clearTimeout(timer)
    } else {
      // 닫을 때: auto → scrollHeight로 맞춰둔 뒤 0으로 줄임
      if (el.style.height === 'auto') {
        el.style.height = el.scrollHeight + 'px'
      }
      requestAnimationFrame(() => {
        el.style.height = '0px'
      })
    }
  }, [expanded])

  const handleToggle = () => setExpanded((prev) => !prev)

  return (
    <div
      className={cx([
        'wrap-accordion',
        expanded ? 'open' : '',
        variant ? `accordion-${variant}` : '',
      ])}
    >
      <div className={cx('wrap-header')} onClick={handleToggle}>
        {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
        <span className={cx('label')}>{label}</span>
        <IoIosArrowDown className={cx('ico-arrow-down')} />
      </div>

      <div ref={contentRef} className={cx('wrap-content')}>
        <div className={cx('inner')}>{children}</div>
      </div>
    </div>
  )
}
