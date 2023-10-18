import './App.css'
import {ConfigProvider, Spin} from 'antd'
import Restricted from './pages/Restricted'
import {themeAlgorithm} from './services/theme-service'
import {useEffect, useState} from "react"
import {useTelegram} from "./hooks/use-telegram"
import Private from "./pages/Private"
import {gtInstance} from "./api"
import {isAccessDenied} from "./helpers"

function GlobalWrapper({children}) {
  return (
    <div className='App'>
      {children}
    </div>
  )
}

export default function App() {
  const [isInFly, setIsInFly] = useState(true)
  // TODO: set false on prod
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {tg, initData, colorScheme, user} = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [tg])

  useEffect(() => {
    gtInstance.get('/admins')
      .then(response => {
        const {data} = response.data

        if (isAccessDenied(user?.id, data)) {
          return false
        }

        setIsLoggedIn(true)
      })
      .finally(() => setIsInFly(false))
  }, [setIsInFly, user])

  if (!initData) {
    // window.location.href = 'https://t.me/reactbotappbot'
  }

  return (
    <ConfigProvider theme={themeAlgorithm(colorScheme)}>
      <GlobalWrapper>
        {isInFly && <Spin/>}
        {!isInFly && !isLoggedIn && <Restricted/>}
        {!isInFly && isLoggedIn && <Private/>}
      </GlobalWrapper>
    </ConfigProvider>
  )
}
