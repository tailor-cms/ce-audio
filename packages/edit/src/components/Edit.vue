<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div class="tce-audio">
    <ElementPlaceholder
      v-if="!element.data.url"
      :icon="manifest.ui.icon"
      :is-disabled="isReadonly"
      :is-focused="isFocused"
      :name="`${manifest.name} component`"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the audio file"
    />
    <audio v-else :src="element.data.url" class="w-100" controls></audio>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-audio-manifest';
import { ElementPlaceholder } from '@tailor-cms/core-components';
import manifest from '@tailor-cms/ce-audio-manifest';

defineProps<{
  element: Element;
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();
defineEmits(['save']);
</script>

<style lang="scss" scoped>
.tce-audio {
  text-align: left;
}
</style>
