import styles from './PersonItem.module.scss'
import classNames from 'classnames/bind'
import { PiPhoneCallFill } from 'react-icons/pi'
import { TbMessage } from 'react-icons/tb'
import IconButton from '@common/IconButton'
import { handleCall, handleMessage } from '@/utils/ContactActions'

interface PersonItemProps {
  role: { type: string; main: string; sub?: string }
  name: string

  iconType: 'contact' | 'account'
  phoneNumber: number
}

const cx = classNames.bind(styles)

export default function PersonItem({
  role,
  name,
  phoneNumber,

  iconType,
}: PersonItemProps) {
  return (
    <div className={cx('person-wrap')}>
      {role.type === 'self' && (
        <h3 className={cx('title')}>
          {role.main}측 <span className={cx('sub-title')}> {role.sub}</span>
        </h3>
      )}
      <div className={cx('person-item')}>
        <p>
          <span>{role.main}&nbsp;</span>
          <span className={cx('name')}>{name}&nbsp;</span>
        </p>
        <ul className={cx('icon-wrap')}>
          {iconType === 'contact' && phoneNumber && (
            <>
              <IconButton
                icon={<PiPhoneCallFill />}
                onClick={() => handleCall(phoneNumber)}
              />
              <IconButton
                icon={<TbMessage />}
                onClick={() => handleMessage(phoneNumber)}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
