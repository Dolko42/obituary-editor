<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';
	import TemplateBasic from '$lib/templates/TemplateBasic.svelte';
	import TemplateMemora from '$lib/templates/TemplateMemora.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Obituary, User } from '$lib/types';

	let currentUser: User | null = null;
	let selectedTemplate: string | null = null;
	let editId: string | null = null; // Store the ID when editing

	const checkAuth = () => {
		if (!pb.authStore.isValid) {
			goto('/sign-up');
		}
	};

	checkAuth();

	onMount(async () => {
    try {
        const authUser = await pb.authStore.model;
        if (authUser) {
            currentUser = {
                id: authUser.id,
                username: authUser.username,
                email: authUser.email,
                avatar: authUser.avatar || '',
                created: authUser.created,
                updated: authUser.updated,
                verified: authUser.verified
            };
        }
    } catch (err) {
        console.error('Error getting current user:', err);
    }
    
    const templateParam = $page.url.searchParams.get('template');
    const editParam = $page.url.searchParams.get('edit');
    if (!templateParam) {
        console.error('No template parameter provided');
        goto('/templates');
        return;
    }

    // If editing, load the existing obituary
    if (editParam) {
        editId = editParam;
        try {
            const obituary = await pb.collection('obituaries').getOne(editParam);
            first_name = obituary.first_name;
            last_name = obituary.last_name;
            birth_date = new Date(obituary.birth_date).toISOString().split('T')[0];
            death_date = new Date(obituary.death_date).toISOString().split('T')[0];
            notice = obituary.notice;
            address = obituary.address;
            selectedTemplate = obituary.template;
            photoUrl = obituary.photoUrl;
        } catch (err) {
            console.error('Error loading obituary for editing:', err);
            return;
        }
    }

    selectedTemplate = templateParam;
});

	let first_name = '';
	let last_name = '';
	let birth_date = '';
	let death_date = '';
	let notice = '';
	let address = '';
	let photo: File | null = null;
	let photoUrl: string | null = null;
	let error = '';
	let success = false;

	// Handle photo preview
	function handlePhotoChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0] ?? null;
		photo = file;
		
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				photoUrl = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			photoUrl = null;
		}
	}

	// Create obituary object for template
	$: obituary = {
		id: '',
		first_name: first_name,
		last_name: last_name,
		birth_date: new Date(birth_date),
		death_date: new Date(death_date),
		created_by: currentUser || { id: '', username: '', email: '', avatar: '', created: '', updated: '', verified: false },
		created: new Date(),
		updated: new Date(),
		notice: notice,
		address: address,
		photo: photoUrl || undefined,
		template: selectedTemplate || 'templateBasic',
		slug: `${first_name.toLowerCase()}-${last_name.toLowerCase()}`.replace(/\s+/g, '-')
	} as Obituary;

	async function submit() {
		if (!currentUser) {
			error = 'Please log in to create an obituary';
			return;
		}

		error = '';
		success = false;

		try {
			// Create FormData for file upload
			const formData = new FormData();
			formData.append('first_name', first_name);
			formData.append('last_name', last_name);
			formData.append('birth_date', birth_date);
			formData.append('death_date', death_date);
			formData.append('notice', notice);
			formData.append('address', address);
			formData.append('template', selectedTemplate || 'templateBasic');
			formData.append('created_by', currentUser.id);
			formData.append('slug', `${first_name.toLowerCase()}-${last_name.toLowerCase()}`.replace(/\s+/g, '-'));
			
			if (photo) {
				formData.append('photo', photo, photo.name);
			}

			// Save to PocketBase
			let record;
			if (editId) {
				// Update existing record
				record = await pb.collection('obituaries').update(editId, formData);
				console.log('Obituary updated:', record);
			} else {
				// Create new record
				record = await pb.collection('obituaries').create(formData);
				console.log('Obituary created:', record);
			}

			if (record.id && photo) {
				const photoUrl = await pb.files.getURL(record, photo.name);
				await pb.collection('obituaries').update(record.id, { photoUrl });
			}

			success = true;
			
			// Redirect to dashboard after successful update/creation
			setTimeout(() => {
				goto('/dashboard');
			}, 1000);
			
		} catch (err) {
			console.error('Error saving obituary:', err);
			error = err instanceof Error ? err.message : 'Failed to save obituary';
		}
	}
</script>

<div class="flex max-w-6xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
	<div class="w-1/2 pr-6">
		<h2 class="text-2xl font-semibold text-center mb-6 text-gray-700">{editId ? 'Edit Obituary' : 'Create Obituary'}</h2>

		<form on:submit|preventDefault={submit} class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<input
					type="text"
					placeholder="First Name"
					bind:value={first_name}
					required
					class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
				/>

				<input
					type="text"
					placeholder="Last Name"
					bind:value={last_name}
					required
					class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<input
					type="date"
					placeholder="Birth Date"
					bind:value={birth_date}
					class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
				<input
					type="date"
					placeholder="Date of Death"
					bind:value={death_date}
					class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
					required
				/>
			</div>

			<input
				type="text"
				placeholder="Address"
				bind:value={address}
				class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
				required
			/>

			<textarea 
				bind:value={notice} 
				placeholder="Obituary Notice" 
				rows="4" 
				class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				required
			></textarea>

			<input 
				type="file" 
				accept="image/*" 
				on:change={handlePhotoChange}
				class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
			/>
			<input 
				type="hidden" 
				bind:value={selectedTemplate}
			/>
			{#if error}
				<p class="text-red-600 text-sm">{error}</p>
			{/if}

			{#if success}
				<p class="text-green-600 text-sm">{editId ? 'Changes saved successfully!' : 'Obituary created successfully!'}</p>
			{/if}
			<button type="submit" class="w-full {editId ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} hover:cursor-pointer text-white py-2 rounded-md text-lg font-medium transition">{editId ? 'Save Changes' : 'Create Obituary'}</button>
		</form>
	</div>

	<div class="w-1/2 pl-6 border-l border-gray-300">
		<h2 class="text-2xl font-semibold mb-6 text-gray-700">Template Preview</h2>

		<div class="transform scale-75 origin-top">
			{#if selectedTemplate === 'templateBasic'}
				<TemplateBasic {obituary} />
			{:else if selectedTemplate === 'templateMemora'}
				<TemplateMemora {obituary} />
			{:else}
				<div class="text-center text-gray-500 py-8">
					<p>Select a template to preview</p>
					{#if selectedTemplate}
						<p class="text-sm mt-2">Unknown template: {selectedTemplate}</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>