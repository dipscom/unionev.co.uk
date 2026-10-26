<script lang="ts">
	import Audiences from '#lib/components/Audiences.svelte';
	import BenefitStrip from '#lib/components/BenefitStrip.svelte';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import CaseStudyPreview from '#lib/components/CaseStudyPreview.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import Features from '#lib/components/Features.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import PageShell from '#lib/components/PageShell.svelte';
	import Partners from '#lib/components/Partners.svelte';
	import Process from '#lib/components/Process.svelte';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo organization />

<PageShell>
	<Hero />
	<BenefitStrip />
	<Partners />
	<CaseStudyPreview />
	<Features />
	<Gallery />
	<Process />
	<CtaBand />
	<Audiences />
	<CaseStudy />
	<Faq />
	<Contact />
</PageShell>
