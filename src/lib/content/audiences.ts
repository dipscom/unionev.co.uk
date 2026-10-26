import type { IconName } from '../components/Icon.svelte';

// `slug` is the value passed to the enquiry form as ?type=<slug>
export const audiences = [
	{
		slug: 'freeholders',
		icon: 'building',
		label: 'Freeholders & Landlords',
		summary: 'Add EV charging to your property without taking on the running of it.',
		points: [
			'Fully funded, part-funded or owner-funded installation, depending on the site',
			'A share of the charging revenue',
			'A clear agreement on who owns and maintains the chargers'
		]
	},
	{
		slug: 'housing-developers',
		icon: 'house',
		label: 'Housing Developers',
		summary: 'Charging designed into new developments and ready to run at handover.',
		points: [
			'Infrastructure planned alongside your build programme',
			'Power and ducting sized so more chargers can be added later',
			'A managed service in place for residents from handover'
		]
	},
	{
		slug: 'property-managers',
		icon: 'clipboard',
		label: 'Block & Property Managers',
		summary: "Charging for residents that doesn't add to your workload.",
		points: [
			'Resident access managed through the Monta app',
			'Drivers pay per session, so there is no billing for you to run',
			'Monitoring and maintenance handled by us, with one point of contact'
		]
	},
	{
		slug: 'residents-associations',
		icon: 'users',
		label: "Residents' Associations",
		summary: 'Help to bring charging to your community, with fair access for everyone.',
		points: [
			'Support in getting the freeholder and managing agent on board',
			'Access control so chargers are shared fairly between registered users',
			'A worked example: Apsley Marina, a 600-household community'
		]
	},
	{
		slug: 'fleet-operators',
		icon: 'truck',
		label: 'Fleet Operators',
		summary: 'Depot charging that keeps vehicles ready and costs visible.',
		points: [
			'Smart scheduling so vehicles are charged when they are needed',
			'Cost per mile, location and time-of-day reporting',
			'Business and private charging kept separate for reimbursement'
		]
	},
	{
		slug: 'local-authorities',
		icon: 'landmark',
		label: 'Local Authorities',
		summary: 'Community charging delivered in partnership.',
		points: [
			'Charging for residents who have no off-street parking',
			'One delivery partner from survey through installation to operation',
			'Experience from residential projects such as Apsley Marina'
		]
	},
	{
		slug: 'businesses',
		icon: 'briefcase',
		label: 'Businesses & Employers',
		summary: 'Workplace charging for staff, visitors and company vehicles.',
		points: [
			'Access control for staff and visitors',
			'Funding options, including grants where you are eligible',
			'Charging data for ESG reporting and staff reimbursement'
		]
	},
	{
		slug: 'existing-infrastructure',
		icon: 'refresh',
		label: 'Existing Infrastructure Owners',
		summary: 'Bring underused or unreliable chargers back into service.',
		points: [
			'Takeover of existing chargers',
			'Repairs, maintenance and remote monitoring',
			'Upgrades to improve reliability and usage'
		]
	}
] as const satisfies readonly {
	slug: string;
	icon: IconName;
	label: string;
	summary: string;
	points: readonly string[];
}[];

export type AudienceSlug = (typeof audiences)[number]['slug'];
