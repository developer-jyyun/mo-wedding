// 숫자/플러스만 남김
export const sanitizePhone = (n: string | number) =>
  String(n).replace(/[^0-9+]/g, '')

// 01012345678 -> 010-1234-5678 / 지역번호 형태도 대응
export const formatPhone = (n: string | number) => {
  const s = String(n).replace(/[^0-9]/g, '')
  if (s.length === 11) return s.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  if (s.length === 10) return s.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3')
  return s
}

export const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)
export const isMobile = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
