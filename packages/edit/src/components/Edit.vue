<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div class="tce-audio">
    <ElementPlaceholder
      v-if="!element.data.url"
      :icon="manifest.ui.icon"
      :name="manifest.name"
    />
    <audio v-else :src="element.data.url" class="w-100" controls></audio>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-audio-manifest';
import manifest from '@tailor-cms/ce-audio-manifest';

import ElementPlaceholder from './ElementPlaceholder.vue';

defineEmits(['save']);
defineProps<{ element: Element; isFocused: boolean; isDisabled: boolean }>();
</script>

<style lang="scss" scoped>
.tce-audio {
  text-align: left;
}
</style>
