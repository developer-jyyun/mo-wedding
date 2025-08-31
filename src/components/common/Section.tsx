import classNames from 'classnames/bind'
import styles from './Section.module.scss'
import { motion, HTMLMotionProps } from 'framer-motion'
import React from 'react'

const cx = classNames.bind(styles)

// 부모 컨테이너 애니메이션
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 자식 요소 순차적 등장
    },
  },
}

// 자식 공통 애니메이션 (custom index 사용)
const item: Record<string, any> = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as const, // as const 필수
      delay: i * 0.2, // index 기반 딜레이
    },
  }),
}

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'title'> {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}

const MotionSection = motion.section

export default function Section({
  children,
  className,
  title,
  ...rest
}: SectionProps) {
  return (
    <MotionSection
      {...rest}
      className={cx('container', className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {title && (
        <motion.div className={cx('txt-title')} variants={item} custom={0}>
          {title}
        </motion.div>
      )}
      <motion.div className={cx('content')}>
        {React.Children.map(children, (child, idx) => (
          <motion.div key={idx} variants={item} custom={idx + 1}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  )
}
