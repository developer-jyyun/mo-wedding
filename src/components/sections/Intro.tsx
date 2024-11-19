import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Intro.module.scss'
import { parseISO, format, getDay } from 'date-fns'
import Text from '../common/Text'

const cx = classNames.bind(styles)

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
]

interface Props {
  date: string
  locationName: string
  invitation: string
}
export default function Intro({ date, locationName, invitation }: Props) {
  const weddingDate = parseISO(date)
  const dayIndex = getDay(weddingDate)
  return (
    <>
      <Section className={cx('container')}>
        <div className={cx('info')}>
          <span>
            {format(weddingDate, 'yyyy년 mm월 dd일 ')}
            {DAYS[dayIndex]}
          </span>
          <p>{locationName}</p>
        </div>

        <article className={cx('text-box')}>
          <h3 className={cx('title')}>소중한 분들을 초대합니다.</h3>
          <Text>{invitation}</Text>
        </article>
      </Section>
    </>
  )
}
