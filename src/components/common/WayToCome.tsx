import classNames from 'classnames/bind'
import styles from './WayToCome.module.scss'
const cx = classNames.bind(styles)

export default function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  // "첫 줄 = 제목, 나머지 = 보조줄" 파싱
  const parseItem = (raw: string) => {
    const parts = raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const [title, ...lines] = parts
    return { title: title ?? '', lines }
  }

  return (
    <section className={cx('wtcSection')}>
      <h4 className={cx('wtcLabel')}>{label}</h4>
      <ul className={cx('wtcList')}>
        {list.map((raw, idx) => {
          const { title, lines } = parseItem(raw)
          return (
            <li key={idx} className={cx('wtcItem')}>
              <div className={cx('wtcTitle')}>{title}</div>
              {lines.length > 0 && (
                <div className={cx('wtcLines')}>
                  {lines.map((line, i) => (
                    <div key={i} className={cx('wtcLine')}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
