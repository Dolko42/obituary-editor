<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import { templateComponents } from '$lib/templates';
    
    export let data: PageData;
    
    let TemplateComponent: any = null;
    let loadError = '';
    
    // Example obituary placeholder for preview
    let sampleObituary = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1940-01-01',
      deathDate: '2025-06-10',
      noticeText: `John was a loving husband, father, and friend. He will be dearly missed by all who knew him.`,
      address: '123 Memorial Ave, Springfield',
      photoUrl: ''
    };
    
    onMount(async () => {
      loadError = '';
      try {
        // Get template component from registry
        const componentId = data.template?.component_id;
        if (!componentId) {
          throw new Error('No component ID specified');
        }
        
        const Component = templateComponents[componentId];
        if (!Component) {
          throw new Error('Template component not found');
        }
        
        // Load the component dynamically
        TemplateComponent = (await Component()).default;
      } catch (err) {
        loadError = err instanceof Error ? err.message : 'Failed to load template component.';
      }
    });
  </script>
  
  <svelte:head>
    <title>{data.template?.name || 'Template'} - Template Preview</title>
  </svelte:head>
  
  {#if !data.template}
    <div class="p-8 max-w-4xl mx-auto">
      <p class="text-red-600 font-semibold">Template not found</p>
    </div>
  {:else}
  <div class="p-8 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <a href="/templates" class="text-purple-600 hover:text-purple-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Templates
      </a>
      <a href={`/editor/${data.template.id}`} class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
        Continue with this template
      </a>
    </div>

    <h1 class="text-3xl font-bold mb-6">{data.template.name}</h1>
    <p class="mb-6 text-gray-600">{data.template.description}</p>

    {#if loadError}
      <p class="text-red-600 font-semibold">{loadError}</p>
    {:else if TemplateComponent}
      <svelte:component this={TemplateComponent} obituary={sampleObituary} />
    {:else}
      <p>Loading template preview...</p>
    {/if}
  </div>
  {/if}