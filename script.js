// DOM variables
const navbar = document.querySelector('.navbar ul');

// Functions
function addActiveClass(link) {
	link.classList.add('active');
}

function removeActiveClass() {
	const links = navbar.querySelectorAll('li a');
	links.forEach((link) => link.classList.remove('active'));
}

// Event listeners
navbar.addEventListener('click', (e) => {
	const link = e.target;
	// Match all, but the logout link
	if (link.matches('li a:not(#logout)')) {
		removeActiveClass();
		addActiveClass(link);
	}
});
