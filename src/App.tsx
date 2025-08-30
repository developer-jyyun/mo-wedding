import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import FullScreenMessage from '@common/FullScreenMessage'

import Video from './components/sections/Video'
import ImageGallery from './components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import { Wedding } from '@models/wedding'
import Main from '@components/sections/Main'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'
import Account from '@components/sections/Account'
import Outro from './components/sections/Outro'
import TopButton from './components/common/TopButton'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // const API_URL = process.env.REACT_APP_API_URL
  // console.log('✅ API_URL:', API_URL)
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch('/wedding.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setWedding(data.wedding) // ✅ wedding 키 안쪽만 저장
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <FullScreenMessage type="loading" />
  if (error)
    return (
      <FullScreenMessage
        type="error"
        text="에러가 발생했어요! 잠시 후 다시 시도해주세요."
      />
    )
  if (!wedding) return null // wedding이 null이면 바로 종료

  const { groom, bride, date, galleryImages, message, location } = wedding

  return (
    <div className={cx('container')}>
      <Main />
      <Intro
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
      {wedding && <TopButton />}
    </div>
  )
}

export default App
