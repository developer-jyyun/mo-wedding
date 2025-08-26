import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
  stagger?: boolean
  pop?: boolean
  gutter?: 'default' | 'none'
  reveal?: boolean
}

export default function Section({
  children,
  className,
  title,
  stagger,
  pop,
  gutter = 'default',
  reveal = true,
  ...rest
}: SectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!reveal) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.isVisible) // 로컬(해시) 클래스
          el.setAttribute('data-visible', 'true') //  전역 훅 추가
          io.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [reveal])

  return (
    <section
      ref={ref}
      {...rest}
      className={cx(
        'container',
        { stagger, pop },
        gutter === 'none' && 'noGutter',
        className,
      )}
    >
      {title != null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}
