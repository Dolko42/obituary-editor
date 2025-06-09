<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />

<div class="container pt-24">
	{@render children()}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
