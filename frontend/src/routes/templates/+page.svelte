<script lang="ts">
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let isAuthenticated = false;

	// Local template definitions
	const templates = [
		{
			id: 'templateBasic',
			name: 'Classic Template',
			description: 'A clean and elegant design for your obituary',
			component_id: 'templateBasic',
			// preview: 'https://via.placeholder.com/800x400/000000/ffffff?text=Classic+Template'
		},
		{
			id: 'templateMemora',
			name: 'Memora Template',
			description: 'A beautiful and modern design with lavender accents',
			component_id: 'templateMemora',
			// preview: 'https://via.placeholder.com/800x400/6c5b7b/ffffff?text=Memora+Template'
		}
	];

	// Validate template component IDs
	const validTemplateIds = templates.map(t => t.component_id);
	
	// Function to validate template ID
	function isValidTemplateId(id: string): boolean {
		return validTemplateIds.includes(id);
	}

	// Initialize PocketBase and check authentication
	onMount(async () => {
		await pb.collection('users').authRefresh();
		isAuthenticated = pb.authStore.isValid;
		
		if (!isAuthenticated) {
			goto('/sign-up');
		}
	});

</script>

<h1 class="text-2xl font-bold mb-4">Choose a Template</h1>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	{#each templates as template}
		<a href={`/editor?template=${template.component_id}`} class="block p-4 border rounded hover:shadow-lg">
			<h2 class="text-lg font-semibold">{template.name}</h2>
			<p class="mt-2 text-sm text-gray-500">{template.description}</p>
		</a>
	{/each}
</div>
