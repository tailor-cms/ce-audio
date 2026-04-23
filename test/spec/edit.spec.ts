import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { AUDIO, DOCUMENT } from '../fixtures';
import { Edit } from '../pom';

const ELEMENT_ID = 'test-audio-edit';
const AUDIO_URL = 'https://example.com/test.mp3';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('When audio is not set', () => {
  test('Shows placeholder', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.player).not.toBeVisible();
  });

  test('Can import audio via URL', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.importUrl(AUDIO_URL);
    await expect(edit.player).toBeVisible();
    await expect(edit.player).toHaveAttribute('src', AUDIO_URL);
  });

  test('Can upload audio file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(AUDIO);
    await expect(edit.player).toBeVisible();
    await expect(edit.fileInput.removeBtn).toBeVisible();
  });

  test('Rejects non-audio file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(DOCUMENT);
    await edit.fileInput.cancel();
    await expect(edit.placeholder).toBeVisible();
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
});

test.describe('Readonly mode', () => {
  test('Hides upload prompt when empty', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.focus();
    await expect(edit.placeholder).toBeVisible();
    await expect(
      edit.el.getByText('Use toolbar to upload the audio file'),
    ).not.toBeVisible();
  });

  test('Keeps player visible when set', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: AUDIO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.player).toBeVisible();
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
