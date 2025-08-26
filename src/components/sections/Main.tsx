import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Main.module.scss'
import FallingFX from '@components/effects/FallingFX'

const cx = classNames.bind(styles)

export default function Main() {
  return (
    <>
      <Section pop stagger className={cx('mainRoot')}>
        {/* <FallingFX mode="snow" density={0.8} wind={6} zIndex={1} /> */}
        <FallingFX
          mode="petal"
          density={1.05} //
          wind={10} // 8~12 사이 추천
          speed={0.92} // 전체 속도 살짝 ↓
          layers={3} // 원근감 추가
          burst // 초반 풍성
          maxFps={60}
          zIndex={0}
        />
        <div className={cx('main')}>
          <div className={cx('titleBox', 'revealTitle')}>
            <p>Welcome</p>
            <p> to</p>
            <p>Our</p>
            <p>Wedding!</p>
          </div>
          <img src="/assets/images/wd03.jpg" alt="메인이미지" />
        </div>
      </Section>
    </>
  )
}
