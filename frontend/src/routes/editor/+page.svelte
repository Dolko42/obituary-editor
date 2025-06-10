<script lang="ts">
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';

	let first_name = '';
	let last_name = '';
	let birth_date = '';
	let death_date = '';
	let notice = '';
	let address = '';
	let template_id = '';
	let photo: File | null = null;
	let error = '';
	let success = false;

	async function submit() {
		error = '';
		success = false;

		try {
			const formData = new FormData();
			formData.append('first_name', first_name);
			formData.append('last_name', last_name);
			formData.append('birth_date', birth_date);
			formData.append('death_date', death_date);
			formData.append('notice', notice);
			formData.append('address', address);
			formData.append('template_id', template_id);
			if (photo) formData.append('photo', photo);

			await pb.collection('obituaries').create(formData);

			success = true;
			goto('/dashboard'); // optional redirect
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error';
		}
	}
</script>

<div class="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
	<h2 class="text-2xl font-semibold text-center mb-6 text-gray-700">Create Obituary</h2>

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

		<textarea bind:value={notice} placeholder="Obituary Notice" rows="4" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required></textarea>

		<!-- Template selector (if dynamic) -->
		<input type="text" bind:value={template_id} placeholder="Template ID" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />

		<input type="file" accept="image/*" on:change={(e) => {
			const target = e.target as HTMLInputElement;
			photo = target.files?.[0] ?? null;
		}} class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />

		{#if error}
			<p class="text-red-600 text-sm">{error}</p>
		{/if}

		{#if success}
			<p class="text-green-600 text-sm">Obituary created successfully!</p>
		{/if}

		<button type="submit" class="w-full bg-purple-500 hover:bg-purple-600 hover:cursor-pointer text-white py-2 rounded-md text-lg font-medium transition">
			Submit
		</button>
	</form>
</div>
