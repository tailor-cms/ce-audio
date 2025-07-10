<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div v-if="element.data.url" class="tce-audio-root">
    <audio
      :src="element.data.url"
      class="w-100"
      controls
      @play="submit"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import type { Element } from '@tailor-cms/ce-audio-manifest';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits(['interaction']);

const submit = () => emit('interaction', { id: props.element.id });
</script>

<style scoped>
.tce-audio-root {
}
</style>
