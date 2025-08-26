import classNames from 'classnames/bind'
import commonStyles from './PersonItem.module.scss' // 공통(레이아웃 최소)
import ContactItem from '@/components/sections/ContactItem'
import { Person } from '@models/wedding'

const cx = classNames.bind(commonStyles)

interface PersonGroupProps {
  side: 'groom' | 'bride'
  role: { type: string; main: string; sub?: string }
  name: string
  parents: Person[]
  selfActions?: JSX.Element[]
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
    <div className={cx('person-group', side)}>
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
