<script lang="ts">
    export let obituary;

    // Format date as DD. MM. YYYY or return empty string if date is invalid
    const formatDate = (dateString: string): string => {
      if (!dateString || dateString === '') return '';
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return '';
      return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
    };
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
        {obituary.first_name} {obituary.last_name}
      </h2>
    </header>
  
    <!-- Photo and dates -->
    <div class="flex flex-col items-center mb-8">
      {#if obituary.photoUrl}
        <img
          src={obituary.photoUrl}
          alt="Photo of {obituary.first_name}"
          class="w-40 h-48 object-cover rounded-lg shadow-md mb-4 border-4 border-lavender-300"
        />
      {/if}
  
      <p class="text-lg">
        <span class="font-semibold">Born:</span> {formatDate(obituary.birth_date)}
      </p>
      <p class="text-lg">
        <span class="font-semibold">Died:</span> {formatDate(obituary.death_date)}
      </p>
    </div>
  
    <!-- Notice text -->
    <section class="mb-8 px-6">
      <p class="text-base leading-relaxed whitespace-pre-line">{obituary.notice}</p>
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
  