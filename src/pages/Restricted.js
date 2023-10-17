import {Alert} from "antd"
import {useTelegram} from "../hooks/use-telegram"
import {useCallback, useEffect} from "react"
import {instance} from "../api"

export default function Restricted() {
  const {tg, user, onClose, query_id} = useTelegram()

  const onSendData = useCallback(async () => {
      await instance.post('/web-data', {user, query_id})
      onClose()
    },
    [query_id, user, onClose])

  useEffect(() => {
    tg.MainButton.setText('Get access')
    tg.MainButton.show()
    tg.MainButton.onClick(onSendData)
  }, [tg.MainButton, onSendData])

  return (
    <Alert
      showIcon
      type='error'
      message={'Access denied'}
    />
  )
}