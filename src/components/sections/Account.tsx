import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import Section from '@common/Section'
import { Wedding } from '@models/wedding'
import Accordion from '@common/Accordion'
import AccountItem from './AccountItem'
import { BiCopy } from 'react-icons/bi'
import kpayImg from '@/assets/icons/kakao_pay_icon.png'

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

const normalizeLink = (s?: string) => {
  const v = (s ?? '').trim()
  return v.length ? v : undefined
}

const buildActions = (
  bankName?: string,
  accountNumber?: string,
  kakaopayLink?: string,
) => {
  const link = normalizeLink(kakaopayLink)

  const nameActions = link ? (
    <img
      src={kpayImg}
      alt="카카오페이 송금"
      onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
    />
  ) : null

  const accountActions = accountNumber ? (
    <BiCopy aria-label="계좌 복사" onClick={() => copyAccount(accountNumber)} />
  ) : null

  return { nameActions, accountActions }
}

export default function Account({ groom, bride }: Props) {
  return (
    <Section className={cx('container')} title="마음 전하실 곳">
      <p className={cx('desc')}>
        멀리서도 축하의 마음을
        <br /> 전하고 싶으신 분들을 위해 <br /> 계좌번호를 안내드립니다. <br />
        <br /> 소중한 축하를 보내주셔서 감사드리며,
        <br /> 따뜻한 마음에 깊이 감사드립니다.
      </p>

      {/* 신랑측 */}
      <div className={cx('groom')}>
        <Accordion label="신랑측 계좌번호" variant="account" defaultOpen>
          <div className={cx('group')}>
            {(() => {
              const a = buildActions(
                groom.account?.bankName,
                groom.account?.accountNumber,
                groom.account?.kakaopayLink,
              )
              return (
                <AccountItem
                  bankName={groom.account?.bankName}
                  accountNumber={groom.account?.accountNumber}
                  roleText="신랑"
                  name={groom.name}
                  nameActions={a.nameActions}
                  accountActions={a.accountActions}
                />
              )
            })()}

            {groom.parents.map((p, idx) => {
              const a = buildActions(
                p.account?.bankName,
                p.account?.accountNumber,
                p.account?.kakaopayLink,
              )
              return (
                <AccountItem
                  key={idx}
                  bankName={p.account?.bankName}
                  accountNumber={p.account?.accountNumber}
                  roleText={`신랑의 ${p.relation}`}
                  name={p.name}
                  nameActions={a.nameActions}
                  accountActions={a.accountActions}
                />
              )
            })}
          </div>
        </Accordion>
      </div>

      {/* 신부측 */}
      <div className={cx('bride')}>
        <Accordion label="신부측 계좌번호" variant="account" defaultOpen>
          <div className={cx('group')}>
            {(() => {
              const a = buildActions(
                bride.account?.bankName,
                bride.account?.accountNumber,
                bride.account?.kakaopayLink,
              )
              return (
                <AccountItem
                  bankName={bride.account?.bankName}
                  accountNumber={bride.account?.accountNumber}
                  roleText="신부"
                  name={bride.name}
                  nameActions={a.nameActions}
                  accountActions={a.accountActions}
                />
              )
            })()}

            {bride.parents.map((p, idx) => {
              const a = buildActions(
                p.account?.bankName,
                p.account?.accountNumber,
                p.account?.kakaopayLink,
              )
              return (
                <AccountItem
                  key={idx}
                  bankName={p.account?.bankName}
                  accountNumber={p.account?.accountNumber}
                  roleText={`신부의 ${p.relation}`}
                  name={p.name}
                  nameActions={a.nameActions}
                  accountActions={a.accountActions}
                />
              )
            })}
          </div>
        </Accordion>
      </div>
    </Section>
  )
}
