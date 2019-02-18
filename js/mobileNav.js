let hamburger = document.querySelector('#hamburger')
let mobilenav = document.querySelector('mobilenav')

let mobileListElements = document.querySelectorAll('mobilenav ul li')

const slideinSpeed = sToNum(getVariableCSS('--slidein-speed'))
const slideoutSpeed = sToNum(getVariableCSS('--slideout-speed'))
const fadeOutTextSpeed = sToNum(getVariableCSS('--text-fade-out-speed'))
const fadeInTextSpeed = sToNum(getVariableCSS('--text-fade-in-speed'))

hamburger.onclick = function(e) {
	if(mobilenav.getAttribute('hide') === "") {
		// Opening action

		mobilenav.toggleAttribute('hide')
		mobilenav.toggleAttribute('slidein')
		setTimeout(()=>{
			mobilenav.toggleAttribute('slidein')
		}, slideinSpeed)
		
		title.toggleAttribute('fadeOutText')
		setTimeout(() => {
			title.toggleAttribute('hide')
			title.toggleAttribute('fadeOutText')			
		}, fadeOutTextSpeed)
		
		//
	} else {
		// Closing action

		mobilenav.toggleAttribute('slideout')
		setTimeout(()=>{
			mobilenav.toggleAttribute('hide')
			mobilenav.toggleAttribute('slideout')
		}, slideoutSpeed - 10)

		title.toggleAttribute('hide')
		title.toggleAttribute('fadeInText')
		setTimeout(() => {
			title.toggleAttribute('fadeInText')			
		}, fadeOutTextSpeed)

		//
	}
}

mobileListElements.forEach(it => {
	it.onclick = function(event) {
		hamburger.click();
	}
})

function getVariableCSS(name) {
	return getComputedStyle(document.body).getPropertyValue(name)
}

function sToNum(s) {
	return parseInt(s.substring(1, s.length-1)) * 1000
}