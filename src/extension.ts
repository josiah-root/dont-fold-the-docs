import * as vscode from 'vscode';

const EXT_ID = 'dontFoldTheDocs';

/*
 * Scans the document and returns the line number of every block-comment opener
 * that starts a docblock. Continuation and closing lines are ignored - only
 * the opening line number is needed to drive the unfold call.
 */
function findDocblockStartLines(doc: vscode.TextDocument): number[] {
	const openers: number[] = [];

	for (let i = 0; i < doc.lineCount; i++) {
		const trimmed = doc.lineAt(i).text.trimStart();

		if (trimmed.startsWith('/**') || trimmed.startsWith('/*')) {
			openers.push(i);
		}
	}

	return openers;
}

/*
 * Folds the active editor to the given level (or folds all if no level is
 * provided), then unfolds every docblock opener in a single command call.
 */
async function foldAllButComments(
	editor: vscode.TextEditor,
	level?: number,
): Promise<void> {
	if (level !== undefined) {
		await vscode.commands.executeCommand('editor.foldLevel' + level);
	} else {
		await vscode.commands.executeCommand('editor.foldAll');
	}

	const docblockLines = findDocblockStartLines(editor.document);

	if (docblockLines.length > 0) {
		await vscode.commands.executeCommand('editor.unfold', {
			selectionLines: docblockLines,
		});
	}
}

function getConfig(): vscode.WorkspaceConfiguration {
	return vscode.workspace.getConfiguration(EXT_ID);
}

function getDefaultFoldLevel(): number {
	return getConfig().get<number>('defaultFoldLevel', 2);
}

export function activate(context: vscode.ExtensionContext): void {
	// --- Status bar item ---
	const statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		100,
	);
	statusBarItem.command = `${EXT_ID}.run`;
	statusBarItem.name = "Don't Fold the Docs";
	statusBarItem.tooltip = 'Fold All But Comments';
	statusBarItem.text = '$(fold) Just the Docs';
	statusBarItem.show();

	// --- Base command (uses defaultFoldLevel) ---
	const commandDisposable = vscode.commands.registerCommand(
		`${EXT_ID}.run`,
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const prevText = statusBarItem.text;
			statusBarItem.text = '$(fold) Folded!';
			setTimeout(() => {
				statusBarItem.text = prevText;
			}, 1000);

			await foldAllButComments(editor, getDefaultFoldLevel());
		},
	);

	// --- Level-specific commands (2-7) ---
	const levelDisposables = ([2, 3, 4, 5, 6, 7] as const).map((level) =>
		vscode.commands.registerCommand(
			`${EXT_ID}.foldLevel${level}`,
			async () => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					return;
				}
				await foldAllButComments(editor, level);
			},
		),
	);

	context.subscriptions.push(
		commandDisposable,
		...levelDisposables,
		statusBarItem,
	);
}

export function deactivate(): void {
	// Nothing to clean up beyond what context.subscriptions handles.
}
