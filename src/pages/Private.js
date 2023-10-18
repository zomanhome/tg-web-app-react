import {Card, Avatar, Space, Spin} from "antd"
import {useEffect, useState} from "react"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons"
import {useTelegram} from "../hooks/use-telegram"
import {gtInstance} from "../api"

const {Meta} = Card

export default function Private() {
  const [isInFly, setIsInFly] = useState(true)
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
        setIsInFly(false)
      })

    // !user?.id && gtInstance.get(`/admins/users/6185598498`)
    //   .then(response => {
    //     const {data} = response.data
    //     setUsers(data)
    //     setIsInFly(false)
    //   })
  }, [user])

  if (isInFly) {
    return <Spin/>
  }

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