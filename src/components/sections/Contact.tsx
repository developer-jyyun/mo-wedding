import classNames from 'classnames/bind'
import styles from './Contact.module.scss'
import Section from '@common/Section'
import { Wedding } from '@models/wedding'

import PersonItem from '@common/PersonItem'
import Accordion from '@common/Accordion'

const cx = classNames.bind(styles)

interface Props {
  groom: Wedding['groom']
  bride: Wedding['bride']
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

      <Accordion label="연락처">
        <PersonItem
          className={'groom'}
          role={{ type: 'self', main: '신랑', sub: 'groom' }}
          name={groom.name}
          phoneNumber={groom.phoneNumber}
          iconType="contact"
        />
        {groom.parents.map((parent, idx) => {
          return (
            <PersonItem
              key={idx}
              className={'groom'}
              role={{ type: 'parent', main: `신랑의 ${parent.relation}` }}
              name={parent.name}
              phoneNumber={parent.phoneNumber}
              iconType="contact"
            />
          )
        })}

        <PersonItem
          className={'bride'}
          role={{ type: 'self', main: '신부', sub: 'bride' }}
          name={bride.name}
          phoneNumber={bride.phoneNumber}
          iconType="contact"
        />
        {bride.parents.map((parent, idx) => {
          return (
            <PersonItem
              key={idx}
              className={'bride'}
              role={{ type: 'parent', main: `신부의 ${parent.relation}` }}
              name={parent.name}
              phoneNumber={parent.phoneNumber}
              iconType="contact"
            />
          )
        })}
      </Accordion>
    </Section>
  )
}
