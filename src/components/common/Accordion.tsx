import styles from './Accordion.module.scss'
import classNames from 'classnames/bind'
import { PropsWithChildren, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
  variant?: 'contact' | 'account'
}

export default function Accordion({
  label,
  children,
  variant,
}: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }
  return (
    <div
      className={cx([
        'wrap-accoridon',
        expanded ? 'open' : '',
        variant ? `accordion-${variant}` : '',
      ])}
    >
      <div className={cx('wrap-header')} onClick={handleToggle}>
        <span>{label}</span>
        <IoIosArrowDown className={cx('ico-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}
