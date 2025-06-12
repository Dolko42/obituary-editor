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
    class="bg-white p-6 rounded-lg shadow-md mx-auto"
    style="width: 148mm; height: 210mm; font-family: 'Inter', sans-serif;"
  >
    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">
        {obituary.first_name} {obituary.last_name}
      </h1>
      <p class="text-sm text-gray-500">
        {formatDate(obituary.birth_date)} - {formatDate(obituary.death_date)}
      </p>
    </header>
  
    <!-- Photo -->
    <div class="flex justify-center mb-6">
      {#if obituary.photoUrl}
        <img
          src={obituary.photoUrl}
          alt="Photo of {obituary.first_name}"
          class="w-32 h-32 rounded-full border-2 border-gray-200 shadow-sm"
        />
      {/if}
    </div>
  
    <!-- Notice text -->
    <section class="mb-6">
      <p class="text-gray-700 leading-relaxed whitespace-pre-line">{obituary.notice}</p>
    </section>
  
    <!-- Address -->
    <footer class="text-sm text-gray-500">
      <p>{obituary.address}</p>
    </footer>
  </div>
