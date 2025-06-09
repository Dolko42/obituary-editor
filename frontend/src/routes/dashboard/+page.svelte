<script>
	import { pb } from '$lib/pb';
	import { redirect } from '@sveltejs/kit';

	export const load = async () => {
		if (!pb.authStore.isValid) {
			throw redirect(302, '/signup');
		}
	};
</script>

<h1>Dashboard</h1>

<div class="p-4">
	<p>Welcome to your dashboard!</p>
</div>