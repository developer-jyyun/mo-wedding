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
      staggerChildren: 0.15, // 살짝 간격
    },
  },
}

// 자식 공통 애니메이션
const item = {
  hidden: { opacity: 0, y: 40 }, // y값 크게 → 스르륵 위로 올라오는 느낌
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1, // AOS 기본은 1초
      ease: [0.25, 0.1, 0.25, 1] as any, // CSS 기본 ease
    },
  },
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
        <motion.div className={cx('txt-title')} variants={item}>
          {title}
        </motion.div>
      )}
      <motion.div className={cx('content')}>
        {React.Children.map(children, (child, idx) => (
          <motion.div key={idx} variants={item}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  )
}
