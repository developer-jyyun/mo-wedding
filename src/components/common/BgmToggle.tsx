import { useEffect, useRef, useState } from 'react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'

declare global {
  interface Window {
    __bgmAudio?: HTMLAudioElement
  }
}

type Props = {
  src?: string
  floating?: boolean
  initiallyOn?: boolean
  initialVolume?: number
  rememberMuted?: boolean
}

export default function BgmToggle({
  src = '/assets/audio/bgm.mp3',
  floating = true,
  initiallyOn = true,
  initialVolume = 0.24,
  rememberMuted = true,
}: Props) {
  // 원하는(저장된) 음소거 상태를 먼저 계산해서 ref/state에 넣는다.
  const initialDesiredMuted: boolean = (() => {
    if (!rememberMuted) return !initiallyOn
    const saved = localStorage.getItem('bgm-muted')
    return saved == null ? !initiallyOn : saved === 'true'
  })()

  const desiredMutedRef = useRef<boolean>(initialDesiredMuted)
  const [mutedUI, setMutedUI] = useState<boolean>(initialDesiredMuted)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 전역 싱글톤 오디오 확보
    let audio = window.__bgmAudio
    if (!audio) {
      audio = window.__bgmAudio = new Audio()
      audio.loop = true
      audio.preload = 'auto'
      audio.style.display = 'none'
      document.body.appendChild(audio)
    }

    // src 세팅(같으면 건드리지 않음)
    const abs = new URL(src, window.location.href).href
    if (audio.src !== abs) audio.src = abs

    // 부트: 항상 muted로 먼저 재생해서 버퍼링 선행
    audio.volume = Math.max(0, Math.min(1, initialVolume))
    audio.muted = true

    const start = async () => {
      try {
        await audio!.play()
      } catch {
        /* iOS 정책: 무음 재생만 허용일 수 있음 */
      }
      setReady(true)
    }
    start()

    // 첫 사용자 제스처에서 원하는 상태로 즉시 전환
    const unlock = () => {
      const a = window.__bgmAudio
      if (!a) return
      a.muted = desiredMutedRef.current
      if (!a.muted && a.paused) a.play().catch(() => {})
      setMutedUI(desiredMutedRef.current)
      window.removeEventListener('pointerdown', unlock)
    }
    window.addEventListener('pointerdown', unlock, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      // 싱글톤은 유지(언마운트 시 제거하지 않음)
    }
  }, [src, initialVolume, initiallyOn, rememberMuted])

  // 토글
  const toggle = () => {
    desiredMutedRef.current = !desiredMutedRef.current
    const a = window.__bgmAudio
    if (a) {
      a.muted = desiredMutedRef.current
      if (!a.muted && a.paused) a.play().catch(() => {})
    }
    if (rememberMuted)
      localStorage.setItem('bgm-muted', String(desiredMutedRef.current))
    setMutedUI(desiredMutedRef.current)
  }

  const Btn = (
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
  )

  if (!floating) return Btn
  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 8px) + 8px)',
        right: 'calc(env(safe-area-inset-right, 8px) + 8px)',
        zIndex: 10000,
      }}
    >
      {Btn}
    </div>
  )
}
