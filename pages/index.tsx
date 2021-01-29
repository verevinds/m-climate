import { useDispatch } from 'react-redux'

import Clock from 'src/components/clock'
import { tick } from 'src/redux/reducer/clockSlice'
import useInterval from 'src/lib/useInterval'

const IndexPage = () => {
  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: Date.now() }))
  }, 1000)

  return (
    <>
      <Clock />
    </>
  )
}

export default IndexPage