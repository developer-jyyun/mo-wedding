import { RiKakaoTalkFill, RiShareFill } from 'react-icons/ri'
import { useMemo } from 'react'
import Button from '../common/Button'

type ShareProps = {
  title?: string
  description?: string
  imageUrl?: string
  shareUrl?: string
}

export default function ShareActions({
  title,
  description,
  imageUrl = '/assets/og.webp',
  shareUrl,
}: ShareProps) {
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

  return (
    <div>
      <Button
        size="lg"
        shape="rect"
        icon={<RiKakaoTalkFill size={20} />}
        style={{ marginBottom: '1rem', background: 'rgba(255,255,255,.4)' }}
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
