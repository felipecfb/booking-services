import Cookies from 'js-cookie'

export function removeCookie(name: string) {
  Cookies.remove(name)
}
