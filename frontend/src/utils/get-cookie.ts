import Cookies from 'js-cookie'

export function getCookie(name: string) {
  return Cookies.get(name)
}
