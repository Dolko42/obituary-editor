<script lang="ts">
    export let obituary;
  </script>
  
  <div
    class="bg-white text-gray-800 p-8 rounded-lg shadow-lg mx-auto"
    style="width: 148mm; height: 210mm; font-family: 'Georgia', serif;"
  >
    <!-- Header -->
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-lavender-700 mb-1">
        In Loving Memory
      </h1>
      <h2 class="text-xl text-lavender-500 italic">
        {obituary.firstName} {obituary.lastName}
      </h2>
    </header>
  
    <!-- Photo and dates -->
    <div class="flex flex-col items-center mb-8">
      {#if obituary.photoUrl}
        <img
          src={obituary.photoUrl}
          alt="Photo of {obituary.firstName}"
          class="w-40 h-48 object-cover rounded-lg shadow-md mb-4 border-4 border-lavender-300"
        />
      {/if}
  
      <p class="text-lg">
        <span class="font-semibold">Born:</span> {obituary.birthDate}
      </p>
      <p class="text-lg">
        <span class="font-semibold">Died:</span> {obituary.deathDate}
      </p>
    </div>
  
    <!-- Notice text -->
    <section class="mb-8 px-6">
      <p class="text-base leading-relaxed whitespace-pre-line">{obituary.noticeText}</p>
    </section>
  
    <!-- Address -->
    <footer class="text-center text-sm text-gray-600">
      {obituary.address}
    </footer>
  </div>
  
  <style>
    :global(.text-lavender-700) {
      color: #6b46c1; /* Lavender shade */
    }
    :global(.text-lavender-500) {
      color: #9f7aea;
    }
    :global(.border-lavender-300) {
      border-color: #d6bcfa;
    }
  </style>
  