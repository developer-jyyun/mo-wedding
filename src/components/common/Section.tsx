import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

// DOM title(string)과 충돌 방지를 위해 Omit
interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
  /** 자식 요소 순차 등장 */
  stagger?: boolean
  /** 히어로/CTA 팝 느낌 강화 (거리/스케일 살짝 증가) */
  pop?: boolean
  /** 섹션 패딩 제어: 기본(default)/없음(none) */
  gutter?: 'default' | 'none'
  /** 리빌 애니메이션 켜/끄기 (내부 섹션 중첩 시 끄기용) */
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
          el.classList.add(styles.isVisible)
          io.unobserve(el) // 한 번만
        }
      },
      {
        threshold: 0.08, // 살짝 더 일찍 트리거
        rootMargin: '0px 0px -5% 0px',
      },
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
