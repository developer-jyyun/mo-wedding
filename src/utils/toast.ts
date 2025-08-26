import styles from './Toast.module.scss'

type ToastOptions = {
  position?: 'top' | 'middle' | 'bottom'
  duration?: number
  accent?: string
  maxWidth?: number
}

let container: HTMLDivElement | null = null

const ensure = () => {
  if (!container) {
    container = document.createElement('div')
    container.className = styles.container
    document.body.appendChild(container)
  }
}

export const toast = (msg: string, opts: ToastOptions = {}) => {
  ensure()

  const { position = 'middle', duration = 2200, accent, maxWidth = 480 } = opts

  const el = document.createElement('div')
  el.className = [
    styles.toast,
    styles[position], // top | middle | bottom
  ].join(' ')
  el.style.maxWidth = `${maxWidth}px`

  // Safe area 보정 (bottom/top에 여백 더 추가)
  const root = getComputedStyle(document.documentElement)
  const safeTop =
    Number(root.getPropertyValue('--safe-area-inset-top').replace('px', '')) ||
    0
  const safeBottom =
    Number(
      root.getPropertyValue('--safe-area-inset-bottom').replace('px', ''),
    ) || 0
  if (position === 'top') el.style.top = `${16 + safeTop}px`
  if (position === 'bottom')
    el.style.bottom = `${24 + Math.max(safeBottom, 24)}px`

  // 포인트 색상
  if (accent) el.style.setProperty('--accent', accent)

  // 내용
  const text = document.createElement('span')
  text.textContent = msg
  el.appendChild(text)

  text.className = styles.text
  text.textContent = msg

  container!.appendChild(el)

  // 등장
  requestAnimationFrame(() => el.classList.add(styles.show))

  // 자동 제거
  const remove = () => {
    el.classList.remove(styles.show)
    setTimeout(() => el.remove(), 200)
  }
  const t = setTimeout(remove, duration)

  // 클릭 시 즉시 닫기
  el.addEventListener('click', () => {
    clearTimeout(t)
    remove()
  })
}
