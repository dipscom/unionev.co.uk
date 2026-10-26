export const site = {
	name: 'Union EV',
	legalName: 'Union Electric Vehicle Charging Limited',
	origin: 'https://www.unionev.co.uk',
	title: 'Union EV | Smart EV Charging for Residential Communities',
	description:
		'Union EV delivers fully managed, zero-CAPEX electric vehicle charging for residential developments across the UK. Powered by 100% renewable energy.',
	tagline: 'Fully managed, zero-CAPEX EV charging for residential developments across the UK.',
	email: 'grant@uevcl.com',
	enquirySubject: 'EV Charging Enquiry',
	linkedin: 'https://www.linkedin.com/company/union-ev',
	registered: 'Registered in England & Wales · £10M Liability Insurance',
	year: 2026
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.enquirySubject)}`;
