<script>
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
    import { user } from '$lib/stores/auth';
    import { pb } from '$lib/pb';
    import { onMount } from 'svelte';

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
          <a href="/" class="text-lg font-bold text-lavender-500 hover:text-lavender-600 transition-colors duration-200">Parte</a>
          <div class="hidden md:flex items-center gap-4">
            <li class={ $activePath === '/' ? 'active' : '' }><a class="nav-link" href="/">Home</a></li>
            <li class={ $activePath === '/dashboard' ? 'active' : '' }><a class="nav-link" href="/dashboard">Dashboard</a></li>
            <li class={ $activePath === '/templates' ? 'active' : '' }><a class="nav-link" href="/templates">Templates</a></li>
            <li class={ $activePath === '/editor' ? 'active' : '' }><a class="nav-link" href="/editor">Editor</a></li>
            <li class={ $activePath === '/profile' ? 'active' : '' }><a class="nav-link" href="/profile">Profile</a></li>
          </div>
        </div>
        <div class="flex items-center gap-4">
          {#if $user}
            <button 
              class="nav-button"
              on:click={() => pb.authStore.clear()}
              aria-label="Logout"
            >
              Logout
            </button>
          {:else}
            <a 
              href="/sign-up" 
              class="nav-button"
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
            <li class={ $activePath === '/' ? 'active' : '' }><a class="nav-link block" href="/">Home</a></li>
            <li class={ $activePath === '/dashboard' ? 'active' : '' }><a class="nav-link block" href="/dashboard">Dashboard</a></li>
            <li class={ $activePath === '/templates' ? 'active' : '' }><a class="nav-link block" href="/templates">Templates</a></li>
            <li class={ $activePath === '/editor' ? 'active' : '' }><a class="nav-link block" href="/editor">Editor</a></li>
            <li class={ $activePath === '/profile' ? 'active' : '' }><a class="nav-link block" href="/profile">Profile</a></li>
          </div>
          {#if $user}
            <button 
              class="nav-button block w-full"
              on:click={() => pb.authStore.clear()}
              aria-label="Logout"
            >
              Logout
            </button>
          {:else}
            <a 
              href="/sign-up" 
              class="nav-button block w-full"
              aria-label="Sign Up"
            >
              Sign Up
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </nav>