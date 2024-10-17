<template>
  <VSheet
    class="d-flex justify-center align-center my-2 text-h6"
    height="15.5rem"
  >
    <VIcon :icon="icon" start />
    {{ name }} placeholder
  </VSheet>
</template>

<script lang="ts" setup>
defineProps<{ icon: string; name: string }>();
</script>
