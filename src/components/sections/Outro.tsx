import React from 'react'
import styles from './Outro.module.scss'
import classNames from 'classnames/bind'
import Section from '@common/Section'

const cx = classNames.bind(styles)
export default function Outro() {
  return (
    <Section className={cx('container')}>
      <div className={cx('text')}>
        <p className={cx('top-text', 'gradient-text')}>Here begins Our</p>

        <div className={cx('main-text', 'gradient-text')}>
          <p>Happily</p>
          <p> ever</p>
          <p>After</p>
        </div>
      </div>
      <div className={cx('glow')}></div>

      <div className={cx('image-wrap')}>
        <img
          className={cx('img')}
          src="/assets/images/outro.png"
          alt="이미지"
        />
      </div>

      <p className={cx('copy-text')}>© Our Story, All rights reserved.</p>
    </Section>
  )
}
