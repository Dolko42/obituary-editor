<script lang="ts">
	import { pb } from '$lib/pb';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let mode: 'signup' | 'login' = 'signup';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let error = '';

	async function submit() {
		error = '';

		if (mode === 'signup') {
			if (password !== passwordConfirm) {
				error = "Passwords don't match.";
				return;
			}
			try {
				await pb.collection('users').create({ email, password, passwordConfirm });
				await pb.collection('users').authWithPassword(email, password);
				user.set(pb.authStore.model);
				goto('/dashboard');
			} catch (err) {
				error = err instanceof Error ? err.message : 'An unknown error occurred';
			}
		} else {
			try {
				await pb.collection('users').authWithPassword(email, password);
				user.set(pb.authStore.model);
				goto('/dashboard');
			} catch (err) {
				error = err instanceof Error ? err.message : 'An unknown error occurred';
			}
		}
	}

	function toggleMode() {
		mode = mode === 'signup' ? 'login' : 'signup';
		error = '';
	}
</script>

<div class="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
		<h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
			{mode === 'signup' ? 'Sign Up' : 'Log In'}
		</h2>

		<form on:submit|preventDefault={submit} class="space-y-4">
			<input
				type="email"
				bind:value={email}
				placeholder="Email"
				required
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
			/>

			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				required
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
			/>

			{#if mode === 'signup'}
				<input
					type="password"
					bind:value={passwordConfirm}
					placeholder="Confirm Password"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
				/>
			{/if}

			<button
				type="submit"
				class="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md text-lg font-medium transition"
			>
				{mode === 'signup' ? 'Create Account' : 'Log In'}
			</button>
		</form>

		{#if error}
			<p class="text-red-600 text-sm text-center mt-4">{error}</p>
		{/if}

		<div class="text-center mt-6 text-sm text-gray-600">
			{#if mode === 'signup'}
				Already have an account?
				<button
					on:click={toggleMode}
					type="button"
					class="ml-1 text-purple-600 hover:underline"
				>
					Log In
				</button>
			{:else}
				Don’t have an account?
				<button
					on:click={toggleMode}
					type="button"
					class="ml-1 text-purple-600 hover:underline"
				>
					Sign Up
				</button>
			{/if}
		</div>
	</div>
</div>
