import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import commonStyles from '@/components/common/PersonItem.module.scss'
import styles from './AccountItem.module.scss'

const ccx = classNames.bind(commonStyles)
const cx = classNames.bind(styles)

interface Props {
  bankName?: string
  accountNumber?: string
  roleText: string
  name: string
  actions?: ReactNode
}

export default function AccountItem({
  bankName,
  accountNumber,
  roleText,
  name,
  actions,
}: Props) {
  return (
    <div className={`${ccx('person-wrap')} ${cx('account-item')}`}>
      <div className={cx('rowTop')}>
        <span className={cx('role')}>{roleText}</span>
        <span className={cx('name')}>{name}</span>
      </div>

      <div className={cx('rowBottom')}>
        <span className={cx('bank')}>
          {bankName ?? '-'} {accountNumber ?? '-'}
        </span>
        <span className={cx('actions')}>{actions}</span>
      </div>
    </div>
  )
}
