import { allowedKeyCodes, allowedKeyCodesWithCtrlKey } from './config'
import { getSelectedTextByElement } from './utils'

const contenteditableMaxLength = options => {
  const { element, maxLength } = options

  const handleKeyDown = event => {
    const isAllowedKey = allowedKeyCodes.includes(event.keyCode)
    const isShortcut = event.ctrlKey && allowedKeyCodesWithCtrlKey.includes(event.keyCode)
    const isAllowedAction = isAllowedKey || isShortcut

    if (isAllowedAction) {
      return
    }

    const content = event.target.innerText
    const contentLength = content.length

    if (contentLength >= maxLength) {
      event.preventDefault()
    }
  }

  const handlePaste = event => {
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedText = clipboardData.getData('text/plain')
    const content = event.target.innerText
    const contentLength = content.length
    const selectedText = getSelectedTextByElement(element)
    const allowedPasteLength = maxLength - contentLength + selectedText.length
    const slicedPasteText = pastedText.substring(0, allowedPasteLength)

    event.preventDefault()

    document.execCommand('insertHTML', false, slicedPasteText)
  }

  element.addEventListener('keydown', handleKeyDown)
  element.addEventListener('paste', handlePaste)

  const unsubscribe = () => {
    element.removeEventListener('keydown', handleKeyDown)
    element.removeEventListener('paste', handlePaste)
  }

  return unsubscribe
}

export default contenteditableMaxLength
