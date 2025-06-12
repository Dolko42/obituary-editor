<script lang="ts">
	import { pb } from '$lib/pb';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import TemplateBasic from '$lib/templates/TemplateBasic.svelte';
	import TemplateMemora from '$lib/templates/TemplateMemora.svelte';

	let obituary: any = null;
	let loading = true;
	let error = '';
	let showDeleteModal = false;
	let deleting = false;

	$: obituaryId = $page.params.id;

	onMount(async () => {
		if (obituaryId) {
			await loadObituary();
		}
	});

	async function loadObituary() {
		try {
			obituary = await pb.collection('obituaries').getOne(obituaryId);
			console.log('Loaded obituary:', obituary);
			
			// If there's a photo, fetch its URL
			if (obituary.photo) {
				try {
					obituary.photoUrl = await pb.files.getURL(obituary, obituary.photo);
				} catch (err) {
					console.error('Error fetching photo URL:', err);
				}
			}
		} catch (err) {
			console.error('Error loading obituary:', err);
			error = err instanceof Error ? err.message : 'Failed to load obituary';
		} finally {
			loading = false;
		}
	}

	// Create obituary object for template rendering
	$: obituaryData = obituary ? {
		firstName: obituary.first_name,
		lastName: obituary.last_name,
		birthDate: new Date(obituary.birth_date).toLocaleDateString(),
		deathDate: new Date(obituary.death_date).toLocaleDateString(),
		noticeText: obituary.notice,
		address: obituary.address,
		photo: obituary.photoUrl ? pb.files.getURL(obituary, obituary.photoUrl) : null
	} : null;

	function downloadPDF() {
		// For now, we'll use the browser's print function
		// In a real app, you'd want to use a proper PDF generation library
		window.print();
	}

	function editObituary() {
		goto(`/editor?template=${obituary.template}&edit=${obituary.id}`);
	}

	async function deleteObituary() {
    if (!confirm('Are you sure you want to delete this obituary? This action cannot be undone.')) {
        return;
    }
    try {
        deleting = true;
        await pb.collection('obituaries').delete(obituaryId);
        goto('/dashboard');
    } catch (err) {
        console.error('Error deleting obituary:', err);
        error = 'Failed to delete obituary. Please try again.';
    } finally {
        deleting = false;
    }
}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString();
	}

	function getTemplateName(templateId: string) {
		switch (templateId) {
			case 'templateBasic':
				return 'Basic Template';
			case 'templateMemora':
				return 'Memora Template';
			default:
				return templateId;
		}
	}
</script>

<svelte:head>
	<title>{obituary ? `${obituary.first_name} ${obituary.last_name} - Obituary` : 'Loading...'}</title>
</svelte:head>

<div class="max-w-7xl mx-auto p-6">
	<!-- Top Bar with Actions -->
	<div class="bg-white rounded-lg shadow-md p-6 mb-6">
		<div class="flex justify-between items-center">
			<!-- Back button -->
			<button 
				on:click={() => goto('/dashboard')}
				class="flex items-center text-gray-600 hover:text-gray-900 transition"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to Dashboard
			</button>

			<!-- Action Buttons -->
			<div class="flex space-x-3">
				<button 
						on:click={downloadPDF}
						class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center"
					>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Download PDF
				</button>

				<button 
						on:click={editObituary}
						class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center"
					>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
					Edit Obituary
				</button>

				<button 
						on:click={deleteObituary}
						class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center"
					>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					Delete Obituary
				</button>
			</div>
		</div>
	</div>

	{#if loading}
		<div class="text-center py-12">
			<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
			<p class="mt-4 text-gray-600">Loading obituary...</p>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<p class="text-red-600">Error: {error}</p>
		</div>
        {:else if obituary}
        <!-- Centered Template Preview -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Preview</h2>
            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div class="transform scale-90 origin-top-left" style="width: 111%; transform-origin: top left;">
                    {#if obituary.template === 'templateBasic'}
                        <TemplateBasic obituary={obituary} />
                    {:else if obituary.template === 'templateMemora'}
                        <TemplateMemora obituary={obituary} />
                    {:else}
                        <div class="text-center text-gray-500 py-8">
                            <p>Template not found: {obituary.template}</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {:else}
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">Obituary not found</p>
        </div>
    {/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
			<h3 class="text-lg font-semibold mb-4">Delete Obituary</h3>
			<p class="text-gray-600 mb-6">
				Are you sure you want to delete the obituary for <strong>{obituary?.first_name} {obituary?.last_name}</strong>? 
				This action cannot be undone.
			</p>
			<div class="flex space-x-3">
				<button 
					on:click={() => showDeleteModal = false}
					class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition"
					disabled={deleting}
				>
					Cancel
				</button>
				<button 
					on:click={deleteObituary}
					class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center"
					disabled={deleting}
				>
					{#if deleting}
						<div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
					{/if}
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
</div>

<style>
	@media print {
		body * {
			visibility: hidden;
		}
		.w-2\/3 *, .w-2\/3 {
			visibility: visible;
		}
		.w-1\/3 {
			display: none;
		}
	}
</style>