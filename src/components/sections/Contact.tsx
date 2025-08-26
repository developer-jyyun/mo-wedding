import { ReactElement } from 'react'
import classNames from 'classnames/bind'
import Section from '@common/Section'
import { Wedding } from '@models/wedding'
import Accordion from '@common/Accordion'
import { PiPhoneCallFill } from 'react-icons/pi'
import { TbMessage } from 'react-icons/tb'
import { handleCall, handleMessage } from '@/utils/ContactActions'
import PersonGroup from '@common/PersonGroup'
import styles from '@/components/sections/Contact.module.scss'
const cx = classNames.bind(styles)

interface Props {
  groom: Wedding['groom']
  bride: Wedding['bride']
}

const actions = (phoneNumber?: string): ReactElement[] => {
  if (!phoneNumber) return []
  return [
    <PiPhoneCallFill key="call" onClick={() => handleCall(phoneNumber)} />,
    <TbMessage key="message" onClick={() => handleMessage(phoneNumber)} />,
  ]
}

export default function Contact({ groom, bride }: Props) {
  return (
    <Section className={cx('container')}>
      <div className={cx('contact-header')}>
        <p>
          <span className={cx('name')}>
            {groom.parents[0]?.name} · {groom.parents[1]?.name}
          </span>
          의 {groom.relation} <span className={cx('name')}>{groom.name}</span>
        </p>
        <p>
          <span className={cx('name')}>
            {bride.parents[0]?.name} · {bride.parents[1]?.name}
          </span>
          의 {bride.relation} <span className={cx('name')}>{bride.name}</span>
        </p>
      </div>

      <Accordion label="연락처" variant="contact">
        <div className={cx('contact-contents')}>
          {/* 신랑측 */}
          <div className={cx('groom')}>
            <PersonGroup
              side="groom"
              role={{ type: 'self', main: '신랑', sub: 'groom' }}
              name={groom.name}
              selfActions={actions(groom.phoneNumber)}
              parents={groom.parents}
              actions={(p) => actions(p.phoneNumber)}
            />
          </div>

          {/* 신부측 */}
          <div className={cx('bride')}>
            <PersonGroup
              side="bride"
              role={{ type: 'self', main: '신부', sub: 'bride' }}
              name={bride.name}
              selfActions={actions(bride.phoneNumber)}
              parents={bride.parents}
              actions={(p) => actions(p.phoneNumber)}
            />
          </div>
        </div>
      </Accordion>
    </Section>
  )
}
