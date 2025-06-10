<script lang="ts">
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';
	import type { Template } from '$lib/types';

	let templates: Template[] = [];

	onMount(async () => {
		templates = await pb.collection('templates').getFullList();
	});
</script>

<h1 class="text-2xl font-bold mb-4">Choose a Template</h1>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	{#each templates as template}
		<a href={`/templates/${template.id}`} class="block p-4 border rounded hover:shadow-lg">
			<h2 class="text-lg font-semibold">{template.name}</h2>
			<img src={template.preview} alt="Preview" class="mt-2 w-full h-40 object-cover rounded" />
			<p class="mt-2 text-sm text-gray-500">{template.description}</p>
		</a>
	{/each}
</div>
