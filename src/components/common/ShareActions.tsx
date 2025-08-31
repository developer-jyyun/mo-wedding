import { RiKakaoTalkFill, RiShareFill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import Button from '../common/Button'

type ShareProps = {
  title?: string
  description?: string
  imageUrl?: string
  shareUrl?: string
}

/** Kakao Share SDK 로더 */
function useKakao(appKey?: string) {
  useEffect(() => {
    if (!appKey) return
    if (window.Kakao?.isInitialized?.()) return

    const s = document.createElement('script')
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    s.async = true
    s.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey)
      }
    }
    document.head.appendChild(s)
  }, [appKey])
}

export default function ShareActions({
  title,
  description,
  imageUrl = '/assets/og.jpg',
  shareUrl,
}: ShareProps) {
  const kakaoKey =
    process.env.REACT_APP_KAKAO_JS_KEY ?? process.env.REACT_APP_KAKAO_KEY
  useKakao(kakaoKey)

  const [link, setLink] = useState('')
  const [shareTitle, setShareTitle] = useState('')
  const [shareDesc, setShareDesc] = useState('소중한 날에 초대합니다.')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLink(shareUrl ?? window.location.href)
      setShareTitle(title ?? document.title)
      setShareDesc(description ?? '소중한 날에 초대합니다.')
    }
  }, [shareUrl, title, description])

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

  return (
    <div>
      <Button
        size="lg"
        shape="rect"
        icon={<RiKakaoTalkFill size={20} />}
        style={{ marginBottom: '1rem', background: 'rgba(255, 238, 0, .1);)' }}
        onClick={onShareKakao}
      >
        카카오로 공유하기
      </Button>

      <Button
        size="lg"
        shape="rect"
        icon={<RiShareFill size={20} />}
        style={{ backgroundColor: 'rgba(255,255,255,.4)' }}
        onClick={onShareWeb}
      >
        링크 복사 / 공유
      </Button>
    </div>
  )
}
