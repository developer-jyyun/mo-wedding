import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

type Source = { src: string; type?: string }

interface Props {
  /** 단일 경로 또는 <source> 배열 */
  sources: string | Source[]
  /** 섹션 제목 */
  title?: React.ReactNode
  /** 제목 노출 여부 :기본 true */
  showTitle?: boolean
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  playsInline?: boolean
  /** 영상 가로:세로 비율 (세로 영상은 [9,16]) */
  aspect?: [number, number]
  className?: string
}

const toArray = (s: string | Source[]): Source[] =>
  typeof s === 'string' ? [{ src: s, type: 'video/mp4' }] : s

export default function Video({
  sources,
  title = 'Video',
  showTitle = true,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  preload = 'metadata',
  playsInline = true,
  aspect = [16, 9],
  className,
}: Props) {
  const ratioStyle = { aspectRatio: `${aspect[0]} / ${aspect[1]}` }

  return (
    <Section
      className={cx('container', className)}
      title={showTitle ? title : undefined} // ← 여기 한 줄만으로 토글
    >
      <div className={cx('frame')}>
        <video
          className={cx('video')}
          style={ratioStyle}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          poster={poster}
          preload={preload}
          playsInline={playsInline}
        >
          {toArray(sources).map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))}
          브라우저가 동영상을 지원하지 않습니다.
        </video>
      </div>
    </Section>
  )
}
