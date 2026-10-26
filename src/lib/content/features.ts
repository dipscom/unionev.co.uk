import type { IconName } from '../components/Icon.svelte';

export const features = [
	{
		icon: 'plug',
		title: 'Design & Install',
		body: 'A site survey, a layout designed around how your site is used, and installation by certified engineers. Infrastructure is sized so more chargers can be added later.'
	},
	{
		icon: 'pound',
		title: 'Funding & Finance',
		body: 'Fully funded, part-funded or owner-funded, depending on the site. We identify grants you may be eligible for and set out costs and revenue share before you commit.'
	},
	{
		icon: 'wrench',
		title: 'Operate & Maintain',
		body: 'Remote monitoring, fault response, smart scheduling and energy management keep chargers available and running costs down. We can also take over and upgrade existing chargers.'
	},
	{
		icon: 'chart',
		title: 'Reporting & ESG',
		body: 'Charging and carbon data for your ESG reporting, with business and private use kept separate for reimbursement and HMRC. Fleets also see cost per mile, location and time of day.'
	}
] as const satisfies readonly { icon: IconName; title: string; body: string }[];
