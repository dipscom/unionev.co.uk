export const site = {
	name: 'Union EV',
	legalName: 'Union Electric Vehicle Charging Limited',
	origin: 'https://unionev.co.uk',
	title: 'Union EV | Managed EV Charging for Residential Sites, Workplaces & Depots',
	description:
		'Managed EV charging for residential sites, workplaces, destinations and fleet depots across the UK, with flexible funding. We survey, install, operate and maintain.',
	tagline:
		'Managed EV charging for residential sites, workplaces, destinations and depots across the United Kingdom, with flexible funding options.',
	/** The one funding sentence; reuse it so the offer reads the same everywhere */
	funding:
		'Fully funded, part-funded and owner-funded options are available, depending on the site and its suitability.',
	/** Label for the single primary call to action; every instance links to #contact */
	primaryCta: 'Request a free site assessment',
	email: 'grant@uevcl.com',
	enquirySubject: 'EV Charging Enquiry',
	/** Placeholder until Union EV confirms what it can promise (docs/open-points.md) */
	responseCommitment: 'We aim to reply within one working day.',
	/** Not yet supplied; the contact section only shows it once set */
	phone: null as string | null,
	/**
	 * Public Cloudflare Turnstile site key ("Union EV enquiry form" widget, hostname unionev.co.uk).
	 * Pairs with the TURNSTILE_SECRET Worker secret. It does not work on localhost: to send the form
	 * through `npm run preview:cf`, swap in Cloudflare's test key '1x00000000000000000000AA' locally
	 * (it pairs with the test secret in .dev.vars.example)
	 */
	turnstileSiteKey: '0x4AAAAAAGQ9AEC3q0E9B-6T',
	linkedin: 'https://www.linkedin.com/company/union-ev',
	registered: 'Registered in England & Wales',
	// Not yet supplied (see docs/open-points.md); the footer only shows them once set
	companyNumber: null as string | null,
	registeredOffice: null as string | null,
	insurance: '£10M liability insurance',
	year: 2026
} as const;
