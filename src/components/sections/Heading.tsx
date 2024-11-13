import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Heading.module.scss'
import { parseISO, format, getDay } from 'date-fns'

const cx = classNames.bind(styles)

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
interface Props {
  date: string
}
export default function Heading({ date }: Props) {
  const weddingDate = parseISO(date)
  const dayIndex = getDay(weddingDate)
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[dayIndex]}</div>
    </Section>
  )
}
