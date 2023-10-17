import {Alert} from "antd"
import {useTelegram} from "../hooks/use-telegram"
import {useCallback, useEffect} from "react"
import axios from "axios"

const instance = axios.create({
  baseURL: 'https://tg-web-app-backend.onrender.com',
  timeout: 3000,
  headers: {'Content-Type': 'application/json'},
})

export default function Restricted() {
  const {tg, user, onToggleMainButton, onClose, query_id} = useTelegram()

  const onSendData = useCallback(async () =>
      await instance.post('/web-data', {user, query_id}),
    [query_id, user])

  useEffect(() => {
    tg.MainButton.setText('Get access')
    tg.MainButton.show()
    tg.MainButton.onClick(async () => {
      await onSendData()
      onClose()
    })
  }, [tg.MainButton, onClose, onToggleMainButton, onSendData]);

  return (
    <Alert
      showIcon
      type='error'
      message={'Access denied'}
    />
  )
}