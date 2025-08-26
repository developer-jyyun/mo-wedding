import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './PersonItem.module.scss'

const cx = classNames.bind(styles)

export type Role = { type: string; main: string; sub?: string }

export interface PersonItemProps {
  role: Role
  name: string
  /** 연락/계좌 아이콘들을 외부에서 만들어 넣는 슬롯 */
  actions?: ReactNode
  /** 과거 코드 호환용(지금은 쓰지 않아도 되게 optional 처리) */
  iconType?: 'contact' | 'account'
  phoneNumber?: number
}

export default function PersonItem({ role, name, actions }: PersonItemProps) {
  return (
    <div className={cx('person-wrap')}>
      {role.type === 'self' && (
        <h3 className={cx('title')}>
          {role.main}측 <span className={cx('sub-title')}>{role.sub}</span>
        </h3>
      )}

      <div className={cx('person-item')}>
        <div className={cx('text')}>
          <span className={cx('label')}>{role.main}</span>
          <span className={cx('name')}>{name}</span>
        </div>
        <ul className={cx('icon-wrap')}>{actions}</ul>
      </div>
    </div>
  )
}
