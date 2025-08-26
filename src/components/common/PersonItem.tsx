// src/components/sections/AccountItem.tsx
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
  /** 1행 오른쪽(카카오 등) */
  nameActions?: ReactNode
  /** 2행 오른쪽(복사 등) */
  accountActions?: ReactNode
  /** 🔙 과거 코드 호환용: 쓰면 accountActions 대신 렌더 */
  actions?: ReactNode
}

export default function AccountItem({
  bankName,
  accountNumber,
  roleText,
  name,
  nameActions,
  accountActions,
  actions,
}: Props) {
  return (
    <div className={`${ccx('person-wrap')} ${cx('account-item')}`}>
      {/* 1행: 관계 + 이름 + (카카오) */}
      <div className={cx('rowTop')}>
        <div className={cx('topLeft')}>
          <span className={cx('role')}>{roleText}</span>
          <span className={cx('name')}>{name}</span>
        </div>
        <div className={cx('topActions')}>{nameActions}</div>
      </div>

      {/* 2행: 은행/계좌 + (복사/과거 actions) */}
      <div className={cx('rowBottom')}>
        <span className={cx('bank')}>
          {bankName ?? '-'} {accountNumber ?? '-'}
        </span>
        <span className={cx('actions')}>{accountActions ?? actions}</span>
      </div>
    </div>
  )
}
