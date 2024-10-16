<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div class="tce-audio">
    <VSheet
      v-if="!element.data.url"
      class="d-flex justify-center align-center my-2 text-h6"
      height="15.5rem"
    >
      <VIcon :icon="manifest.ui.icon" start />
      {{ manifest.name }} placeholder
    </VSheet>
    <div v-else class="d-flex justify-center pa-4">
      <audio :src="element.data.url" controls></audio>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-audio-manifest';
import manifest from '@tailor-cms/ce-audio-manifest';

defineEmits(['save']);
defineProps<{ element: Element; isFocused: boolean; isDisabled: boolean }>();
</script>

<style lang="scss" scoped>
.tce-audio {
  text-align: left;
}
</style>
