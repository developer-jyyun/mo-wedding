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
  /** 1행(이름 라인) 오른쪽 액션: 카카오페이 등 */
  nameActions?: ReactNode
  /** 2행(계좌 라인) 오른쪽 액션: 복사 등 */
  accountActions?: ReactNode
}

export default function AccountItem({
  bankName,
  accountNumber,
  roleText,
  name,
  nameActions,
  accountActions,
}: Props) {
  return (
    <div className={`${ccx('person-wrap')} ${cx('account-item')}`}>
      <div className={cx('rowTop')}>
        <div className={cx('topLeft')}>
          <span className={cx('role')}>{roleText}</span>
          <span className={cx('name')}>{name}</span>
        </div>
        <div className={cx('topActions')}>{nameActions}</div>
      </div>

      <div className={cx('rowBottom')}>
        <span className={cx('bank')}>
          {bankName ?? '-'} {accountNumber ?? '-'}
        </span>
        <span className={cx('actions')}>{accountActions}</span>
      </div>
    </div>
  )
}
