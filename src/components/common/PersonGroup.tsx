import styles from './PersonItem.module.scss'
import classNames from 'classnames/bind'
import PersonItem from './PersonItem'

const cx = classNames.bind(styles)

interface PersonGroupProps {
  side: 'groom' | 'bride'
  role: { type: string; main: string; sub?: string }
  name: string
  parents: {
    name: string
    relation: string
    phoneNumber?: number
    accountNumber?: string
  }[]
  /** 본인(신랑/신부) 아이콘 */
  selfActions?: JSX.Element[]
  /** 부모 아이콘 빌더 */
  actions: (person: {
    name: string
    phoneNumber?: number
    accountNumber?: string
  }) => JSX.Element[]
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
      <PersonItem role={role} name={name} actions={selfActions} />

      {/* 부모 */}
      {parents.map((parent, idx) => (
        <PersonItem
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
