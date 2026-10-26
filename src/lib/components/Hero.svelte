<script lang="ts">
	import { images } from '../content/images';
	import Button from './Button.svelte';
	import Image from './Image.svelte';
</script>

<section class="hero">
	<div class="container hero__grid">
		<div class="hero__copy">
			<h1 class="hero__title">
				EV Charging for Your Development.
				<span class="text-accent-light">Flexible Funding. Fully Managed.</span>
			</h1>
			<p class="hero__lead">
				We install, operate, and maintain a complete EV charging network at your site, with full,
				part-funded or zero-capex options available depending on the project and site. You receive a
				share of the revenue, while we manage everything else.
			</p>
			<p class="hero__sub">
				From free site survey through to live operation, ongoing maintenance, and ESG reporting —
				one partner, one relationship, nothing left for you to manage.
			</p>
			<div class="hero__actions">
				<Button href="#contact" sublabel="Start the Conversation">See What's Possible</Button>
				<Button href="#what-we-do" variant="outline">What We Do</Button>
			</div>
		</div>

		<div class="hero__media">
			<div class="hero__frame">
				<div class="hero__offset"></div>
				<div class="hero__image">
					<!-- lazy: the frame is display:none below lg, so mobile never downloads it -->
					<Image src={images.hero} alt="EV charging in action" class="img-fill" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
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
		align-items: center;
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
	.hero__lead {
		margin-bottom: 1.5rem;
		color: var(--gray-300);
		font-size: 1.125rem;
		line-height: 1.625;
	}
	.hero__sub {
		margin-bottom: 2.5rem;
		color: var(--gray-400);
		font-size: 0.875rem;
		line-height: 1.625;
	}
	.hero__actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
		background: rgb(237 79 34 / 0.1);
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
		.hero__media {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			height: 100%;
			padding-top: 3rem;
		}
	}
	@media (min-width: 1280px) {
		.hero__title {
			font-size: 3.75rem;
		}
	}
</style>
