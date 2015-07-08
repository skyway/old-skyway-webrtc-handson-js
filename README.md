## Camphor NTTCom WebRTC Handson Step 2
``` javascript
// Peerオブジェクトを生成
peer = new Peer({key: APIKEY, debug: 3});

// エラーハンドラ
peer.on('error', function(err){
    console.error(err);
});

// openイベントのハンドラ
peer.on('open', function(id) {
    myPeerid = id;
    console.log('My peer ID is: ' + id);
});
```
