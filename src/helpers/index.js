export function isAccessDenied(tg, adminsList) {
  const tgs = adminsList.map(admin => admin.tg)

  return !tgs.includes(tg)
}