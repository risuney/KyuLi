const $ = require('jquery')

$('.search-box').bind('keydown', function(e){
  if (e.key == 'Enter'){
    const value = $(this).val()
    if (searchStr(value, 'https://') == 0) {
      $('#webview').attr('src', value)
    } else if (searchStr(value, 'http://') == 0) {
      $('#webview').attr('src', value)
    } else {
      $('#webview').attr('src', `https://www.google.com/search?q=${value}`)
    }
    $(this).blur()
	}
})

$('.search-box').on('click', function(){
  $(this).select()
})

function searchStr(string, searchString) {
  return string.indexOf(searchString)
}

const webview = document.querySelector('#webview')

const config = {attributes: true}

const callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      $('.search-box').val(decodeURI($('#webview').attr('src')))
      $('#favicon').addClass('hidden')
      $('.loader').removeClass('hidden')
      $('#favicon').attr('src', '')
    }
  }
}

const observer = new MutationObserver(callback)

observer.observe(webview, config)

$('#back').on('click', function(){
  webview.goBack()
})

$('#forward').on('click', function(){
  webview.goForward()
})

$('#reload').on('click', function(){
  webview.reload()
})

$('#home').on('click', function(){
  webview.src = 'https://www.google.com/'
})

$('#dev').on('click', function(){
  webview.openDevTools()
})

webview.addEventListener('page-favicon-updated', function(e) {
  $('#favicon').removeClass('hidden')
  $('.loader').addClass('hidden')
  $('#favicon').attr('src', e.favicons[0])
})

webview.addEventListener('page-title-updated', function(e) {
  $('.tab-title').text(e.title)
})
