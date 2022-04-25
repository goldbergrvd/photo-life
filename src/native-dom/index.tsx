export const rootEle = document.getElementById('root') as HTMLDivElement

export function setThemeColor(colorCode: string) {
  document.head.querySelector('meta[name=theme-color]')?.setAttribute('content', colorCode)
  document.head.querySelector('meta[name=apple-mobile-web-app-status-bar-style]')?.setAttribute('content', colorCode)
}

export class ScrollTrigger {
  private ele: HTMLDivElement
  private prevFetchTime = new Date()
  private prevScrollY = 0
  private listener = () => {}

  constructor(ele: HTMLDivElement) {
    this.ele = ele
    this.onScroll = this.onScroll.bind(this)
  }

  private isRemainOneScreenHeight() {
    return this.ele.offsetHeight - rootEle.scrollTop < window.innerHeight * 2
  }

  private isScrollDown() {
    return this.prevScrollY < rootEle.scrollTop
  }

  private isPassTwoSecond() {
    return new Date().getTime() - this.prevFetchTime.getTime() > 2000
  }

  private onScroll() {
    if (this.isRemainOneScreenHeight() && this.isScrollDown() && this.isPassTwoSecond()) {
      this.prevFetchTime = new Date()
      this.listener()
    }
    this.prevScrollY = rootEle.scrollTop
  }

  public on(listener: () => void) {
    this.listener = listener
    rootEle.addEventListener('scroll', this.onScroll)
  }

  public off() {
    rootEle.removeEventListener('scroll', this.onScroll)
  }

  public scrollToPrevY() {
    rootEle.scrollTo(0, this.prevScrollY)
  }
}
