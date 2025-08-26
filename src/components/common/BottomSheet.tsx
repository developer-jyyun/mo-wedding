import { ReactNode, useEffect } from 'react'
import './BottomSheet.css'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function BottomSheet({ open, onClose, title, children }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null
  return (
    <div
      className="bs-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="bs-panel" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="bs-header">
            <strong>{title}</strong>
            <button className="bs-close" onClick={onClose} aria-label="닫기">
              ×
            </button>
          </div>
        )}
        <div className="bs-body">{children}</div>
      </div>
    </div>
  )
}
