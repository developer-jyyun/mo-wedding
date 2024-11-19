import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}
export default function Section({ children, className, title }: SectionProps) {
  return (
    <section className={cx(['container', className])}>
      {title != null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}
