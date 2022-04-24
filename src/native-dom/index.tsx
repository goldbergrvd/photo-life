export const rootEle = document.getElementById('root') as HTMLDivElement

export function setThemeColor(colorCode: string) {
  document.head.querySelector('meta[name=theme-color]')?.setAttribute('content', colorCode)
  document.head.querySelector('meta[name=apple-mobile-web-app-status-bar-style]')?.setAttribute('content', colorCode)
}