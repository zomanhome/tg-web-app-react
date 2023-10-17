import {theme} from "antd"

export function themeAlgorithm(colorScheme) {
  const isLight = colorScheme === 'light'

  return {
    algorithm: isLight
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm
  }
}