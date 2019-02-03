
(function typewrite(textIndex = 0) {
	const texts = ['games.', 'browser extensions.', 'mobile apps.', 'desktop programs.'];
	const delay = 100;


	[...document.getElementsByClassName("typewrite")].forEach(it => {
		const text = texts[textIndex];
		let index = 0;

		const prefix = it.textContent;
		
		(function addLetter() {
			it.textContent += text[index];
			index++;

			// it.textContent= `width: ${window.innerWidth}, height: ${window.innerHeight}`
			
			if(index < text.length) setTimeout(addLetter, delay)
			else setTimeout(
				function erease() {
					it.textContent = it.textContent.substring(0, prefix.length + index);
					index--;
					
					if(index >= 0)
						setTimeout(erease, delay/2)
					else (() => {
						if(textIndex < texts.length-1) textIndex++
						else textIndex = 0

						setTimeout(typewrite, delay*3, textIndex);
					})()
				},
				delay*20)
			
		})()
	})
})()