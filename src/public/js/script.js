document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("scroll", function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 75) {
    navbar.style = 'background: rgba(0,0,0,.8); backdrop-filter: blur(3px);'
  } else {
   navbar.style = '--bs-bg-opacity: 0;'
  }
})

  document.querySelector('.msgBtn').addEventListener('click', (e) => {
    const input = document.querySelector('.msgInpt')
    e.preventDefault()
    if(!input.value) input.style = 'border: 1px solid #ff2c2c; border-radius: 2px;'
    else
    document.querySelector('.inputArea').submit()
  })

})