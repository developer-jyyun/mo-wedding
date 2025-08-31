import { useEffect, useState } from 'react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'

declare global {
  interface Window {
    __bgmAudio?: HTMLAudioElement
  }
}

type Props = {
  src?: string
  floating?: boolean
  initialVolume?: number
}

export default function BgmToggle({
  src = '/assets/audio/bgm.mp3',
  floating = true,
  initialVolume = 0.24,
}: Props) {
  const [mutedUI, setMutedUI] = useState(true)
  const [ready, setReady] = useState(false) // 버튼 등장
  const [showTip, setShowTip] = useState(false) // 마운트 여부
  const [tipVisible, setTipVisible] = useState(false) // 실제 화면 노출 여부 (fade)

  // Intro 끝난 뒤 버튼 딜레이 + 툴팁 딜레이
  useEffect(() => {
    const btnTimer = setTimeout(() => setReady(true), 500) // 0.5s 뒤 버튼 표시

    const tipTimer = setTimeout(() => {
      setShowTip(true)
      setTimeout(() => setTipVisible(true), 50) // fade-in
    }, 1500) // 1.5s 뒤 툴팁 등장

    const hideTipTimer = setTimeout(() => {
      setTipVisible(false) // fade-out
      setTimeout(() => setShowTip(false), 1000) // transition 끝난 뒤 DOM 제거
    }, 4000) // 1.5s 뒤 등장 + (약 2.5s 유지) = 4s 시점에 fade-out 시작

    return () => {
      clearTimeout(btnTimer)
      clearTimeout(tipTimer)
      clearTimeout(hideTipTimer)
    }
  }, [])

  // 오디오 준비
  useEffect(() => {
    const abs = new URL(src, window.location.href).href
    let audio = window.__bgmAudio

    if (!audio) {
      audio = window.__bgmAudio = new Audio()
      audio.loop = true
      audio.preload = 'auto'
      document.body.appendChild(audio)
    }

    if (audio.src !== abs) {
      audio.src = abs
    }

    audio.volume = initialVolume
    audio.pause()
    audio.load()
  }, [src, initialVolume])

  const toggle = () => {
    const a = window.__bgmAudio
    if (!a) return

    if (a.paused) {
      a.currentTime = 0
      a.volume = initialVolume
      a.play().catch((err) => console.error('[BGM] 재생 실패', err))
      setMutedUI(false)
    } else {
      a.pause()
      setMutedUI(true)
    }
  }

  const Btn = (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: 1 }}>
      <button
        type="button"
        onClick={toggle}
        aria-label={mutedUI ? '배경음악 켜기' : '배경음악 끄기'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 999,
          border: '1px solid var(--light-gray)',
          background: 'rgba(255,255,255,.85)',
          color: 'var(--muted-brown)',
          boxShadow: '0 6px 16px rgba(0,0,0,.06)',
          opacity: ready ? 1 : 0,
          transition: 'opacity 400ms ease',
        }}
      >
        {mutedUI ? (
          <HiMiniSpeakerXMark size={20} />
        ) : (
          <HiMiniSpeakerWave size={20} />
        )}
      </button>

      {/* 안내 툴팁 */}
      {showTip && mutedUI && (
        <div
          style={{
            position: 'absolute',
            right: '120%',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(145, 81, 81, 0.85)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            opacity: tipVisible ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          배경음악이 준비되었습니다 🎶
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '100%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '3px solid transparent',
              borderBottom: '3px solid transparent',
              borderLeft: '5px solid rgba(145, 81, 81, 0.85)',
            }}
          />
        </div>
      )}
    </div>
  )

  if (!floating) return Btn
  return <div style={{ position: 'absolute', top: 8, right: 8 }}>{Btn}</div>
}
