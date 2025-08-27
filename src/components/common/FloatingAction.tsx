import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { SiKakaotalk } from 'react-icons/si'

declare global {
  interface Window {
    Kakao?: any
  }
}

type ShareProps = {
  title?: string
  description?: string
  imageUrl?: string
  shareUrl?: string
}

function useKakao(appKey?: string) {
  useEffect(() => {
    if (!appKey) return
    if (window.Kakao && window.Kakao.isInitialized?.()) return
    const s = document.createElement('script')
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    s.async = true
    s.onload = () => window.Kakao?.init(appKey)
    document.head.appendChild(s)
    return () => {
      /* keep sdk */
    }
  }, [appKey])
}

export default function FloatingActions({
  title,
  description,
  imageUrl = '/assets/og.jpg',
  shareUrl,
}: ShareProps) {
  const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY
  useKakao(kakaoKey)

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = useMemo(() => shareUrl ?? window.location.href, [shareUrl])
  const shareTitle = title ?? document.title
  const shareDesc = description ?? '소중한 날에 초대합니다.'

  const onShareKakao = () => {
    if (!window.Kakao?.isInitialized?.())
      return alert('공유 준비 중입니다. 잠시 후 다시 시도해주세요.')
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDesc,
        imageUrl: new URL(imageUrl, window.location.origin).href,
        link: { mobileWebUrl: link, webUrl: link },
      },
      buttons: [
        { title: '모바일로 보기', link: { mobileWebUrl: link, webUrl: link } },
      ],
    })
  }

  const onShareWeb = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareDesc, url: link })
      } else {
        await navigator.clipboard.writeText(link)
        alert('링크가 복사되었어요.')
      }
    } catch {}
  }

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div
      style={{
        position: 'fixed',
        right: '12px',
        bottom: 'calc(env(safe-area-inset-bottom, 8px) + 12px)',
        display: 'flex',
        gap: 8,
        zIndex: 10000,
      }}
    >
      {/* 카카오톡 */}
      <button
        type="button"
        onClick={onShareKakao}
        aria-label="카카오톡으로 공유"
        title="카카오톡으로 공유"
        style={btnStyle}
      >
        <SiKakaotalk size={18} />
      </button>

      {/* 브라우저 공유/복사(보조) */}
      <button
        type="button"
        onClick={onShareWeb}
        aria-label="공유/링크 복사"
        title="공유/링크 복사"
        style={btnStyle}
      >
        <span style={{ fontSize: 12, fontWeight: 700 }}>Share</span>
      </button>

      {/* Top 버튼 */}
      {showTop && (
        <button
          type="button"
          onClick={goTop}
          aria-label="맨 위로"
          title="맨 위로"
          style={btnStyle}
        >
          <IoIosArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 999,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--light-gray)',
  background: 'rgba(255,255,255,.9)',
  color: 'var(--muted-brown)',
  boxShadow: '0 6px 16px rgba(0,0,0,.08)',
}
