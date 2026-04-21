# Audio

Audio content element with file upload support.

**Type:** `AUDIO`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `url` | `string \| null` | Public audio URL |
| `assets` | `{ url?: string }` | Storage asset reference |

## Edit

- Audio preview with native HTML5 controls
- Upload button in top toolbar (MP3, MP4, AAC, OGG, WMA, FLAC, M4A, WAV) with URL source support

## Display

- Renders the audio with native HTML5 controls
- Emits `interaction` event on play

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
