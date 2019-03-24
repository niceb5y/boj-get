import * as vscode from "vscode";
import newProblem from "./newProblem";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.newProblem", newProblem)
  );
}

export function deactivate() {}
