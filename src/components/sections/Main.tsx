import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export default function Main() {
  return (
    <>
      <Section className={cx('container')}>
        <div className={cx('main')}>
          <div className={cx('title-box')}>
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
