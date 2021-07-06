const click = () => {
  setTimeout(() => {
    const cancel = document.querySelector('#cancel-button > a > #button > #text')
    const confirm = document.querySelector('#confirm-button > a > #button > #text')
    if (cancel == null && confirm) confirm.click()
  }, 200)
}
const popupObserver = new MutationObserver(records => {
  if (records[0].addedNodes[0].localName != 'paper-dialog') return
  const dialog = document.getElementsByTagName('paper-dialog')[0]
  const dialogObserver = new MutationObserver(records => click())
  click()
  dialogObserver.observe(dialog, {
    attributes: true
  })
})
const start = (popup) => {
  popupObserver.observe(popup, {
    childList: true
  })
}
const popup = document.getElementsByTagName('ytd-popup-container')[0]
// elementが取得できない時があるので……
if (popup != null) {
  start(popup)
} else {
  setTimeout(() => {
    start(document.getElementsByTagName('ytd-popup-container')[0])
  }, 10000)
}
