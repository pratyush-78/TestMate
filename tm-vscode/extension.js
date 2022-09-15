const vscode = require('vscode');
let { exec } = require("child_process");

/**
 * @param {vscode.ExtensionContext} context
 */
let currentTextEditor = '', f_path = '', dir_path = '', f_patharr = '', f_name = '', prblm_dir = '', prblm = '', round = '';

function activate(context) {

	let cmd = 'tm-vscode.TRYTHIS';
	let cmdhandler = () => {
		
		exec("gnome-terminal -- bash -c 'cd ~; cd ~/TestMate/; ./cf.sh'; exec bash", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		vscode.window.showInformationMessage("yo")
	};

	let cmd1 = 'tm-vscode.compile';
	let cmd1handler = () => {

		getRequirements();
		
		exec(` gnome-terminal -- bash -c 'cd ~/TestMate/; ./comp.sh ${f_name} ${prblm_dir}; read -n1 ans' exec bash `, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		x = "${file}"
		vscode.window.showInformationMessage(`compiling ${f_name}`);
		vscode.window.showInformationMessage(`dir is ${prblm_dir}`);
	}

	let cmd2 = 'tm-vscode.output';
	let cmd2handler = () => {

		getRequirements();

		exec(`gnome-terminal -- bash -c 'cd ${prblm_dir}; ./a.out < in0.txt > res.txt;echo "Your output...."; cat res.txt; echo "\nexpected output...."; cat < out0.txt; read r' exec bash`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		vscode.window.showInformationMessage("expected...")
	}

	let cmd3 = 'tm-vscode.submit'
	let cmd3handler = () => {
		
		getRequirements();

		exec(` xdg-open http://www.codeforces.com/contest/${round}/submit/${prblm}; `, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		vscode.window.showInformationMessage("submit....")
	}

	let cmd4 = 'tm-vscode.outputall'
	let cmd4handler = () => {
		
		getRequirements();

		exec(` gnome-terminal -- bash -c 'cd ~/TestMate/; ./batchoutput.sh ${f_path} ${prblm_dir}; read -n1 ans' exec bash `, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		vscode.window.showInformationMessage("all output")
	}
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tm-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('tm-vscode.helloWorld', function () {
// 		// The code you place here will be executed every time your command is executed

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from tm-vscode!');
// 	});

// 	context.subscriptions.push(disposable);
	context.subscriptions.push(vscode.commands.registerCommand(cmd, cmdhandler));
	context.subscriptions.push(vscode.commands.registerCommand(cmd1, cmd1handler));
	context.subscriptions.push(vscode.commands.registerCommand(cmd2, cmd2handler));
	context.subscriptions.push(vscode.commands.registerCommand(cmd3, cmd3handler));
	context.subscriptions.push(vscode.commands.registerCommand(cmd4, cmd4handler));
}

function getRequirements() {
	currentTextEditor = vscode.window.activeTextEditor;
	f_path = vscode.window.activeTextEditor.document.fileName;
	// dir_path = vscode.window.activeTextEditor;
	f_patharr = f_path.split('/');
	f_name = f_patharr.pop();
	prblm_dir = f_patharr.join('/');
	prblm = f_patharr.pop();
	round = f_patharr.pop();
}
// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
