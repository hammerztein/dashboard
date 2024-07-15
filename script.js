// DOM variables
const navbar = document.querySelector('.navbar ul');
const circleGraphs = document.querySelectorAll('.graph');
const searchForm = document.querySelector('#search-bar');
const searchbar = searchForm.querySelector('#search');

// Functions
function addActiveClass(link) {
	link.classList.add('active');
}

function removeActiveClasses() {
	const links = navbar.querySelectorAll('li a');
	links.forEach((link) => link.classList.remove('active'));
}

function handleLinkActivation(event) {
	// Find closest ancestor link tag
	const link = event.target.closest('a');
	// Match all, but the logout link
	removeActiveClasses();
	addActiveClass(link);
}

function getCircleValues(circle) {
	const numberContainer = circle.nextElementSibling;
	const targetValue = numberContainer
		.querySelector('ul li:nth-of-type(1) p')
		.textContent.replace(/\D/g, '');
	const resultValue = numberContainer
		.querySelector('ul li:nth-of-type(2) p')
		.textContent.replace(/\D/g, '');
	const offsetValue = numberContainer
		.querySelector('ul li:nth-of-type(3) p')
		.textContent.replace(/\D/g, '');
	const percentage = Math.floor((resultValue / targetValue) * 100);
	const color = selectFillColor(percentage);

	return {
		percentage,
		color,
	};
}

function selectFillColor(percentage) {
	if (+percentage <= 25) {
		return '#f87171';
	}
	if (+percentage <= 85) {
		return '#fbbf24';
	}
	if (+percentage <= 100) {
		return '#4ade80';
	}
}

function fillCircle(container) {
	const circle = container.querySelector('.circle .fill');
	const values = getCircleValues(container);
	let fillCounter = 0;
	const animateFill = setInterval(() => {
		fillCounter++;
		circle.style.background = `conic-gradient(${values.color} ${fillCounter}%, transparent 0)`;
		circle.dataset.value = fillCounter;
		if (fillCounter >= values.percentage) {
			clearInterval(animateFill);
		}
	}, 20);
}

function openSearchbar(event) {
	event.currentTarget.classList.add('open');
}

function closeEmptySearchbar(event) {
	const searchbar = event.currentTarget;

	if (!searchbar.value) {
		searchbar.parentElement.classList.remove('open');
	}
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
	circleGraphs.forEach((circle) => fillCircle(circle));
});

navbar.addEventListener('click', handleLinkActivation);

searchForm.addEventListener('click', openSearchbar);

searchbar.addEventListener('blur', closeEmptySearchbar);
