import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Heading.module.scss'
import { parseISO, format } from 'date-fns'

const cx = classNames.bind(styles)

interface Props {
  date: string
  groomName: string
  brideName: string
}
export default function Heading({ date, groomName, brideName }: Props) {
  const weddingDate = parseISO(date)
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'MM/dd')}</div>
      <div className={cx('couple')}>
        <span>{groomName}</span>
        <span>♥</span>
        <span>{brideName}</span>
      </div>
    </Section>
  )
}
