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
				if (err instanceof Error) {
					error = err.message;
				} else {
					error = 'An unknown error occurred';
				}
			}
		} else {
			try {
				await pb.collection('users').authWithPassword(email, password);
				user.set(pb.authStore.model);
				goto('/dashboard');
			} catch (err) {
				if (err instanceof Error) {
					error = err.message;
				} else {
					error = 'An unknown error occurred';
				}
			}
		}
	}

	function toggleMode() {
		mode = mode === 'signup' ? 'login' : 'signup';
		error = '';
	}
</script>

<h2>{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>

<form on:submit|preventDefault={submit}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />

	{#if mode === 'signup'}
		<input type="password" bind:value={passwordConfirm} placeholder="Confirm Password" required />
	{/if}

	<button type="submit">{mode === 'signup' ? 'Create Account' : 'Log In'}</button>
</form>

{#if error}
	<p style="color:red">{error}</p>
{/if}

<p>
	{#if mode === 'signup'}
		Already have an account?
		<button on:click={toggleMode} type="button">Log In</button>
	{:else}
		Don’t have an account?
		<button on:click={toggleMode} type="button">Sign Up</button>
	{/if}
</p>
