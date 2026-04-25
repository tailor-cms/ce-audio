import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const AUDIO = path.join(__dirname, 'test.mp3');
export const DOCUMENT = path.join(__dirname, 'test-document.txt');
