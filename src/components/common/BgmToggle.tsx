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
  const [mutedUI, setMutedUI] = useState(true) // 항상 음소거 아이콘으로 시작
  const [ready, setReady] = useState(false)
  const [showTip, setShowTip] = useState(true)

  useEffect(() => {
    const abs = new URL(src, window.location.href).href
    let audio = window.__bgmAudio

    if (!audio) {
      audio = window.__bgmAudio = new Audio()
      audio.loop = true
      audio.preload = 'auto'
      document.body.appendChild(audio)
      console.log('[BGM] 새 오디오 생성됨')
    }

    if (audio.src !== abs) {
      audio.src = abs
      console.log('[BGM] 오디오 소스 설정됨:', abs)
    }

    audio.volume = initialVolume
    audio.pause() // 초기는 무조건 정지
    audio.load()
    console.log('[BGM] 초기 상태: paused?', audio.paused)

    const onCanPlay = () => {
      console.log('[BGM] 오디오 로드 완료 (canplaythrough)')
      setReady(true)
    }
    audio.addEventListener('canplaythrough', onCanPlay, { once: true })

    return () => {
      audio?.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [src, initialVolume])

  const toggle = () => {
    const a = window.__bgmAudio
    if (!a) return

    console.log('[BGM] 버튼 클릭됨, paused?', a.paused, 'mutedUI?', mutedUI)

    if (a.paused) {
      // 재생
      a.currentTime = 0
      a.volume = initialVolume
      a.play()
        .then(() => console.log('[BGM] 재생 성공'))
        .catch((err) => console.error('[BGM] 재생 실패', err))
      setMutedUI(false)
    } else {
      // 정지
      a.pause()
      console.log('[BGM] 정지됨')
      setMutedUI(true)
    }
  }

  const Btn = (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: '1' }}>
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
          transition: 'opacity 360ms ease',
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
            background: 'rgba(145, 81, 81, 0.5)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            opacity: 1,
            animation: 'fadeout 1s ease 4s forwards',
          }}
          onAnimationEnd={() => setShowTip(false)}
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
              borderLeft: '5px solid rgba(145, 81, 81, 0.5)',
            }}
          />
        </div>
      )}
      <style>
        {`
        @keyframes fadeout {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        `}
      </style>
    </div>
  )

  if (!floating) return Btn
  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
      }}
    >
      {Btn}
    </div>
  )
}
