# Fold All But Comments

Folds all code blocks in the active file while keeping block-style docblock comments unfolded. Works with any language that uses `/** */` or `/* */` style documentation: PHP (PHPDoc), JavaScript/TypeScript (JSDoc), Java, C#, CSS, and more.

## Usage

**Command Palette:** `Fold All But Comments`

**Keyboard shortcut:** `Cmd+K Cmd+/` (Mac) / `Ctrl+K Ctrl+/` (Win/Linux)

**Status bar:** Click the `$(fold) Fold Comments` item in the bottom-right status bar.

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| `foldAllButComments.autoFoldOnOpen` | boolean | `false` | Automatically fold all code but keep docblocks unfolded when a file is opened. |

## How It Works

1. Runs `editor.foldAll` to collapse every foldable region.
2. Scans the document for lines that open a block comment (`/**` or `/*`).
3. Unfolds each of those lines, leaving docblock comments visible.

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch an Extension Development Host
```
