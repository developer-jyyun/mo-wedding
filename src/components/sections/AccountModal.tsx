import { useState } from 'react'
import Section from '@common/Section'
import { Wedding } from '@models/wedding'
import BottomSheet from '@common/BottomSheet'
import AccountItem from './AccountItem'
import { BiCopy } from 'react-icons/bi'
import kpayImg from '@/assets/icons/kakao_pay_icon.png'
import styles from './Account.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

interface Props {
  groom: Wedding['groom']
  bride: Wedding['bride']
}

const copyAccount = async (text?: string) => {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    alert('계좌번호가 복사되었습니다.')
  } catch {
    prompt('복사할 계좌번호', text)
  }
}

export default function AccountModal({ groom, bride }: Props) {
  const [open, setOpen] = useState(false)

  const actions = (bank?: string, num?: string, link?: string) => (
    <>
      {num && (
        <BiCopy onClick={() => copyAccount(num)} aria-label="계좌 복사" />
      )}
      <img
        src={kpayImg}
        alt="카카오페이 송금"
        onClick={() => {
          if (link) window.open(link, '_blank')
          else
            alert(
              `카카오페이 앱 > 송금 > 계좌로\n은행: ${bank ?? '-'} / 계좌: ${num ?? '-'}`,
            )
        }}
      />
    </>
  )

  return (
    <Section title="마음 전하실 곳">
      <p className={cx('desc')}>
        참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다. 너그러운 마음으로
        양해 부탁드립니다.
      </p>
      <button className={cx('openBtn')} onClick={() => setOpen(true)}>
        계좌 보기
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="계좌번호">
        {/* 신랑측 */}
        <div className={cx('groom')}>
          <h4>신랑측</h4>
          <div className={cx('group')}>
            <AccountItem
              bankName={groom.account?.bankName}
              accountNumber={groom.account?.accountNumber}
              roleText="신랑"
              name={groom.name}
              actions={actions(
                groom.account?.bankName,
                groom.account?.accountNumber,
                groom.account?.kakaopayLink,
              )}
            />
            {groom.parents.map((p, i) => (
              <AccountItem
                key={i}
                bankName={p.account?.bankName}
                accountNumber={p.account?.accountNumber}
                roleText={`신랑의 ${p.relation}`}
                name={p.name}
                actions={actions(
                  p.account?.bankName,
                  p.account?.accountNumber,
                  p.account?.kakaopayLink,
                )}
              />
            ))}
          </div>
        </div>
        {/* 신부측 */}
        <div className={cx('bride')} style={{ marginTop: '1rem' }}>
          <h4>신부측</h4>
          <div className={cx('group')}>
            <AccountItem
              bankName={bride.account?.bankName}
              accountNumber={bride.account?.accountNumber}
              roleText="신부"
              name={bride.name}
              actions={actions(
                bride.account?.bankName,
                bride.account?.accountNumber,
                bride.account?.kakaopayLink,
              )}
            />
            {bride.parents.map((p, i) => (
              <AccountItem
                key={i}
                bankName={p.account?.bankName}
                accountNumber={p.account?.accountNumber}
                roleText={`신부의 ${p.relation}`}
                name={p.name}
                actions={actions(
                  p.account?.bankName,
                  p.account?.accountNumber,
                  p.account?.kakaopayLink,
                )}
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </Section>
  )
}
