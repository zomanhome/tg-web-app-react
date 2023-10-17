import {Alert} from "antd"
import {useTelegram} from "../hooks/use-telegram"
import {useCallback, useEffect} from "react"

export default function Restricted() {
  const {tg, user, onToggleMainButton, onClose, query_id} = useTelegram()

  const onSendData = useCallback(async () => {
    const data = {user, query_id}

    await fetch('https://tg-web-app-backend.onrender.com/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }, [user, query_id])

  useEffect(() => {
    tg.MainButton.setText('Get access')
    tg.MainButton.onClick(() => {
      onSendData().then(() => {
        onClose()
      })
    })
    onToggleMainButton()
  }, [tg.MainButton, onClose, onSendData, onToggleMainButton]);

  return (
    <Alert
      showIcon
      type='error'
      message='Access denied'
    />

  )
}