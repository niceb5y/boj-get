# BOJ Get

## 용도

[BOJ](http://acmicpc.net) 문제를 풀 때 귀찮은 부분을 줄여줍니다. 입력 데이터를 일일히 입력한다던지 하는 것들을 말이죠.

## 다운로드

[여기](https://github.com/niceb5y/boj-get/releases)서 최신 릴리즈를 다운받습니다.

## 요구 사양

`Xcode Command Line Tools`가 설치된 `macOS`에서 작동이 확인되었습니다.

`build-essential`이 설치된 `Ubuntu`나 `gcc`와 `make`가 설치된 `Linux`에서는 아마도 작동할 것입니다.

`WSL`을 사용하는 `Windows`에서는 아마도 작동하지 않을 것입니다.

## 설치

`커맨드 팔레트` (Ctrl+Shift+P / ⇧⌘P) - [VSIX에서 설치...](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix)를 통해 설치합니다.

## 사용

1. 프로젝트가 저장 될 폴더 열기

2. `커맨드 팔레트` (Ctrl+Shift+P / ⇧⌘P) - `백준에서 새로운 문제 가져오기` - 문제 번호 입력

3. 알고리즘 문제 풀기

4. `make && make test`를 통해 테스트

## 라이선스

이 프로젝트의 라이선스는 [GLWTPL](https://github.com/me-shaon/GLWTPL)를 따릅니다.

행운을 빌어요.

## 소스 코드 빌드

`yarn run package`
