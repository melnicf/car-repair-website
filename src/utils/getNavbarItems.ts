type NavbarItem = {
	title: string
	link: string
}
export function getNavbarItems(): NavbarItem[] {
	return [
		{ title: 'HOME', link: '/' },
		{ title: 'CHI SIAMO', link: '/about-us' },
		{ title: 'SERVIZI', link: '/services' },
		{ title: 'GALLERIA', link: '/gallery' },
		{ title: 'CONTATTI', link: '/contact-us' },
	]
}
