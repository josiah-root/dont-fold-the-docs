# Don't Fold The Comments

Folds all code blocks in the active file while keeping block-style docblock comments unfolded. Works with any language that uses `/** */` or `/* */` style documentation: PHP (PHPDoc), JavaScript/TypeScript (JSDoc), Java, C#, CSS, and more.

## Usage

**Command Palette:**

- `Fold All But Comments` — Uses the default fold level
- `Fold All But Comments to Level 2-7` — Fold to a specific level

**Keyboard shortcuts:**

| Command               | Mac           | Windows/Linux   |
| --------------------- | ------------- | --------------- |
| Fold All But Comments | `Cmd+K Cmd+/` | `Ctrl+K Ctrl+/` |
| Fold to Level 2       | `Cmd+K Cmd+2` | `Ctrl+K Ctrl+2` |
| Fold to Level 3       | `Cmd+K Cmd+3` | `Ctrl+K Ctrl+3` |
| Fold to Level 4       | `Cmd+K Cmd+4` | `Ctrl+K Ctrl+4` |
| Fold to Level 5       | `Cmd+K Cmd+5` | `Ctrl+K Ctrl+5` |
| Fold to Level 6       | `Cmd+K Cmd+6` | `Ctrl+K Ctrl+6` |
| Fold to Level 7       | `Cmd+K Cmd+7` | `Ctrl+K Ctrl+7` |

## Settings

| Setting                            | Type   | Default | Description                                                                                  |
| ---------------------------------- | ------ | ------- | -------------------------------------------------------------------------------------------- |
| `dontFoldTheDocs.defaultFoldLevel` | number | `2`     | The fold level used by the base command (2-7). Corresponds to VS Code's fold level commands. |

## How It Works

1. Executes the fold level command to collapse code to the specified level.
2. Scans the document for lines that open a block comment (`/**` or `/*`).
3. Unfolds each of those lines, leaving docblock comments visible.

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch an Extension Development Host
```
