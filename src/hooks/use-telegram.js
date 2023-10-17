const tg = window.Telegram.WebApp

export function useTelegram() {

  const onClose = () => {
    tg.close()
  }

  const onToggleMainButton = () => {
    tg.MainButton.isVisible
      ? tg.MainButton.hide()
      : tg.MainButton.show()
  }

  return {
    tg,
    initData: tg.initData,
    user: tg.initDataUnsafe?.user,
    colorScheme: tg.colorScheme,
    query_id: tg.initDataUnsafe?.query_id,
    onClose,
    onToggleMainButton,

  }
}