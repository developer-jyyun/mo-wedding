import styles from './FullScreenIntro.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
export default function FullScreenIntro() {
  return (
    <div className={cx('container')}>
      <div
        className={cx('inner')}
        style={{ backgroundImage: "url('/assets/images/wd08.webp')" }}
      >
        <div className={cx('intro-content')}>
          <div className={cx('line1')}>We are getting</div>
          <div className={cx('line2')}>Married !</div>
        </div>
      </div>
    </div>
  )
}
