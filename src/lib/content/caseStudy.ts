export const caseStudy = {
	title: 'Apsley Marina, Hertfordshire',
	lead: 'A 600-household residential community — 25 years old, no existing EV infrastructure. A full turnkey delivery from survey to live operation.',
	/** One-line proof point for the preview card near the top of the page */
	summary:
		'A 600-household community with no EV infrastructure. We upgraded the power supply, secured grant funding and installed six 22 kW chargers, with room for six more.',
	caption: 'Union EV charge point — installed, managed, and maintained end-to-end.',
	challengeSummary:
		"Any scheme needed the agreement of the freeholder, the residents' association and the block manager. None of them wanted to fund or manage an installation, and the site's power supply could not support chargers.",
	challenge: [
		'Residents charging via dangerous extension leads',
		'Insufficient power supply for EV infrastructure',
		'No appetite to fund or manage an installation',
		"Complex stakeholder landscape: freeholder, residents' association, block manager"
	],
	solution: [
		'Full site survey, planning, and design',
		'Fully funded installation, with no capital cost to the site',
		'Government grants secured on behalf of residents',
		'Power supply upgraded to support the network',
		'6 × 22kW charging posts installed, future-proofed for 6 more',
		'Ongoing management, maintenance, reporting, and insurance included'
	],
	/** Month the stats were taken, e.g. 'October 2026'; shown under the stats once set */
	reportedAt: null as string | null,
	stats: [
		{ value: '264', label: 'Charging sessions since launch' },
		{ value: '22 kWh', label: 'Average energy per session' },
		{ value: '6+6', label: 'Installed now, future-proofed for 6 more' }
	],
	quotes: [
		{
			quote:
				"Having easy, local charging available has completely changed things for us. I'm now seriously looking at getting an EV.",
			author: 'Apsley Marina Resident',
			role: null as string | null
		},
		{
			quote:
				'Union EV made the whole process simple. We now have a reliable, future-ready charging facility on site.',
			author: 'Apsley Marina Community',
			role: null as string | null
		}
	]
} as const;
