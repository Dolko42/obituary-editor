<script lang="ts">
    export let obituary;
  </script>
  
  <div
    class="bg-white p-6 rounded-lg shadow-md mx-auto"
    style="width: 148mm; height: 210mm; font-family: 'Inter', sans-serif;"
  >
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">
        {obituary.firstName} {obituary.lastName}
      </h1>
      <p class="text-sm text-gray-500">
        {obituary.birthDate} - {obituary.deathDate}
      </p>
    </header>
  
    <!-- Photo -->
    <div class="flex justify-center mb-6">
      {#if obituary.photoUrl}
        <img
          src={obituary.photoUrl}
          alt="Photo of {obituary.firstName}"
          class="w-32 h-32 rounded-full border-2 border-gray-200 shadow-sm"
        />
      {/if}
    </div>
  
    <!-- Notice text -->
    <section class="mb-6">
      <p class="text-gray-700 leading-relaxed whitespace-pre-line">{obituary.noticeText}</p>
    </section>
  
    <!-- Address -->
    <footer class="text-sm text-gray-500">
      <p>{obituary.address}</p>
    </footer>
  </div>
