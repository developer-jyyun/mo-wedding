import classNames from 'classnames/bind'
import Section from '@common/Section'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import styles from './Calendar.module.scss'
import Countdown from './../common/Countdown'

const cx = classNames.bind(styles)
//TODO:: 캘린더 반응형 및 디테일한 부분 스타일링

interface Props {
  date: string
  groomName: string
  brideName: string
}
export default function Calendar({ date, groomName, brideName }: Props) {
  const weddingDate = parseISO(date)
  console.log(weddingDate)

  return (
    <>
      <Section className={cx('container')} title="WEDDING DAY">
        <div className={cx('header')}>
          <span className={cx('text-date')}>
            {format(weddingDate, 'yyyy.MM.dd EEEE,', { locale: ko })}
          </span>
          <span className={cx('text-time')}>
            {format(weddingDate, 'aaa h시 mm분', { locale: ko })}
          </span>
        </div>
        <style>{css}</style>

        <DayPicker
          mode="single"
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
        <Countdown
          target={weddingDate}
          names={`${groomName} ♥ ${brideName}`}
          label="결혼식"
        />
      </Section>
    </>
  )
}
const css = `
.rdp-root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, .8);
  border-radius: 2rem;
  padding: 2rem;
}

/* 네비게이션, 캡션 제거 */
.rdp-nav, .rdp-month_caption {
  display: none;
}

/* 🔑 요일 헤더 고정 */
.rdp-weekdays {
  width: 100%;
  table-layout: fixed; /* 칸 균등 */
  border-collapse: collapse;
}

.rdp-weekdays th {
  text-align: center;
  border-bottom: 1px solid var(--muted-rose);
  font-weight: bold;
  width: calc(100% / 7); /* 7일 균등 */
 padding-bottom:1.4rem;
}

.rdp-day, .rdp-weekday {
  color: var(--muted-brown);
}

.rdp-weekday,
.rdp-day_button {
  cursor: default;
  line-height: 1rem;
  min-width: 40px;
  min-height: 40px;
  max-width: 80px;
  max-height: 80px;
  text-align: center;
}

/* 선택된 날짜 */
.rdp-selected {
  background: var(--muted-rose);
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
}

.rdp-selected .rdp-day_button {
  border: none;
}

`
