export const site = {
	name: 'Union EV',
	legalName: 'Union Electric Vehicle Charging Limited',
	origin: 'https://www.unionev.co.uk',
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
	/** Public Cloudflare Turnstile site key. This is Cloudflare's always-passes test key; replace for production */
	turnstileSiteKey: '1x00000000000000000000AA',
	linkedin: 'https://www.linkedin.com/company/union-ev',
	registered: 'Registered in England & Wales',
	// Not yet supplied (see docs/open-points.md); the footer only shows them once set
	companyNumber: null as string | null,
	registeredOffice: null as string | null,
	insurance: '£10M liability insurance',
	year: 2026
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.enquirySubject)}`;

/** Route for existing drivers, kept apart from new-site enquiries until a dedicated support page exists */
export const driverSupport = `mailto:${site.email}?subject=${encodeURIComponent('Driver support')}`;
