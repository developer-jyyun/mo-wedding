import classNames from 'classnames/bind'
import Section from '@common/Section'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import styles from './Calendar.module.scss'

const cx = classNames.bind(styles)
//TODO:: 캘린더 반응형 및 디테일한 부분 스타일링
const css = `
.rdp-root{
    width:100%;    
    display: flex;
    justify-content: center;
}
.rdp-months{   
    justify-content:center;
    padding:2rem;
    background: rgba(255, 255, 255,.8);
    border-radius:1rem;
}
.rdp-nav,.rdp-month_caption {
    display: none;
}
.rdp-month_grid{
    display:flex;
    flex-direction: column;
}
.rdp-month_grid .rdp-weekday{

    border-bottom:1px solid var(--muted-rose); font-weight:bold;
}
.rdp-weeks{
    padding-top:2rem;
}
.rdp-day, .rdp-weekday{
    color:var(--muted-brown);
}
.rdp-weekday, .rdp-day_button{
    cursor:default;
    width: 10vw;  
    height: 10vw; 
    line-height: 10vw; 
    min-width: 40px;
    min-height: 40px;
    max-width: 80px;
    max-height: 80px;
}
.rdp-selected{
    background:var(--muted-rose);border-radius:50%; 
    color:#fff;
    font-weight:bold;
}
.rdp-selected .rdp-day_button{
    border:none;
}

`
interface Props {
  date: string
}
export default function Calendar({ date }: Props) {
  const weddingDate = parseISO(date)
  console.log(weddingDate)

  return (
    <>
      <Section className={cx('container')}>
        <div className={cx('header')}>
          <span className={cx('text-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('text-time')}>
            {format(weddingDate, 'aaa h시 mm분 eeee', { locale: ko })}
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
      </Section>
    </>
  )
}
