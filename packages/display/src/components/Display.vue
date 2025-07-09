<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div v-if="data.url" class="tce-audio-root">
    <audio :src="data.url" class="w-100" controls @play="submit"></audio>
  </div>
</template>

<script setup lang="ts">
import type { ElementData } from '@tailor-cms/ce-audio-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const submit = () => emit('interaction', { id: props.id });
</script>
