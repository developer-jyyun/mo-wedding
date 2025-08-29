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
        <p className={cx('main-text', 'gradient-text')}>Happily ever After</p>
      </div>
    </Section>
  )
}
