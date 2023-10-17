import './App.css'
import {ConfigProvider} from 'antd'
import Restricted from './pages/Restricted'
import {themeAlgorithm} from './services/theme-service'
import {useEffect} from "react"
import {useTelegram} from "./hooks/use-telegram";

function GlobalWrapper({children}) {
  return (
    <div className='App'>
      {children}
    </div>
  )
}

export default function App() {
  const {tg, initData, colorScheme} = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [tg])

  if (!initData) {
    // window.location.href = 'https://t.me/reactbotappbot'
  }

  return (
    <ConfigProvider theme={themeAlgorithm(colorScheme)}>
      <GlobalWrapper>
        <Restricted/>
      </GlobalWrapper>
    </ConfigProvider>
  )
}
