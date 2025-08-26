import classNames from 'classnames/bind'
import Section from '@common/Section'
import styles from './Map.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { Location } from '@models/wedding'
import Text from '../common/Text'
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
  const [tab, setTab] = useState<'transit' | 'shuttle' | 'parking'>('transit')

  // ─────────────────────────────
  // Kakao Map
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )
        const map = new window.kakao.maps.Map(mapContainer.current, {
          center: position,
          level: 3,
        })
        const marker = new window.kakao.maps.Marker({ position })
        marker.setMap(map)
      })
    }

    return () => {
      // 스크립트 중복 로드 방지 (선택)
      script.remove()
    }
  }, [location])

  // ─────────────────────────────
  // Nav apps (best-effort 딥링크 → 실패 시 웹/지도 링크)
  const tryOpenApp = (appUrl: string, webUrl: string) => {
    const now = Date.now()
    // 앱 열기 시도
    window.location.href = appUrl
    // 1초 내 페이지 이탈이 없으면 실패로 보고 웹 링크
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
    // app (설치 시)
    const appUrl = `tmap://route?goalx=${location.lng}&goaly=${location.lat}&goalname=${name}`
    // web fallback
    const webUrl = `https://www.tmap.co.kr/tmap/move.aspx?lng=${location.lng}&lat=${location.lat}&name=${name}`
    tryOpenApp(appUrl, webUrl)
  }

  const openKakaoNavi = () => {
    const name = encodeURIComponent(location.name)
    const appUrl = `kakaonavi://navigate?name=${name}&x=${location.lng}&y=${location.lat}&coord_type=wgs84`
    // 카카오맵 길찾기 웹 Fallback (to)
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

      {/* 내비게이션 앱 선택 */}
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
      {/* 탭 */}
      <div className={cx('tabCard')}>
        <div className={cx('tabInner')}>
          <div
            className={cx('tabBar')}
            role="tablist"
            aria-label="오시는길 안내"
          >
            <button
              role="tab"
              aria-selected={tab === 'transit'}
              className={cx('tab', { active: tab === 'transit' })}
              onClick={() => setTab('transit')}
            >
              대중교통
            </button>
            <button
              role="tab"
              aria-selected={tab === 'shuttle'}
              className={cx('tab', { active: tab === 'shuttle' })}
              onClick={() => setTab('shuttle')}
            >
              무료 셔틀버스
            </button>
            <button
              role="tab"
              aria-selected={tab === 'parking'}
              className={cx('tab', { active: tab === 'parking' })}
              onClick={() => setTab('parking')}
            >
              주차 안내
            </button>
          </div>

          <div className={cx('tabPanel')} role="tabpanel">
            {tab === 'transit' && (
              <>
                <WayToCome label="🚌 버스" list={location.waytocome.bus} />
                <WayToCome label="🚃 지하철" list={location.waytocome.metro} />
              </>
            )}
            {tab === 'shuttle' && (
              <WayToCome
                label="🚍 무료 셔틀버스"
                list={location.waytocome.shuttle}
              />
            )}
            {tab === 'parking' && (
              <WayToCome label="🚗 주차" list={location.waytocome.car} />
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

function WayToCome({
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
