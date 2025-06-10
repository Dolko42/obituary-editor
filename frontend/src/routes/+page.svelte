<script>
    import { pb } from '$lib/pb';
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to Memora</h1>
        <p class="text-gray-600 mb-8">Create beautiful and meaningful obituaries for your loved ones.</p>

        {#if pb.authStore.model}
            <a href="/dashboard" class="nav-button">
                <button
                    type="submit"
                    class="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-medium transition shadow-sm hover:shadow-md"
                >
                    Go to Dashboard
                </button>
            </a>
        {:else}
            <a href="/sign-up" class="nav-button">
                <button
                    type="submit"
                    class="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-medium transition shadow-sm hover:shadow-md"
                >
                    Create Account
                </button>
            </a>
        {/if}
    </div>
</div>