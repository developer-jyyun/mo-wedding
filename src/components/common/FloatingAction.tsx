import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { RiKakaoTalkFill, RiShareFill } from 'react-icons/ri' // ✅ 아이콘 교체
import styles from './FloatingAction.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

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

/** Kakao Share SDK 로더 (한 번만 선언) */
function useKakao(appKey?: string) {
  useEffect(() => {
    if (!appKey) {
      console.warn('Kakao JS key missing. Skip Kakao SDK.')
      return
    }
    if (window.Kakao?.isInitialized?.()) return

    const s = document.createElement('script')
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    s.async = true
    s.onload = () => window.Kakao?.init(appKey)
    s.onerror = () => console.error('Failed to load Kakao Share SDK')
    document.head.appendChild(s)

    return () => {}
  }, [appKey])
}

export default function FloatingActions({
  title,
  description,
  imageUrl = '/assets/og.jpg',
  shareUrl,
}: ShareProps) {
  const kakaoKey =
    process.env.REACT_APP_KAKAO_JS_KEY ?? process.env.REACT_APP_KAKAO_KEY
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
    if (!window.Kakao?.isInitialized?.()) {
      alert('공유 준비 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDesc,
          imageUrl: new URL(imageUrl, window.location.origin).href,
          link: { mobileWebUrl: link, webUrl: link },
        },
        buttons: [
          {
            title: '모바일로 보기',
            link: { mobileWebUrl: link, webUrl: link },
          },
        ],
      })
    } catch (e) {
      console.error('Kakao Share failed', e)
      alert('카카오 공유를 실행할 수 없어요.')
    }
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
    <div className={cx('floatingActions')}>
      {/* 카카오톡 */}
      <button
        type="button"
        onClick={onShareKakao}
        aria-label="카카오톡으로 공유"
        title="카카오톡으로 공유"
        className={cx('btn')}
      >
        <RiKakaoTalkFill size={18} />
      </button>

      {/* 공유 (Web Share / 복사) */}
      <button
        type="button"
        onClick={onShareWeb}
        aria-label="공유/링크 복사"
        title="공유/링크 복사"
        className={cx('btn')}
      >
        <RiShareFill size={18} />
      </button>

      {/* Top 버튼 */}
      {showTop && (
        <button
          type="button"
          onClick={goTop}
          aria-label="맨 위로"
          title="맨 위로"
          className={cx('btn')}
        >
          <IoIosArrowUp size={20} />
        </button>
      )}
    </div>
  )
}
