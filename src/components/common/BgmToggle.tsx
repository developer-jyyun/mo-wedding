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
  startAt?: number // 시작 무음 스킵용(초)
  fadeMs?: number // 언뮤트 시 페이드인(ms)
}

export default function BgmToggle({
  src = '/assets/audio/bgm.mp3',
  floating = true,
  initiallyOn = true,
  initialVolume = 0.24,
  rememberMuted = true,
  startAt = 0,
  fadeMs = 180,
}: Props) {
  const initialDesiredMuted: boolean = (() => {
    if (!rememberMuted) return !initiallyOn
    const saved = localStorage.getItem('bgm-muted')
    return saved == null ? !initiallyOn : saved === 'true'
  })()

  const desiredMutedRef = useRef<boolean>(initialDesiredMuted)
  const [mutedUI, setMutedUI] = useState<boolean>(initialDesiredMuted)
  const [ready, setReady] = useState(false)

  const ensurePreload = (url: string) => {
    const id = '__bgm_preload__'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'preload'
    link.as = 'audio'
    link.href = url
    document.head.appendChild(link)
  }

  useEffect(() => {
    const abs = new URL(src, window.location.href).href
    ensurePreload(abs)

    // 전역 싱글톤 확보
    let audio = window.__bgmAudio
    if (!audio) {
      audio = window.__bgmAudio = new Audio()
      audio.loop = true
      audio.preload = 'auto'
      audio.style.display = 'none'
      document.body.appendChild(audio)
    }

    // 소스 지정
    if (audio.src !== abs) audio.src = abs

    // 항상 무음으로 먼저 재생(버퍼링 선행)
    audio.volume = Math.max(0, Math.min(1, initialVolume))
    audio.muted = true
    audio.load()

    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplaythrough', onCanPlay, { once: true })
    audio.play().catch(() => {}) // iOS에서도 무음재생은 허용

    // 첫 사용자 제스처에서 즉시 들리게
    const unlock = () => {
      const a = window.__bgmAudio!
      if (startAt > 0 && a.currentTime < startAt - 0.05) {
        try {
          a.currentTime = startAt
        } catch {}
      }
      if (desiredMutedRef.current) {
        a.muted = true
        setMutedUI(true)
      } else {
        a.muted = false
        a.play().catch(() => {})
        if (fadeMs > 0) {
          const target = initialVolume
          const start = performance.now()
          a.volume = 0
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / fadeMs)
            a.volume = target * k
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        } else {
          a.volume = initialVolume
        }
        setMutedUI(false)
      }
      window.removeEventListener('pointerdown', unlock)
    }
    window.addEventListener('pointerdown', unlock, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      // ← 여기만 수정: 전역 싱글톤에 안전하게 접근
      window.__bgmAudio?.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [src, initialVolume, initiallyOn, rememberMuted, startAt, fadeMs])

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
