import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Map.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { Location } from '@models/wedding'
import icoNaver from '@/assets/icons/ico_navernav.png'
import icoTmap from '@/assets/icons/ico_tnav.png'
import icoKakao from '@/assets/icons/ico_kakaonav.png'

declare global {
  interface Window {
    kakao: any
  }
}
const cx = classNames.bind(styles)

interface Props {
  location: Location
}

export default function Map({ location }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true) // 지도 로딩 상태

  // ─────────────────────────────
  // Kakao Map
  useEffect(() => {
    const KAKAO_MAP_KEY =
      process.env.REACT_APP_KAKAO_JS_KEY ?? process.env.REACT_APP_KAKAO_KEY

    if (!KAKAO_MAP_KEY) {
      console.warn('Kakao Map key missing. Skip map load.')
      setLoading(false) // 최소한 화면은 뜨게
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`
    script.async = true
    script.onload = () => {
      try {
        window.kakao.maps.load(() => {
          const position = new window.kakao.maps.LatLng(
            location.lat,
            location.lng,
          )
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: position,
            level: 3,
          })
          new window.kakao.maps.Marker({ position }).setMap(map)
          setLoading(false)
        })
      } catch (e) {
        console.error('Kakao Map init failed', e)
        setLoading(false)
      }
    }
    script.onerror = () => {
      console.error('Failed to load Kakao Map SDK')
      setLoading(false)
    }
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [location])

  // ─────────────────────────────
  // Nav apps
  const tryOpenApp = (appUrl: string, webUrl: string) => {
    const now = Date.now()
    window.location.href = appUrl
    setTimeout(() => {
      if (Date.now() - now < 1200) {
        window.open(webUrl, '_blank', 'noopener,noreferrer')
      }
    }, 1000)
  }

  const openNaver = () => {
    const name = encodeURIComponent(location.name)
    const appUrl = `nmap://route/car?dlat=${location.lat}&dlng=${location.lng}&dname=${name}`
    const webUrl = `https://map.naver.com/v5/directions/-/-/${location.lng},${location.lat},${name}`
    tryOpenApp(appUrl, webUrl)
  }

  const openTmap = () => {
    const name = encodeURIComponent(location.name)
    const appUrl = `tmap://route?goalx=${location.lng}&goaly=${location.lat}&goalname=${name}`
    const webUrl = `https://www.tmap.co.kr/tmap/move.aspx?lng=${location.lng}&lat=${location.lat}&name=${name}`
    tryOpenApp(appUrl, webUrl)
  }

  const openKakaoNavi = () => {
    const name = encodeURIComponent(location.name)
    const appUrl = `kakaonavi://navigate?name=${name}&x=${location.lng}&y=${location.lat}&coord_type=wgs84`
    const webUrl = `https://map.kakao.com/link/to/${name},${location.lat},${location.lng}`
    tryOpenApp(appUrl, webUrl)
  }

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      {/* 지도 + 길찾기 버튼 */}
      <div className={cx('wrap-map')}>
        {loading && (
          <div className={cx('map-placeholder')}>🗺 지도를 불러오는 중...</div>
        )}
        <div className={cx('map')} ref={mapContainer} />
        <a
          className={cx('btn-find-way')}
          href={location.link}
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>

      {/* 내비게이션 앱 버튼 */}
      <div className={cx('navapps')}>
        <button className={cx('navbtn', 'naver')} onClick={openNaver}>
          <img src={icoNaver} alt="" aria-hidden="true" />
          <span>네이버 지도</span>
        </button>
        <button className={cx('navbtn', 'tmap')} onClick={openTmap}>
          <img src={icoTmap} alt="" aria-hidden="true" />
          <span>티맵</span>
        </button>
        <button className={cx('navbtn', 'kakao')} onClick={openKakaoNavi}>
          <img src={icoKakao} alt="" aria-hidden="true" />
          <span>카카오내비</span>
        </button>
      </div>
    </Section>
  )
}
