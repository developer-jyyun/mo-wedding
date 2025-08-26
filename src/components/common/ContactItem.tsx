import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './ContactItem.module.scss'

const cx = classNames.bind(styles)

export type Role = { type: string; main: string; sub?: string }

interface ContactItemProps {
  role: Role
  name: string
  actions?: ReactNode
}

export default function ContactItem({ role, name, actions }: ContactItemProps) {
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
