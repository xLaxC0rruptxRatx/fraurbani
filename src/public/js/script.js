document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("scroll", function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 75) {
    navbar.style = 'background: rgba(0,0,0,.8); backdrop-filter: blur(3px);'
  } else {
   navbar.style = '--bs-bg-opacity: 0;'
  }
})

const subir = document.querySelector('.subir');
const share = document.querySelector('.share');
  window.addEventListener('scroll', function () {
  if (window.scrollY > 1000) {
    subir.style = 'display: block;'
  } else {
    subir.style = 'display: none;'
  }
  })
  
  subir.addEventListener('click', () => { 
    window.scrollTo(0,0)
    //location.href = './iframe.html'
  })
  
  share.addEventListener('click', () => { 
    sharePage()
    //location.href = './iframe.html'
  })
  
const sharePage = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Fraudbani',
      text: 'Chécalo 👀',
      url: window.location.href
    })
    .catch(err => console.log('Share cancelado', err))
  } else {
    alert('Tu navegador no soporta compartir 😢')
  }
}

  document.querySelector('.msgBtn').addEventListener('click', (e) => {
    const input = document.querySelector('.msgInpt')
    e.preventDefault()
    if(!input.value) input.style = 'border: 1px solid #ff2c2c; border-radius: 2px;'
    else
    document.querySelector('.inputArea').submit()
  })
  
  const stars = document.querySelectorAll('#rating i')
  const ratingInput = document.getElementById('rating-value')
  let selectedRating = 0

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      fillStars(star.dataset.value)
    })

    star.addEventListener('click', () => {
      selectedRating = star.dataset.value
      ratingInput.value = selectedRating
    })

    star.addEventListener('mouseout', () => {
      fillStars(selectedRating)
    })
  })

  function fillStars(value) {
    stars.forEach(star => {
      if (star.dataset.value <= value) {
        star.classList.remove('bi-star')
        star.classList.add('bi-star-fill')
      } else {
        star.classList.remove('bi-star-fill')
        star.classList.add('bi-star')
      }
    })
  }
  
  const fileInput = document.getElementById('file')
  const preview = document.getElementById('preview')

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    if (!file) return

    preview.src = URL.createObjectURL(file)
    preview.style.display = 'block'
    document.querySelector('.file-btn').style.display = 'none'
    document.querySelector('.name').style.width = '100%'
  })
  
  document.querySelector('.sendCommentBtn').addEventListener('click', (e) => {
    e.preventDefault()
    
    const comentario = document.querySelector('.comentario')
    const rating = document.querySelector('.ratingInpt')
    
    if (!comentario.value || !rating.value || comentario.value.length <= 3) {
      comentario.style.borderColor = '#cc0000'
      }
      else
      {
    document.querySelector('.commentForm').submit()
      }
  })
  
  document.getElementById("showAllBtn")?.addEventListener("click", () => {
    document.getElementById("allComments").style.display = "block";
    document.querySelector('.viewComments').style.display = "none";
    document.getElementById("showAllBtn").style.display = "none";
  });
  
  document.querySelectorAll('img').forEach((img) => img.setAttribute('inert', 'true'))

})