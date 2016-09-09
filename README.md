## NTTCom WebRTC Handson Step 5

``` javascript
// callイベント用のハンドラを設置
peer.on('call', function(call) {
    // 相手からcallイベントがきたらstreamを送り返す（応答する）
    call.answer(myStream);

    // callオブジェクトのイベントをセット
    setupCallEventHandlers(call);

    // 接続先毎のcallオブジェクトをマルチパーティ管理用に保存
    addCall(call);

});

// callオブジェクトのイベントをセットする
function setupCallEventHandlers(call){
    // 相手からstreamイベンがきたらそのstreamをVIDEO要素に表示する
    call.on('stream', function(stream){
        addVideo(call,stream);
    });

    // 相手からcloseイベントがきたらコネクションを切断して保存した
        // callオブジェクトを削除、対応するVIDEOS要素も削除
        call.on('close', function(){
        call.close();
        removeCall(call);
        removeVideo(call);
    });

}
```
