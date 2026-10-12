import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { AUDIO, DOCUMENT } from '../fixtures';
import { Edit } from '../pom';

const ELEMENT_ID = 'test-audio-edit';
const AUDIO_URL = 'https://example.com/test.mp3';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await elementClient.resetState(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('When audio is not set', () => {
  test('Shows dropzone as empty state', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.fileInput.dropzone).toBeVisible();
    await expect(edit.placeholder).not.toBeVisible();
    await expect(edit.player).not.toBeVisible();
  });

  test('Can import audio via URL', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.openUrlFromDropzone();
    await edit.fileInput.importUrl(AUDIO_URL);
    await expect(edit.player).toBeVisible();
    await expect(edit.player).toHaveAttribute('src', AUDIO_URL);
  });

  test('Can upload audio file via dropzone', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.dropzoneUpload(AUDIO);
    await expect(edit.player).toBeVisible();
    await expect(edit.fileInput.dropzone).not.toBeVisible();
    await edit.fileInput.expectFile('test.mp3');
  });

  test('Rejects non-audio file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.dropzoneUpload(DOCUMENT);
    await expect(edit.fileInput.dropzone).toBeVisible();
    await expect(edit.player).not.toBeVisible();
  });
});

test.describe('When audio is set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: AUDIO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Shows player with src', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.player).toBeVisible();
    await expect(edit.player).toHaveAttribute('src', AUDIO_URL);
  });

  test('Can remove audio', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.removeFromRow();
    await expect(edit.player).not.toBeVisible();
    await expect(edit.fileInput.dropzone).toBeVisible();
  });
});

test.describe('Readonly mode', () => {
  test('Shows placeholder instead of dropzone when empty', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.fileInput.dropzone).not.toBeVisible();
  });

  test('Keeps player visible and hides file actions when set', async ({
    page,
  }) => {
    await elementClient.update(ELEMENT_ID, { url: AUDIO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.focus();
    await expect(edit.player).toBeVisible();
    await expect(edit.fileInput.replaceBtn).not.toBeVisible();
  });
});
