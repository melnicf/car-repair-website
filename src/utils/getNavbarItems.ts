type NavbarItem = {
	title: string
	link: string
}
export function getNavbarItems(): NavbarItem[] {
	return [
		{ title: 'Home', link: '/' },
		{ title: 'Chi siamo', link: '/about-us' },
		{ title: 'Servizi', link: '/services' },
		{ title: 'Galleria', link: '/gallery' },
		{ title: 'Contatti', link: '/contact-us' },
	]
}
