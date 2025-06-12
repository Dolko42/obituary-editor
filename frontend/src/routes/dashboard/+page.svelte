<script lang="ts">
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let obituaries: any[] = [];
	let loading = true;
	let error = '';

    onMount(async () => {
        try {
            console.log('Auth check:', pb.authStore.isValid, pb.authStore.record);
            // Check auth first using pb authStore directly
            if (!pb.authStore.isValid) {
                console.log('Auth is not valid, redirecting to sign-up');
                goto('/sign-up');
                return;
            }

            const userId = pb.authStore.record?.id;
            console.log('User ID:', userId);
            if (!userId) {
                console.log('No user ID found, redirecting to sign-up');
                goto('/sign-up');
                return;
            }

            obituaries = await pb.collection('obituaries').getFullList({
                sort: '-created',
                filter: `created_by = "${userId}"`
            });
            console.log('Loaded obituaries:', obituaries);
        } catch (err) {
            console.error('Error loading obituaries:', {
                error: err,
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : undefined
            });
            error = err instanceof Error ? err.message : 'Failed to load obituaries';
            console.log('Auth state at error:', {
                isValid: pb.authStore.isValid,
                record: pb.authStore.record,
                userId: pb.authStore.record?.id
            });
        } finally {
            loading = false;
        }
    });

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString();
	}

	function getTemplateName(templateId: string) {
		switch (templateId) {
			case 'basic':
				return 'Basic Template';
			case 'memora':
				return 'Memora Template';
			default:
				return templateId;
		}
	}
</script>

{#if pb.authStore.isValid}
	<div class="max-w-6xl mx-auto p-6">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900">My Obituaries</h1>
			<a 
				href="/templates" 
				class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition"
			>
				Create New Obituary
			</a>
		</div>

		{#if loading}
			<div class="text-center py-12">
				<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
				<p class="mt-4 text-gray-600">Loading obituaries...</p>
			</div>
		{:else if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-4">
				<p class="text-red-600">Error: {error}</p>
			</div>
		{:else if obituaries.length === 0}
			<div class="text-center py-12">
				<div class="mb-4">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No obituaries yet</h3>
				<p class="text-gray-500 mb-6">Create your first obituary to get started.</p>
				<a 
					href="/templates" 
					class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition inline-block"
				>
					Create Obituary
				</a>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each obituaries as obituary}
					<div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
						<!-- Photo section -->
						<div class="h-32 bg-gray-100 flex items-center justify-center">
							{#if obituary.photo}
								<img 
									src={pb.files.getUrl(obituary, obituary.photo)}
									alt="Photo of {obituary.first_name}"
									class="h-full w-full object-cover"
								/>
							{:else}
								<div class="text-gray-400">
									<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
							{/if}
						</div>

					<!-- Content section -->
					<div class="p-4">
						<h3 class="text-lg font-semibold text-gray-900 mb-1">
							{obituary.first_name} {obituary.last_name}
						</h3>
						<p class="text-sm text-gray-500 mb-2">
							{formatDate(obituary.birth_date)} - {formatDate(obituary.death_date)}
						</p>
						<p class="text-xs text-gray-400 mb-3">
							Template: {getTemplateName(obituary.template_id)}
						</p>
						<p class="text-sm text-gray-600 mb-4 line-clamp-2">
							{obituary.notice.substring(0, 100)}{obituary.notice.length > 100 ? '...' : ''}
						</p>
						
						<!-- Action button -->
						<button 
							on:click={() => goto(`/dashboard/${obituary.id}`)}
							class="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md transition text-sm font-medium"
						>
							View Details
						</button>
					</div>

					<!-- Footer with creation date -->
					<div class="px-4 py-2 bg-gray-50 border-t border-gray-100">
						<p class="text-xs text-gray-400">
							Created: {formatDate(obituary.created)}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>