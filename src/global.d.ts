// SCSS modules
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.scss'

// classnames/bind
declare module 'classnames/bind' {
  import classNames from 'classnames'
  export default classNames
}

/**
 * react-icons 타입 보강:
 * 아이콘 컴포넌트를 JSX에서 바로 쓸 수 있도록 반환 타입을 JSX.Element로 고정
 */
declare module 'react-icons' {
  import type { FC, SVGProps } from 'react'
  export type IconType = FC<SVGProps<SVGSVGElement>>
}
