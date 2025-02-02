// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ollama from 'ollama';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('deepChat.start', () => {
		vscode.window.showInformationMessage('Deep Seek Chat started!');
		const panel = vscode.window.createWebviewPanel(
			'deepChat',
			'Deep Seek Chat',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = getWebviewContent();

		panel.webview.onDidReceiveMessage(async (message: any) => {

			if (message.command === 'chat') {
				const userPrompt = message.text;
				let responseText = '';

				try {
					const streamResponse = await ollama.chat({
						model: 'deepseek-r1:1.5b',
						messages: [
							{ role: 'system', content: 'You are a VS code extension that allows users to connect with the greatest philosophers in history, all of your answers should be as cryptic and like a riddle as possible.' },
							{ role: 'user', content: userPrompt }
						],
						stream: true
					});

					for await (const part of streamResponse) {
						responseText += part.message.content;
						panel.webview.postMessage({ command: 'chatResponse', text: responseText });
					}
				} catch (err: any) {
					responseText = 'Error: ' + err.message;
					panel.webview.postMessage({ command: 'chatResponse', text: responseText });
				}
			}
		});
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
	return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<style>
			body { font-family: sans-serif; margin: 1rem; }
			#prompt { width: 100%; box-sizing: border-box; }
			#response { border: 1px solid #ccc; margin-top: 1rem; padding: 0.5rem; }
		</style>
	</head>
	<body>
		<h1>Deep Seek Chat</h1>
		<textarea id="prompt" rows="3" placeholder="Ask something..."></textarea><br/>
		<button id="askBtn">Ask</button>
		<div id="response"></div>

		<script>
			const vscode = acquireVsCodeApi();

			document.getElementById('askBtn').addEventListener('click', () => {
				const text = document.getElementById('prompt').value;
				console.log('Ask button clicked, sending message:', text);
				vscode.postMessage({ command: 'chat', text });
			});

			window.addEventListener('message', event => {
				const { command, text } = event.data;
				if (command === 'chatResponse') {
					document.getElementById('response').innerText = text;
				}
			});
		</script>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
