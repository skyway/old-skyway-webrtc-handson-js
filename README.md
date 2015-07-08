## Camphor NTTCom WebRTC Handson Step 1
``` javascript
// 定数宣言
var APIKEY = 'XXXX-XXXX-XXXX-XXXX';

// グローバル変数
var callList = [];
var myPeerid = '';
var myStream = null;
var peer = null;

// getUserMediaのcompatibility
navigator.getUserMedia =  navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
```
