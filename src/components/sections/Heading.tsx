import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Heading.module.scss'
import { parseISO, format } from 'date-fns'
import BgmToggle from '@components/common/BgmToggle'

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
      <BgmToggle src="/assets/audio/bgm.mp3" initiallyOn initialVolume={0.18} />
      <div className={cx('top')}>
        <div className={cx('date')}>{format(weddingDate, 'MM/dd')}</div>
        <div className={cx('names')}>
          <span>{groomName}</span>
          <span className={cx('heart')} aria-hidden>
            ♥
          </span>
          <span>{brideName}</span>
        </div>
      </div>
    </Section>
  )
}
