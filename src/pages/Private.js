import {Alert} from "antd"

export default function Private() {

  return (
    <Alert
      showIcon
      type='success'
      message={'Access granted'}
    />
  )
}