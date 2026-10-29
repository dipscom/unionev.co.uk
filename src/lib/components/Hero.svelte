<script lang="ts">
	import { images } from '../content/images';
	import { site } from '../content/site';
	import Button from './Button.svelte';
	import Image from './Image.svelte';

	const uid = $props.id();
	const headingId = `${uid}-heading`;
</script>

<section class="hero theme-dark" aria-labelledby={headingId}>
	<div class="wrapper hero__grid grid" data-layout="split">
		<div class="hero__copy">
			<h1 id={headingId} class="hero__title weight-extrabold">
				<abbr title="electric vehicle">EV</abbr> Charging for Your Site.
				<span class="hero__accent color-accent">Fully Managed.</span>
			</h1>
			<p class="hero__lead text-lg leading-relaxed">
				We design, install, operate and maintain electric vehicle (EV) charging for residential
				sites, workplaces, destinations and depots, and share the revenue with you. {site.funding}
			</p>
			<div class="hero__actions switcher">
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
		padding-top: var(--space-28);
		background: var(--gradient-hero);
		overflow: hidden;
	}
	.hero__grid {
		/* The wrapper's gutter is inside its max width here, not outside it */
		--wrapper-max: calc(var(--w-6xl) - var(--gutter) * 2);
		--gap: var(--space-12);
		--grid-align: start;
	}
	.hero__copy {
		padding-block: var(--space-12);
	}
	.hero__title {
		margin-bottom: var(--space-6);
		font-size: var(--text-4xl);
		line-height: var(--leading-tight);
	}
	/* The lead below spells EV out, so the title doesn't need the dotted underline */
	.hero__title abbr {
		text-decoration: none;
	}
	.hero__lead {
		margin-bottom: var(--space-10);
		color: var(--color-text-on-dark-muted);
	}
	/* Keep each label on one line; the secondary button wraps below when space runs out */
	.hero__actions {
		--btn-inline: var(--space-6);
		--btn-wrap: nowrap;
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
		background: var(--color-accent-wash);
		border-radius: var(--radius-3xl);
	}
	.hero__image {
		position: relative;
		height: 24rem;
		overflow: hidden;
		border-radius: var(--radius-3xl);
		box-shadow: var(--shadow-2xl);
	}

	@media (min-width: 768px) {
		.hero__title {
			font-size: var(--text-5xl);
			line-height: var(--leading-none);
		}
	}
	@media (min-width: 1024px) {
		/* Same top padding as .hero__copy, so the photo lines up with the headline */
		.hero__media {
			display: flex;
			justify-content: center;
			padding-block: var(--space-12);
		}
	}
	@media (min-width: 1280px) {
		.hero__title {
			font-size: var(--text-6xl);
		}
	}
</style>
