<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { user } from '$lib/stores/auth';
  import { pb } from '$lib/pb';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let menuOpen = false;
  
  const activePath = derived(page, $page => $page.url.pathname);
  
  onMount(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        menuOpen = false;
      }
    });
  });
</script>

<nav class="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-lg">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center gap-4">
        <a href="/" class="text-lg font-bold text-fuchsia-500 hover:text-fuchsia-600 transition-colors duration-200">Memora</a>
        <div class="hidden md:flex items-center gap-4">
          <a 
            href="/" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Home
          </a>
          <a 
            href="/dashboard" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/dashboard' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Dashboard
          </a>
          <a 
            href="/templates" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/templates' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Templates
          </a>
          <a 
            href="/editor" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/editor' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Editor
          </a>
          <a 
            href="/profile" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/profile' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Profile
          </a>
        </div>
      </div>
      <div class="flex items-center gap-4">
        {#if $user}
          <button 
            class="px-4 py-2 bg-fuchsia-100 text-fuchsia-500 rounded-md hover:bg-fuchsia-200 hover:cursor-pointer transition-colors duration-200"
            on:click={() => {
              pb.authStore.clear();
              goto('/sign-up');
            }}
            aria-label="Logout"
          >
            Logout
          </button>
        {:else}
          <a 
            href="/sign-up" 
            class="px-4 py-2 bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-600 hover:cursor-pointer transition-colors duration-200"
            aria-label="Sign Up"
          >
            Sign Up
          </a>
        {/if}
        <button 
          class="md:hidden"
          on:click={() => menuOpen = !menuOpen}
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if menuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    {#if menuOpen}
      <div class="md:hidden mt-4">
        <div class="space-y-2">
          <a 
            href="/" 
            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Home
          </a>
          <a 
            href="/dashboard" 
            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/dashboard' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Dashboard
          </a>
          <a 
            href="/templates" 
            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/templates' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Templates
          </a>
          <a 
            href="/editor" 
            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/editor' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Editor
          </a>
          <a 
            href="/profile" 
            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$activePath === '/profile' ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50'}"
          >
            Profile
          </a>
        </div>
        {#if $user}
          <button 
            class="block w-full px-4 py-2 bg-fuchsia-200 text-white rounded-md hover:bg-fuchsia-300 transition-colors duration-200"
            on:click={() => {
              pb.authStore.clear();
              goto('/sign-up');
            }}
            aria-label="Logout"
          >
            Logout
          </button>
        {:else}
          <a 
            href="/sign-up" 
            class="block w-full px-4 py-2 bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-600 active:bg-fuchsia-700 transition-colors duration-200 text-center"
            aria-label="Sign Up"
          >
            Sign Up
          </a>
        {/if}
      </div>
    {/if}
  </div>
</nav>