let title
let arrowDown
let initialDisplayValue

let navDissapearSpeed = 4

title = document.getElementById('title')
arrowDown = document.getElementById('arrow-down')
initialDisplayValue = title.style.display

// Remove title when scrolled by
document.addEventListener('scroll', e => {
	let scrollPercentage = (window.scrollY/window.innerHeight)*100
	// console.log(scrollPercentage)
	if(scrollPercentage >= 60) {
		title.style.display = 'none'
		arrowDown.style.display = 'none'
	} else {
		title.style.display = initialDisplayValue
		arrowDown.style.display = 'inline-block'
	}

	if(window.innerWidth <= 550) {
		// Removes navbar if you scroll far
		if(scrollPercentage >= 95) {
			document.querySelector("nav").style.marginTop = `-${(scrollPercentage - 95)*navDissapearSpeed}px`
		} else {
			document.querySelector("nav").style.marginTop = "0"
		}
	}

})