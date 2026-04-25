<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div v-if="element.data.url" class="tce-audio-root">
    <audio
      ref="audio"
      :src="element.data.url"
      class="w-100"
      controls
      @seeked="handleSeeked"
      @timeupdate="handleTimeUpdate"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { debounce, throttle } from 'lodash-es';
import { onMounted, useTemplateRef } from 'vue';
import type { Element } from '@tailor-cms/ce-audio-manifest';

const PROGRESS_UPDATE_INTERVAL = 5000;
const SEEK_DEBOUNCE_INTERVAL = 300;

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits<{ interaction: [data: any] }>();

const audio = useTemplateRef<HTMLAudioElement>('audio');

const interact = () => {
  const currentTime = audio.value!.currentTime;
  const furthestTime = Math.max(
    props.userState?.furthestTime ?? 0,
    currentTime,
  );
  emit('interaction', { currentTime, furthestTime });
};
const handleTimeUpdate = throttle(interact, PROGRESS_UPDATE_INTERVAL);
const handleSeeked = debounce(interact, SEEK_DEBOUNCE_INTERVAL);

onMounted(() => {
  const currentTime = props.userState?.currentTime;
  if (!currentTime || !audio.value) return;
  audio.value.addEventListener(
    'loadedmetadata',
    () => (audio.value!.currentTime = currentTime),
    { once: true },
  );
});
</script>

<style scoped>
.tce-audio-root {
}
</style>
