export default element => {
  let selectedText = new String().toString()

  if (document.activeElement === element) {
    selectedText = window.getSelection().toString()
  }

  return selectedText
}
