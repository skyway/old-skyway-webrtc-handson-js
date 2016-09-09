## NTTCom WebRTC Handson Step 3

``` javascript
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
```
