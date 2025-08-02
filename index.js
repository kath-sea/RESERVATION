	// All functionality wrapped in DOMContentLoaded
	document.addEventListener('DOMContentLoaded', function() {
		
		let slideIndex = 0;
		let slider = document.getElementById('slider');
		let slides = slider ? slider.getElementsByClassName('slide') : [];
		
		// Slide control functionality
		let slideControl = document.getElementById('slide-control');
		let slideControlItems = slideControl ? slideControl.getElementsByClassName('slide-control-item') : [];
		
		// Function to reset home section
		function resetHomeSection() {
			if (slides.length > 0) {
				// Reset slide index
				slideIndex = 0;
				
				// Hide all slides and set initial position
				Array.from(slides).forEach(slide => {
					slide.classList.remove('active');
					slide.style.transform = 'translateX(100%)';
				});
				
				// Show first slide
				setTimeout(() => {
					slides[0].classList.add('active');
					slides[0].style.transform = 'translateX(0%)';
				}, 100);
				
				// Reset slide control
				if (slideControlItems.length > 0) {
					Array.from(slideControlItems).forEach(item => {
						item.classList.remove('active');
					});
					setTimeout(() => {
						slideControlItems[0].classList.add('active');
					}, 100);
				}
			}
		}
	
	// Initialize first slide if it exists
	if (slides.length > 0) {
		// Set all slides to initial position
		Array.from(slides).forEach(slide => {
			slide.classList.remove('active');
			slide.style.transform = 'translateX(100%)';
		});
		
		// Show first slide after a delay
		setTimeout(() => {
			slides[0].classList.add('active');
			slides[0].style.transform = 'translateX(0%)';
		}, 500);
	}
	
	// Initialize first slide control as active
	if (slideControlItems.length > 0) {
		setTimeout(() => {
			slideControlItems[0].classList.add('active');
		}, 500);
	}
	
	// Slide control click functionality
	Array.from(slideControlItems).forEach((el, index) => {
		el.onclick = function() {
			if (index === slideIndex) return;
			
			slideIndex = index;
			
			// Remove active class from current slide control
			let currSlideControl = slideControl.querySelector('.slide-control-item.active');
			if (currSlideControl) {
				currSlideControl.classList.remove('active');
			}
			
			// Hide current slide and show new slide with slide-right animation
			Array.from(slides).forEach(slide => {
				if (slide.classList.contains('active')) {
					slide.style.transform = 'translateX(-100%)';
					setTimeout(() => {
						slide.classList.remove('active');
					}, 600);
				} else {
					slide.classList.remove('active');
					slide.style.transform = 'translateX(100%)';
				}
			});
			
			// Show the selected slide with aesthetic timing
			setTimeout(() => {
				if (slides[slideIndex]) {
					slides[slideIndex].classList.add('active');
					slides[slideIndex].style.transform = 'translateX(0%)';
				}
			}, 150);
			
			// Add active class to new slide control immediately
			if (slideControlItems[slideIndex]) {
				slideControlItems[slideIndex].classList.add('active');
			}
		};
	});
	
	// Modal functionality
	let modal = document.getElementById('modal');
	let closeBtn = document.getElementById('modal-close');
	
	if (closeBtn) {
		closeBtn.onclick = () => {
			if (modal) {
				modal.style.display = 'none';
			}
		};
	}
	
	// More images functionality
	let moreImages = document.getElementsByClassName('more-images-item');
	let previewImages = document.getElementsByClassName('img-preview');
	
	Array.from(moreImages).forEach((el) => {
		el.onclick = () => {
			let imgItems = el.parentNode.getElementsByTagName('img');
			
			Array.from(imgItems).forEach((item, index) => {
				if (previewImages[index]) {
					previewImages[index].src = item.src;
				}
			});
			
			let img = el.querySelector('img');
			if (modal && img) {
				modal.style.display = 'block';
				
				let modalContent = modal.querySelector('.modal-content');
				if (modalContent) {
					modalContent.src = img.src;
					
					let temp = modalContent.cloneNode(true);
					modalContent.parentNode.replaceChild(temp, modalContent);
				}
			}
		};
	});
	
	// Navigation functionality - Fixed to prevent errors
	const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
	const sections = document.querySelectorAll('section, #slider');
	
	// Hide all sections initially except slider
	sections.forEach(section => {
		if (section.id !== 'slider') {
			section.style.display = 'none';
		} else {
			section.style.display = 'block'; // Changed to block for original slider
		}
	});
	
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			// Remove active class from all links
			navLinks.forEach(navLink => navLink.classList.remove('active'));
			
			// Add active class to clicked link
			this.classList.add('active');
			
			const targetId = this.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			
			if (targetSection) {
				// Hide all sections with smooth transition
				sections.forEach(section => {
					if (section !== targetSection) {
						section.style.opacity = '0';
						setTimeout(() => {
							section.style.display = 'none';
						}, 300);
					}
				});
				
				// Show target section with smooth transition
				if (targetId === '#slider') {
					targetSection.style.display = 'block'; // Use block for slider
				} else {
					targetSection.style.display = 'flex';
				}
				setTimeout(() => {
					targetSection.style.opacity = '1';
				}, 50);
				
				// If showing slider, ensure first slide is active
				if (targetId === '#slider') {
					resetHomeSection();
				}
			}
		});
	});
	
	// Add smooth transitions to sections
	sections.forEach(section => {
		section.style.transition = 'opacity 0.3s ease';
		section.style.opacity = '1';
	});
});

