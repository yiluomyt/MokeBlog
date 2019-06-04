import "./src/styles/global.less"
import "./src/styles/prism-vs.css"
import "./src/styles/prism-custom.less"

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `博客内容已更新，是否加载新的内容？`
  )

  if (answer === true) {
    window.location.reload()
  }
}