import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'

import FullScreenIntro from '@common/FullScreenIntro'
import FullScreenMessage from '@common/FullScreenMessage'

import Video from './components/sections/Video'
import ImageGallery from './components/sections/ImageGallery'
import Invitation from '@components/sections/Invitation'
import { Wedding } from '@models/wedding'
import Main from '@components/sections/Main'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'
import Account from '@components/sections/Account'
import Outro from './components/sections/Outro'
import TopButton from './components/common/TopButton'
import BgmToggle from './components/common/BgmToggle'

const cx = classNames.bind(styles)

function App() {
  const [intro, setIntro] = useState(true)
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 인트로 종료 타이머
  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 10000) // 인트로 지속 시간
    return () => clearTimeout(timer)
  }, [])

  // wedding.json 데이터 fetch
  useEffect(() => {
    if (intro) return
    let cancelled = false
    setLoading(true)

    fetch('/wedding.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setWedding(data.wedding)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))

    return () => {
      cancelled = true
    }
  }, [intro])

  // Intro 전체 화면
  if (intro) return <FullScreenIntro onFinish={() => setIntro(false)} />

  // 에러 화면
  if (error) {
    return (
      <FullScreenMessage
        type="error"
        text="에러가 발생했어요! 잠시 후 다시 시도해주세요."
      />
    )
  }

  // wedding 데이터 없으면 null
  if (!wedding) return null

  // wedding 데이터 구조분해
  const { groom, bride, date, galleryImages, message, location } = wedding

  return (
    <div className={cx('container')}>
      <BgmToggle src="/assets/audio/bgm.mp3" initialVolume={0.28} />
      <Main />
      <Invitation
        invitation={message.invitation}
        locationName={location.name}
        date={date}
      />
      <Contact groom={groom} bride={bride} />
      <ImageGallery images={galleryImages} />
      <Video sources="/assets/wedding.mp4" poster="/assets/poster.webp" />
      <Calendar date={date} groomName={groom.name} brideName={bride.name} />
      <Map location={location} />
      <Account groom={groom} bride={bride} />
      <Outro />
      <TopButton />
    </div>
  )
}

export default App
