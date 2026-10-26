type Partner = {
	name: string;
	/** What the partner does for Union EV: hardware, installation or operating platform */
	role: string;
	url?: string;
	/** Imported logo file; only add once the partner has approved its use */
	logo?: string;
};

export const partners: Partner[] = [
	{ name: 'ROLEC', role: 'Charge point hardware', url: 'https://www.rolecserv.com/' },
	// Website not yet confirmed (see docs/open-points.md)
	{ name: 'Procharge EV', role: 'Certified installation' },
	{ name: 'Monta', role: 'Operating platform & driver app', url: 'https://monta.com/' }
];

export const benefits = [
	'Everything handled, end to end',
	'Fully funded options for suitable sites',
	'A share of the charging revenue'
] as const;
