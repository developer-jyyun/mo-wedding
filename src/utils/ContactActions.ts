import { sanitizePhone, formatPhone, isIOS, isMobile } from './phone'
import { toast } from './toast'

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const handleCall = async (phone: number | string) => {
  const raw = sanitizePhone(phone)
  const pretty = formatPhone(raw)

  if (!isMobile()) {
    const ok = await copy(pretty)
    toast(
      ok
        ? `📞 ${pretty} 번호 복사됨\n모바일에서 전화 앱이 실행됩니다.`
        : `📞 모바일에서 전화 앱이 실행됩니다: ${pretty}`,
      { position: 'middle' },
    )
    return
  }

  toast(`📞 전화 연결\n ${pretty}`, { position: 'middle' })
  window.location.href = `tel:${raw}`
}

export const handleMessage = async (phone: number | string, bodyText = '') => {
  const raw = sanitizePhone(phone)
  const pretty = formatPhone(raw)

  if (!isMobile()) {
    const ok = await copy(pretty)
    toast(
      ok
        ? `💬  ${pretty} 번호 복사됨\n모바일에서 문자 작성 화면이 열립니다.`
        : `💬 모바일에서 문자 작성 화면이 열립니다: ${pretty}`,
      { position: 'middle' },
    )
    return
  }

  const body = encodeURIComponent(bodyText)
  const href = isIOS()
    ? bodyText
      ? `sms:${raw}&body=${body}`
      : `sms:${raw}`
    : bodyText
      ? `sms:${raw}?body=${body}`
      : `sms:${raw}`

  toast(`💬 문자 작성\n ${pretty}`, { position: 'middle' })
  window.location.href = href
}
