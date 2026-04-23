import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Display } from '../pom';

const ELEMENT_ID = 'test-audio-display';
const AUDIO_URL = 'https://example.com/test.mp3';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Empty state', () => {
  test('Renders placeholder when content is empty', async ({ page }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
    await expect(display.root).not.toBeVisible();
  });
});

test.describe('Content rendering', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: AUDIO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Renders audio player with src', async ({ page }) => {
    const display = new Display(page);
    await expect(display.player).toBeVisible();
    await expect(display.player).toHaveAttribute('src', AUDIO_URL);
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
