<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div class="tce-audio text-left">
    <TailorElementPlaceholder
      v-if="!element.data.url && isReadonly"
      :icon="manifest.ui.icon"
      :name="`${manifest.name} component`"
      is-readonly
    />
    <TailorFileInput
      v-else
      :allowed-extensions="EXTENSIONS"
      :file-key="element.data.assets?.url || element.data.url"
      :public-url="element.data.url"
      :readonly="isReadonly"
      :show-actions="isFocused"
      mode="dropzone"
      allow-url-source
      @delete="onDelete"
      @input="save"
      @upload="save"
    >
      <audio
        :src="element.data.url ?? ''"
        class="d-block w-100"
        controls
      ></audio>
    </TailorFileInput>
  </div>
</template>

<script lang="ts" setup>
import type { Element, ElementData } from '@tailor-cms/ce-audio-manifest';
import manifest from '@tailor-cms/ce-audio-manifest';

const EXTENSIONS = ['.mp3', '.aac', '.ogg', '.wma', '.flac', '.m4a', '.wav'];

const props = defineProps<{
  element: Element;
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();
const emit = defineEmits<{ save: [data: ElementData] }>();

const save = (payload: Record<string, any> | null) => {
  if (!payload) return;
  const { url, publicUrl } = payload;
  const assets = { url };
  emit('save', { ...props.element.data, url: publicUrl ?? url, assets });
};

const onDelete = () => {
  emit('save', { ...props.element.data, url: null, assets: {} });
};
</script>
