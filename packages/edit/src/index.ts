import baseManifest from '@tailor-cms/ce-audio-manifest';
import type { ElementManifest } from '@tailor-cms/ce-audio-manifest';

import Edit from './components/Edit.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Edit,
};

export default manifest;
export { Edit };
