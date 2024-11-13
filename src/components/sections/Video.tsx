import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import Section from '@common/Section'

const cx = classNames.bind(styles)

export default function Video() {
  return (
    <Section className={cx('container')} title="Video">
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        controls={true}
        poster="/assets/poster.jpg"
      >
        <source src="/assets/wedding.mp4" type="video/mp4"></source>
      </video>
    </Section>
  )
}
