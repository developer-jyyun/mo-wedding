// src/components/common/PersonGroup.tsx
import classNames from 'classnames/bind'
import styles from './PersonItem.module.scss' // ✅ 그대로 유지
import ContactItem from './ContactItem' // ✅ 교체 포인트
import { Person } from '@models/wedding'

const cx = classNames.bind(styles)

interface PersonGroupProps {
  side: 'groom' | 'bride'
  role: { type: string; main: string; sub?: string }
  name: string
  parents: Person[]
  /** 본인(신랑/신부) 아이콘 */
  selfActions?: JSX.Element[]
  /** 부모 아이콘 빌더 */
  actions: (person: Person) => JSX.Element[]
}

export default function PersonGroup({
  side,
  role,
  name,
  parents,
  selfActions,
  actions,
}: PersonGroupProps) {
  const sideLabel = side === 'groom' ? '신랑' : '신부'

  return (
    <div className={cx('person-group')}>
      {/* 본인 */}
      <ContactItem role={role} name={name} actions={selfActions} />

      {/* 부모 */}
      {parents.map((parent, idx) => (
        <ContactItem
          key={idx}
          role={{
            type: 'parent',
            main: `${sideLabel}의 ${parent.relation}`,
            sub: '',
          }}
          name={parent.name}
          actions={actions(parent)}
        />
      ))}
    </div>
  )
}
