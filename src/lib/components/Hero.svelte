<script lang="ts">
	import { images } from '../content/images';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import Image from './Image.svelte';

	const uid = $props.id();
	const headingId = `${uid}-heading`;
</script>

<section class="hero" aria-labelledby={headingId}>
	<div class="container hero__grid">
		<div class="hero__copy">
			<h1 id={headingId} class="hero__title">
				<abbr title="electric vehicle">EV</abbr> Charging for Your Site.
				<span class="text-accent text-accent--light">Fully Managed.</span>
			</h1>
			<p class="hero__lead">
				We design, install, operate and maintain electric vehicle (EV) charging for residential
				sites, workplaces, destinations and depots, and share the revenue with you. {site.funding}
			</p>
			<div class="hero__actions">
				<Button href="#contact">{site.primaryCta}</Button>
				<Button href="#case-study" variant="outline">See the case study</Button>
			</div>
		</div>

		<div class="hero__media">
			<div class="hero__frame">
				<div class="hero__offset"></div>
				<div class="hero__image">
					<!-- lazy: the frame is display:none below lg, so mobile never downloads it.
					     fetchpriority is for desktop, where this is the LCP element -->
					<Image
						src={images.hero}
						alt="EV charging in action"
						sizes="448px"
						fetchpriority="high"
						class="img-fill"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		--focus-ring: var(--orange-pale);
		padding-top: 7rem;
		background: linear-gradient(
			to bottom right,
			var(--gray-950),
			var(--green-950),
			var(--gray-900)
		);
		overflow: hidden;
	}
	.hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: start;
	}
	.hero__copy {
		padding-block: 3rem;
	}
	.hero__title {
		margin-bottom: 1.5rem;
		color: var(--white);
		font-size: 2.25rem;
		line-height: 1.25;
		font-weight: 800;
	}
	/* The lead below spells EV out, so the title doesn't need the dotted underline */
	.hero__title abbr {
		text-decoration: none;
	}
	.hero__lead {
		margin-bottom: 2.5rem;
		color: var(--gray-300);
		font-size: 1.125rem;
		line-height: 1.625;
	}
	.hero__actions {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1rem;
	}
	/* Keep each label on one line; the secondary button wraps below when space runs out */
	.hero__actions :global(.btn) {
		padding-inline: 1.5rem;
		white-space: nowrap;
	}
	.hero__media {
		display: none;
	}
	.hero__frame {
		position: relative;
		width: 100%;
		max-width: 28rem;
	}
	.hero__offset {
		position: absolute;
		inset: 0;
		transform: translate(1rem, 1rem);
		background: rgb(196 64 25 / 0.1);
		border-radius: var(--radius-3xl);
	}
	.hero__image {
		position: relative;
		height: 24rem;
		overflow: hidden;
		border-radius: var(--radius-3xl);
		box-shadow: var(--shadow-2xl);
	}

	@media (min-width: 640px) {
		.hero__actions {
			flex-direction: row;
		}
	}
	@media (min-width: 768px) {
		.hero__title {
			font-size: 3rem;
			line-height: 1;
		}
	}
	@media (min-width: 1024px) {
		.hero__grid {
			grid-template-columns: 1fr 1fr;
		}
		/* Same top padding as .hero__copy, so the photo lines up with the headline */
		.hero__media {
			display: flex;
			justify-content: center;
			padding-block: 3rem;
		}
	}
	@media (min-width: 1280px) {
		.hero__title {
			font-size: 3.75rem;
		}
	}
</style>
