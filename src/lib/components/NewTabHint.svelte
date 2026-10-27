<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<!-- Goes inside a target="_blank" link: a visible arrow, and the same warning for screen readers -->
<span class="new-tab"><Icon name="external" size="0.875em" /></span>
<span class="visually-hidden">(opens in a new tab)</span>

<style>
	.new-tab {
		display: inline-flex;
		margin-left: 0.25em;
		vertical-align: -0.0625em;
	}
</style>
