# NTTCom WebRTC Handson

# 1. 事前準備

### 1.1. ローカルサーバを立てる (立ってない人のみ)

- ポート番号 (以下の例では8080) は自由

#### python 2.X

```sh
$ python -m SimpleHTTPServer 8080
```

#### python 3.X

```sh
$ python -m http.server 8080
```

#### php

```sh
$ php -S localhost:8080
```

- php 5.4以上の場合、自分のIPアドレスを指定

#### Apache (Mac OS X)

```
$ sudo apachectl start
$ cd /Library/WebServer/Documents/
$ open .
```

- Finderでドキュメントルートフォルダが開く
- http://localhost/ でアクセス。

#### Windows

- Mongoose サーバ（[ダウンロード](https://cesanta.com/cgi-bin/api.cgi?act=dl&id=HHIEHJBHSK8H56TT&os=win)）がオススメ。
- ソースコードが入っているフォルダーに入れて実行

### 1.2. SkyWayの開発者登録

- 新規の方
  https://skyway.io/ds/registration
- 登録済みの方
  https://skyway.io/ds/

### 1.3. APIキーの取得とドメイン登録

- SkyWayのダッシュボードから取得
- 利用可能ドメインに `localhost` を登録

### 1.4. ソースコードをcloneまたはダウンロード

#### gitをインストール済みなら`git clone`でダウンロード (オススメ)

```
$ git clone https://github.com/skyway/webrtc-handson-js.git
```

* handsonブランチ：こちらでハンズオンを実施してください
* gh-pagesブランチ：完成版のコード（参考までに）

#### ソースコードのzipをダウンロード

https://github.com/skyway/webrtc-handson-js/archive/handson.zip

### 1.5. エディタをインストール (インストールしていない人のみ)

- [Sublime Text](https://www.sublimetext.com)
- [Atom](https://atom.io)
- [Visual Studio Code](https://code.visualstudio.com)
- [WebStorm](https://www.jetbrains.com/webstorm/)

## 2. ハンズオンを開始

### ハンズオン資料

https://github.com/skyway/webrtc-handson-js/blob/handson/webrtc-handson-js.pdf

### ヒント

- 困ったら、ステップ毎のブランチを参照
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step1
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step2
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step3
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step4
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step5
  - https://github.com/skyway/webrtc-handson-js/tree/handson_step6
- 完成したアプリのデモ
  https://skyway.github.io/webrtc-handson-js/
- SkyWay APIリファレンス
  http://nttcom.github.io/skyway/docs/
