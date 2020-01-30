// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const translate = require('translate-google');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.translatelang.ja2en', function () {
		TranslateLanguage('translate: ja -> en', 'ja', 'en');
	});

	let disposable_en2ja = vscode.commands.registerCommand('extension.translatelang.en2ja', function () {
		TranslateLanguage('translate: en -> ja', 'en', 'ja');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable_en2ja);
}

function TranslateLanguage(message, from, to){

	// Display a message box to the user
	vscode.window.showInformationMessage(message);

	let editor = vscode.window.activeTextEditor;
	let doc = editor.document;
	let cur_selection = editor.selection;

	// Selection is to select a range of all if it is empty.
	if(editor.selection.isEmpty){         
		let startPos = new vscode.Position(0, 0);
		let endPos = new vscode.Position(doc.lineCount - 1, 10000);
		cur_selection = new vscode.Selection(startPos, endPos);
	}

	let text = doc.getText(cur_selection);

	translate([text], {from: from, to: to}).then(res => {
		editor.edit(edit => {
			edit.replace(cur_selection, res[0]);
		});
	}).catch(err => {

		console.error(err);
	});
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
