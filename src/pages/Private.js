import {Card, Avatar, Space} from "antd"
import {useEffect, useState} from "react"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons"
import {useTelegram} from "../hooks/use-telegram"
import {gtInstance} from "../api"

const {Meta} = Card

export default function Private() {
  const [users, setUsers] = useState([])
  const {tg, user, onClose} = useTelegram()

  useEffect(() => {
    tg.MainButton.setText('Close app')
    tg.MainButton.show()
    tg.MainButton.onClick(onClose)
  }, [tg.MainButton, onClose])

  useEffect(() => {
    user?.id && gtInstance.get(`/admins/users/${user?.id}`)
      .then(response => {
        const {data} = response.data
        setUsers(data)
      })

    !user?.id && gtInstance.get(`/admins/users/6185598498`)
      .then(response => {
        const {data} = response.data
        setUsers(data)
      })
  }, [user])

  return (
    <Space direction='vertical'>
      {users.map(user => {
        const {_id: id, name, email, avatarURL} = user

        return (
          <Card
            key={id}
            title={name}
            actions={[
              <SettingOutlined key="setting"/>,
              <EditOutlined key="edit"/>,
              <EllipsisOutlined key="ellipsis"/>,
            ]}
          >
            <Meta
              avatar={<Avatar src={avatarURL}/>}
              title={name}
              description={email}
            />
          </Card>
        )
      })}
    </Space>

  )
}