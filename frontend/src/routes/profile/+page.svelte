<script lang="ts">
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let user: any = null;
	let loading = true;
	let error = '';

	const loadProfile = async () => {
		try {
			if (!pb.authStore.isValid) {
				goto('/sign-up');
				return;
			}

			const userId = pb.authStore.record?.id;
			if (!userId) {
				goto('/sign-up');
				return;
			}

			const userData = await pb.collection('users').getOne(userId);
			console.log('Loaded user profile:', userData);
			user = userData;
		} catch (err) {
			console.error('Error loading profile:', err);
			error = err instanceof Error ? err.message : 'Failed to load profile';
		} finally {
			loading = false;
		}
	};

	onMount(loadProfile);
</script>

<h1>Profile</h1>

<div class="p-4">
	<p>Manage your profile settings here</p>
</div>