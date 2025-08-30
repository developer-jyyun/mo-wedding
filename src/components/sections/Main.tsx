import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Main.module.scss'
import FallingFX from '@components/effects/FallingFX'
import BgmToggle from '../common/BgmToggle'

const cx = classNames.bind(styles)

export default function Main() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 로딩이 끝났다고 판단하는 시점
    const timer = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      <Section className={cx('mainRoot')}>
        <FallingFX
          mode="petal"
          density={1.2} //
          wind={10} // 8~12 사이
          speed={0.92} // 전체 속도 살짝 ↓
          layers={3} // 원근감 추가
          burst // 초반 풍성
          maxFps={60}
          zIndex={0}
        />
        <div className={cx('main')}>
          <div className={cx('titleBox', { animate: ready })}>
            <p>Welcome</p>
            <p>to</p>
            <p>Our</p>
            <p>Wedding!</p>
          </div>
          <img src="/assets/images/wd03.webp" alt="메인이미지" />
        </div>
      </Section>
    </>
  )
}
