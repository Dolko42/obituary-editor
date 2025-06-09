import { writable } from 'svelte/store';
import { pb } from '$lib/pb';

export const user = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	user.set(pb.authStore.model);
});
