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
import Heading from './components/sections/Heading'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch('http://localhost:8888/wedding')
      .then((response) => {
        if (!response.ok) throw new Error('청첩장 정보를 불러오지 못함')
        return response.json()
      })
      .then((data) => {
        if (!cancelled) setWedding(data)
      })
      .catch((e) => {
        console.error('Error:', e)
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

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
  if (wedding === null) return null

  const { groom, bride, date, galleryImages, message, location } = wedding

  return (
    <div className={cx('container')}>
      {/* <Heading date={date} groomName={groom.name} brideName={bride.name} /> */}

      <Main />
      <Intro
        invitation={message.invitation}
        locationName={location.name}
        date={date}
      />
      <Contact groom={groom} bride={bride} />

      <ImageGallery images={galleryImages} />
      <Video />

      <Calendar date={date} groomName={groom.name} brideName={bride.name} />

      <Map location={location} />
      <Account groom={groom} bride={bride} />
    </div>
  )
}

export default App
