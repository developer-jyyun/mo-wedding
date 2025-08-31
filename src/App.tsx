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
  const [error, setError] = useState(false)

  useEffect(() => {
    // 인트로 fadeOut(1.2s) + delay(4s) = 총 5.2s
    const timer = setTimeout(() => {
      setIntro(false)
    }, 5200)

    return () => clearTimeout(timer)
  }, [])

  // 데이터 fetch
  useEffect(() => {
    if (intro) return
    let cancelled = false

    fetch('/wedding.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setWedding(data.wedding)
      })
      .catch(() => setError(true))

    return () => {
      cancelled = true
    }
  }, [intro])

  // Intro만 화면 전체 오버레이
  if (intro) return <FullScreenIntro />

  // 데이터 에러 시
  if (error) {
    return (
      <FullScreenMessage
        type="error"
        text="에러가 발생했어요! 잠시 후 다시 시도해주세요."
      />
    )
  }

  // wedding 데이터가 없을 경우(예외 처리)
  if (!wedding) {
    return (
      <FullScreenMessage type="loading" text="데이터를 불러오는 중입니다..🐢" />
    )
  }

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
