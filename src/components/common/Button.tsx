import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react'
const cx = classNames.bind(styles)

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rect' | 'pill' | 'circle'
  icon?: ReactNode
  imgSrc?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & ButtonHTMLAttributes<HTMLButtonElement> //모든 기본 버튼 속성을 자동으로 받을 수 있음(onClick 등 포함됨)

export default function Button({
  size = 'md',
  shape = 'rect',
  icon,
  imgSrc,
  children,
  className,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest} // 여기서 onClick, type, disabled 등 모두 전달됨
      style={style}
      className={cx('btn', size, shape, className)}
    >
      {imgSrc && <img src={imgSrc} alt="" className={cx('img')} />}
      {icon && <span className={cx('icon')}>{icon}</span>}
      {children && <span className={cx('label')}>{children}</span>}
    </button>
  )
}
