import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Countdown.module.scss'

const cx = classNames.bind(styles)

type Props = {
  target: Date | string | number
  label?: string
  names?: string
  /** 갱신 간격(ms) — 기본 1000 */
  tick?: number
}

function toDate(v: Date | string | number): Date {
  return v instanceof Date ? v : new Date(v)
}

export default function Countdown({
  target,
  label = '결혼식',
  names,
  tick = 1000,
}: Props) {
  const targetDate = useMemo(() => toDate(target), [target])

  const calc = () => {
    const now = new Date().getTime()
    const t = targetDate.getTime()
    const diff = t - now // 미래면 +, 과거면 -
    const past = diff < 0
    const abs = Math.abs(diff)

    const d = Math.floor(abs / 86400000) // 1000*60*60*24
    const h = Math.floor((abs % 86400000) / 3600000)
    const m = Math.floor((abs % 3600000) / 60000)
    const s = Math.floor((abs % 60000) / 1000)

    return { d, h, m, s, past, abs }
  }

  const [t, setT] = useState(calc)

  useEffect(() => {
    setT(calc())
    const id = setInterval(() => setT(calc), Math.max(250, tick))
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime(), tick])

  // 문장
  let sentence: React.ReactNode
  if (t.abs < 1000) {
    sentence = (
      <>
        {names ? <strong className={cx('names')}>{names}</strong> : null}의
        <strong className={cx('label')}>{label}</strong>이
        <strong className={cx('accent')}>오늘</strong>
        입니다.
      </>
    )
  } else if (t.past) {
    sentence = (
      <>
        {names ? <strong className={cx('names')}>{names}</strong> : null}의
        <strong className={cx('label')}>{label}</strong>이
        <strong className={cx('accent')}>{t.d}일</strong> 지났습니다.
      </>
    )
  } else {
    sentence = (
      <>
        {names ? <strong className={cx('names')}>{names}</strong> : null}의
        <strong className={cx('label')}>{label}</strong>이
        <strong className={cx('accent')}>{t.d}일</strong> 남았습니다.
      </>
    )
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className={cx('countdown')}>
      <div className={cx('timer')}>
        <div className={cx('box')}>
          <div className={cx('num')}>{pad(t.d)}</div>
          <div className={cx('unit')}>DAYS</div>
        </div>
        <div className={cx('box')}>
          <div className={cx('num')}>{pad(t.h)}</div>
          <div className={cx('unit')}>HOUR</div>
        </div>
        <div className={cx('box')}>
          <div className={cx('num')}>{pad(t.m)}</div>
          <div className={cx('unit')}>MIN</div>
        </div>
        <div className={cx('box')}>
          <div className={cx('num')}>{pad(t.s)}</div>
          <div className={cx('unit')}>SEC</div>
        </div>
      </div>

      <p className={cx('sentence')}>{sentence}</p>
    </div>
  )
}
