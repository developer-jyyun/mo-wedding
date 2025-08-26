import React, { useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './FallingFX.module.scss'

const cx = classNames.bind(styles)

type Mode = 'petal' | 'snow'

interface FallingFXProps {
  mode?: Mode
  /** 기본 0.6 → 0.9~1.2 정도면 '조금 더 풍성' */
  density?: number
  zIndex?: number
  /** px/s 수준의 평균 바람 세기 */
  wind?: number
  /** 전체 속도 배수 */
  speed?: number
  paused?: boolean
  /** 원근 레이어 개수 (1~3) */
  layers?: 1 | 2 | 3
  /** 초반에 살짝 더 떨어지는 느낌 */
  burst?: boolean
  /** FPS 상한 (배터리 보호) */
  maxFps?: number
  className?: string
}

export default function FallingFX({
  mode = 'petal',
  density = 0.6,
  zIndex = 1,
  wind = 8,
  speed = 1,
  paused = false,
  layers = 2,
  burst = true,
  maxFps = 60,
  className,
}: FallingFXProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const lastDrawRef = useRef<number>(0)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement ?? document.body
    let w = parent.clientWidth
    let h = parent.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setSize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      const ctx2 = canvas.getContext('2d')
      if (ctx2) ctx2.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ---------- 파티클 세팅 ----------
    // 기준 해상도 대비 개수 (1200x800에서 density=1, layers=1 => 약 42개)
    const baseCount = 42
    const areaScale = (w * h) / (1200 * 800)
    const totalCount = Math.max(
      8,
      Math.floor(baseCount * areaScale * Math.max(0.2, density) * layers),
    )

    type P = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rot: number
      rotSp: number
      alpha: number
      sway: number
      depth: number // 0(먼)~1(가까움)
    }

    const rnd = (a: number, b: number) => Math.random() * (b - a) + a
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const spawn = (yInit = rnd(-h * 0.6, 0)): P => {
      // depth는 레이어에 따라 랜덤 분포
      const layerIdx = Math.floor(Math.random() * layers) // 0..layers-1
      const depth = layers === 1 ? 1 : (layerIdx + rnd(0.0, 1.0)) / layers
      const near = Math.pow(depth, 0.9) // 가까울수록 1에 가까움

      const sizeBase = mode === 'snow' ? rnd(1.6, 3.2) : rnd(7, 12.5) // 기본 크기
      const size = sizeBase * lerp(0.55, 1, near)

      const vyBase = mode === 'snow' ? rnd(18, 34) : rnd(28, 56) // 낙하 속도
      const vy = vyBase * lerp(0.6, 1, near)

      return {
        x: rnd(0, w),
        y: yInit,
        vx: (wind + rnd(-6, 6)) * 0.05,
        vy,
        size,
        rot: rnd(0, Math.PI * 2),
        rotSp: (mode === 'snow' ? rnd(-0.4, 0.4) : rnd(-1.2, 1.2)) * near,
        alpha:
          (mode === 'snow' ? rnd(0.6, 0.95) : rnd(0.72, 0.95)) *
          lerp(0.6, 1, near),
        sway: lerp(mode === 'snow' ? 10 : 16, mode === 'snow' ? 20 : 34, near),
        depth: near,
      }
    }

    const particles: P[] = Array.from({ length: totalCount }, () =>
      spawn(rnd(0, h)),
    )

    // 초반에 더 풍성하게 느끼도록 위쪽에 추가 스폰
    if (burst) {
      const extra = Math.floor(totalCount * 0.35)
      for (let i = 0; i < extra; i++) particles.push(spawn(rnd(-h, 0)))
    }

    const drawSnow = (p: P) => {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(255,255,255,.9)'
      ctx.shadowBlur = 2
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const drawPetal = (p: P) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      const s = p.size
      const grd = ctx.createLinearGradient(0, -s, 0, s)
      grd.addColorStop(0, 'rgba(255,182,193,0.95)') // 상단
      grd.addColorStop(1, 'rgba(255,192,203,0.75)') // 하단
      ctx.fillStyle = grd
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.quadraticCurveTo(s * 0.8, -s * 0.2, 0, s * 0.9)
      ctx.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s)
      ctx.closePath()
      ctx.shadowColor = 'rgba(255,192,203,.4)'
      ctx.shadowBlur = 5 * p.depth
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      ctx.restore()
    }

    // 바람에 약간의 돌풍(gust)
    let t0 = performance.now()
    const fpsInterval = 1000 / Math.min(60, Math.max(24, maxFps))

    const step = (now: number) => {
      // FPS 제한
      if (now - lastDrawRef.current < fpsInterval) {
        rafRef.current = requestAnimationFrame(step)
        return
      }
      const dt = Math.max(0.016, Math.min(0.05, (now - t0) / 1000)) * speed
      t0 = now
      lastDrawRef.current = now

      ctx.clearRect(0, 0, w, h)

      // 바람의 미세한 파동
      const gust = Math.sin(now / 1300) * 0.6 + Math.sin(now / 2100) * 0.4
      const windX = (wind + gust * 6) * 0.05

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx + windX + Math.sin(now / 1000 + i) * (p.sway * 0.02)
        p.y += p.vy * dt
        p.rot += p.rotSp * dt

        // 화면 밖으로 나가면 재스폰
        if (p.y > h + 24) {
          particles[i] = spawn(rnd(-h * 0.4, -20))
          continue
        }
        if (p.x < -24) p.x = w + 24
        if (p.x > w + 24) p.x = -24

        mode === 'snow' ? drawSnow(p) : drawPetal(p)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    // 가시 영역에서만 작동
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry?.isIntersecting &&
          !paused &&
          !reduceMotion &&
          document.visibilityState === 'visible'
        if (visible) {
          if (!rafRef.current) {
            t0 = performance.now()
            lastDrawRef.current = 0
            rafRef.current = requestAnimationFrame(step)
          }
        } else {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = undefined
          }
        }
      },
      { threshold: 0.01 },
    )
    io.observe(parent)

    // 리사이즈 대응
    const ro = new ResizeObserver(() => setSize())
    ro.observe(parent)

    const onVis = () => {
      if (document.visibilityState !== 'visible' && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mode, density, wind, speed, paused, layers, burst, maxFps, reduceMotion])

  return (
    <div
      className={cx('layer', className)}
      style={{ ['--fx-z' as any]: zIndex }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
