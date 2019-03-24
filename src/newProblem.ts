import * as vscode from "vscode";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

export default async function newProblem() {
  const result = await vscode.window.showInputBox({
    prompt: "어떤 문제를 푸시겠습니까? "
  });
  if (!result) {
    vscode.window.showErrorMessage("올바르지 않은 입력입니다.");
    return;
  }
  const problemId = Number(
    result.replace("https://www.acmicpc.net/problem/", "")
  );
  if (problemId < 1000 || isNaN(problemId) || !isFinite(problemId)) {
    vscode.window.showErrorMessage("올바르지 않은 입력입니다.");
    return;
  }
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage("올바르지 않은 디렉토리입니다.");
    return;
  }

  const rootPath = path.normalize(
    vscode.workspace.workspaceFolders[0].uri.path
  );

  const newProjectPath = path.join(rootPath, `${problemId}`);

  if (fs.existsSync(newProjectPath)) {
    vscode.window.showErrorMessage("이미 존재하는 디렉토리입니다.");
    return;
  }

  fs.mkdirSync(path.join(newProjectPath));

  fs.mkdirSync(path.join(newProjectPath, `test`));

  fs.copyFileSync(
    path.join(__dirname, `../templates/Makefile`),
    path.join(newProjectPath, "Makefile")
  );

  fs.copyFileSync(
    path.join(__dirname, `../templates/main.cpp`),
    path.join(newProjectPath, `main.cpp`)
  );

  const res = await axios.get(`https://www.acmicpc.net/problem/${problemId}`);
  const body = res.data;
  const $ = cheerio.load(body);
  const htmlTitle = $("title").text();

  let sampleInput = 1,
    sampleOutput = 1;
  while ($(`#sample-input-${sampleInput}`).length > 0) {
    let text = $(`#sample-input-${sampleInput}`).text();
    if (text === "") {
      ++sampleInput;
      continue;
    }
    if (!text.endsWith("\n")) {
      text += "\n";
    }
    fs.writeFileSync(
      path.join(newProjectPath, `test/${sampleInput}.input`),
      text
    );
    ++sampleInput;
  }

  while ($(`#sample-output-${sampleOutput}`).length > 0) {
    let text = $(`#sample-output-${sampleOutput}`).text();
    if (!text.endsWith("\n")) {
      text += "\n";
    }
    fs.writeFileSync(
      path.join(newProjectPath, `test/${sampleOutput}.answer`),
      text
    );
    ++sampleOutput;
  }
  const problemTitle = htmlTitle.split(": ")[1];

  const terminal = vscode.window.createTerminal({
    name: problemTitle,
    cwd: newProjectPath
  });
  terminal.show(false);

  vscode.workspace
    .openTextDocument(path.join(newProjectPath, `main.cpp`))
    .then(document => vscode.window.showTextDocument(document));

  vscode.window.showInformationMessage("✨ 작업 완료 ✨");
}
