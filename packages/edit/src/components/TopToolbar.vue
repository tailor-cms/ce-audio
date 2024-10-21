<template>
  <div class="align-center justify-center">
    <UploadBtn
      :extensions="EXTENSIONS.join(', ')"
      :label="!element.data.url ? 'Upload audio' : 'Replace audio'"
      @upload="upload"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-audio-manifest';

import UploadBtn from './UploadBtn.vue';

const EXTENSIONS = [
  '.mp3',
  '.mp4',
  '.aac',
  '.ogg',
  '.wma',
  '.flac',
  '.m4a',
  '.wav',
];

const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save']);

const upload = ({ url }: { key: string; url: string }) => {
  const assets = { url };
  emit('save', { ...props.element.data, assets });
};
</script>

<style scoped></style>
