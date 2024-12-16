import { ReactNode } from 'react'
import styles from './IconButton.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
interface IconButtonProps {
  icon: ReactNode
  onClick: () => void
  className?: string
}
export default function IconButton({
  icon,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <li className={cx('icon', className)} onClick={onClick}>
      {icon}
    </li>
  )
}
