# @tailor-cms/ce-audio-edit

Authoring component for the **Audio** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Renders the element inside the Tailor authoring interface, where content is created and edited.

## Installation

```sh
npm install @tailor-cms/ce-audio-edit
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import { Edit } from '@tailor-cms/ce-audio-edit';
```

## Element

| Property | Value |
| --- | --- |
| Name | Audio |
| Type | `AUDIO` |
| Icon | [`mdi-volume-high`](https://pictogrammers.com/library/mdi/) |
| Composite | No |

## Packages

This element ships as four packages, published together from the
[`ce-audio`](https://github.com/tailor-cms/ce-audio) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-audio-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-audio-manifest) | Shared element definition |
| [`@tailor-cms/ce-audio-edit`](https://www.npmjs.com/package/@tailor-cms/ce-audio-edit) | Authoring component |
| [`@tailor-cms/ce-audio-display`](https://www.npmjs.com/package/@tailor-cms/ce-audio-display) | End-user component |
| [`@tailor-cms/ce-audio-server`](https://www.npmjs.com/package/@tailor-cms/ce-audio-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
