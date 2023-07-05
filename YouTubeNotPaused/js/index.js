const popupName = 'ytd-popup-container'
const dialogName = 'tp-yt-paper-dialog'

const cancelName = '#cancel-button button'
const confirmName = '#confirm-button button'

const elementClick = _ => {
  // すぐに処理するとnullになるので0.2秒後に処理
  setTimeout(_ => {
    document.querySelectorAll(dialogName).forEach(elm => {
      const cancelElement = elm.querySelector(cancelName) // 「キャンセル」
      const buttonElement = elm.querySelector(confirmName) // 「はい」
      if (cancelElement || !buttonElement) return
      buttonElement.click()
      popupObserver.disconnect()
    })
  }, 200)
}

const dialogObserver = new MutationObserver(records => {
  elementClick()
})
const popupObserver = new MutationObserver(records => {
  records.forEach(record => {
    Array.from(record.addedNodes).forEach(addedNode => {
      // ダイアログ以外は処理しない
      if (dialogName !== addedNode.localName) return
      elementClick()
      // 再度ダイアログが表示されるかを監視
      dialogObserver.observe(addedNode, { attributes: true })
    })
  })
})

// 一度もダイアログが表示されてない場合は、popupの中身は空
const start = element => {
  popupObserver.observe(element, { childList: true })
}
const popupElementObserver = document.querySelector(popupName)
// elementが取得できない時があるので時間差で取得
if (popupElementObserver != null) {
  start(popupElementObserver)
} else {
  setTimeout(_ => start(document.querySelector(popupName)), 10000)
}