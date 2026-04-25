import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly placeholder: Locator;
  readonly player: Locator;
  readonly fileInput: pom.FileInput;

  constructor(page: Page) {
    super(page);
    this.placeholder = this.editor.getByText('Audio component');
    this.player = this.editor.locator('audio');
    this.fileInput = new pom.FileInput(this.el);
  }
}
