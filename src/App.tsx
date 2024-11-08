import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import FullScreenMessage from './components/common/FullScreenMessage'

const cx = classNames.bind(styles)
function App() {
  const [wedding, setWedding] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못함')
        }
        return response.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error('Error:', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <FullScreenMessage type="loading" />
  }
  if (error) {
    return (
      <FullScreenMessage
        type="error"
        text="에러가 발생했어요! 잠시 후 다시 시도해주세요."
      />
    )
  }
  return (
    <div className={cx('container')}>
      <FullScreenMessage type="loading" />
      {/* {JSON.stringify(wedding)}{' '} */}
    </div>
  )
}

export default App
