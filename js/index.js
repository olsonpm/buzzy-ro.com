'use strict'

const duration = 500,
  easing = 'cubicBezier(0.25, 0.1, 0.25, 1.0)',
  showMoreBtn = document.getElementById('show-more'),
  moreEl = document.getElementById('more'),
  stopAnimating = getStopAnimating()

let isAnimating = false

document.querySelectorAll('a').forEach(el => {
  el.classList.add('hvr-ripple-out')
  el.setAttribute('target', '_blank')
})

showMoreBtn.addEventListener('click', () => {
  if (isAnimating) return

  isAnimating = true

  if (moreEl.classList.contains('hidden')) {
    show().then(...stopAnimating)
  } else {
    hide().then(...stopAnimating)
  }
})

function show() {
  moreEl.classList.remove('hidden')

  return Promise.all([
    anime({
      duration,
      easing,
      opacity: 1,
      targets: '#more',
    }).finished,
    anime({
      duration,
      easing,
      rotate: 180,
      targets: '#show-more',
    }).finished,
  ])
}

function hide() {
  return Promise.all([
    anime({
      duration,
      easing,
      opacity: 0,
      targets: '#more',
    }).finished,
    anime({
      duration,
      easing,
      rotate: 0,
      targets: '#show-more',
    }).finished,
  ]).then(() => {
    moreEl.classList.add('hidden')
  })
}

function getStopAnimating() {
  return [
    () => {
      isAnimating = false
    },
    err => {
      isAnimating = false
      console.error(err)
    },
  ]
}
