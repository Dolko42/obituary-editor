<script>
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
  
    const activePath = derived(page, $page => $page.url.pathname);
  </script>
  
  <nav>
    <ul>
      <li class={ $activePath === '/' ? 'active' : '' }><a href="/">Home</a></li>
      <li class={ $activePath === '/sign-up' ? 'active' : '' }><a href="/sign-up">Sign Up</a></li>
      <li class={ $activePath === '/dashboard' ? 'active' : '' }><a href="/dashboard">Dashboard</a></li>
      <li class={ $activePath === '/templates' ? 'active' : '' }><a href="/templates">Templates</a></li>
      <li class={ $activePath === '/editor' ? 'active' : '' }><a href="/editor">Editor</a></li>
      <li class={ $activePath === '/profile' ? 'active' : '' }><a href="/profile">Profile</a></li>
    </ul>
  </nav>
  
  <style>
    nav {
      background: #333;
      padding: 1rem;
    }
    ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 0; padding: 0;
    }
    a {
      color: #eee;
      text-decoration: none;
    }
    .active a {
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
  