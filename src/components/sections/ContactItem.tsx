import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import commonStyles from '@/components/common/PersonItem.module.scss'
import contactStyles from './ContactItem.module.scss'

const ccx = classNames.bind(commonStyles)
const cx = classNames.bind(contactStyles)

export type Role = { type: string; main: string; sub?: string }

interface ContactItemProps {
  role: Role
  name: string
  actions?: ReactNode
}

export default function ContactItem({ role, name, actions }: ContactItemProps) {
  return (
    <div className={`${ccx('person-wrap')} ${cx('person-wrap')}`}>
      {role.type === 'self' && (
        <h3 className={`${ccx('title')} ${cx('title')}`}>
          {role.main}측{' '}
          <span className={`${ccx('sub-title')} ${cx('sub-title')}`}>
            {role.sub}
          </span>
        </h3>
      )}

      <div className={`${ccx('person-item')} ${cx('person-item')}`}>
        <div className={`${ccx('text')} ${cx('text')}`}>
          <span className={`${ccx('label')} ${cx('label')}`}>{role.main}</span>
          <span className={`${ccx('name')} ${cx('name')}`}>{name}</span>
        </div>
        <ul className={`${ccx('icon-wrap')} ${cx('icon-wrap')}`}>{actions}</ul>
      </div>
    </div>
  )
}
