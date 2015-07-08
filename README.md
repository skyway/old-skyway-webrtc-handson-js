## Camphor NTTCom WebRTC Handson Step 6

```
// openイベントのハンドラ
peer.on('open', function(id) {
    myPeerid = id;
    console.log('My peer ID is: ' + id);

    // カメラ映像を取得して表示する
    navigator.getUserMedia({
        audio: true,
        video: true
    }, function(stream){
        $('#myStream').prop('src', URL.createObjectURL(stream));
        myStream = stream;
    }, function(){
        console.error('getUserMedia error');
    });
});

// ユーザリストを取得して片っ端から繋ぐ
function connectToPeers() {
    peer.listAllPeers(function(list){
        for(var cnt = 0;cnt < list.length;cnt++){
            if(myPeerid != list[cnt]){
            var call = peer.call(list[cnt],myStream);
            setupCallEventHandlers(call);
                addCall(call);
            }
        }
    });
}
```
