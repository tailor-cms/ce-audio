import type {
  BeforeDisplayHook,
  HookMap,
  OnUserInteractionHook,
  ServerModule,
} from '@tailor-cms/cek-common';
import { initState, type } from '@tailor-cms/ce-audio-manifest';
import type { Element } from '@tailor-cms/ce-audio-manifest';

// Detect if hooks are running in CEK (used for mocking end-system runtime)
const IS_CEK = process.env.CEK_RUNTIME;
// Don't use in production, use only when IS_CEK=true
const USER_STATE: Record<string, any> = {};

export const beforeDisplay: BeforeDisplayHook<Element> = (
  _element,
  context,
) => {
  return { ...context, ...USER_STATE };
};

export const onUserInteraction: OnUserInteractionHook<Element> = (
  _element,
  _context,
  payload,
) => {
  const { currentTime, furthestTime } = payload;
  if (IS_CEK) {
    USER_STATE.currentTime = currentTime;
    USER_STATE.furthestTime = Math.max(
      USER_STATE.furthestTime ?? 0,
      furthestTime,
    );
  }
  return { updateDisplayState: true };
};

export const hookMap: HookMap<Element> = new Map(
  Object.entries({
    onUserInteraction,
    beforeDisplay,
  }),
);

const serverModule: ServerModule<Element> = {
  type,
  initState,
  hookMap,
  onUserInteraction,
  beforeDisplay,
};

export default serverModule;

export { type, initState };
