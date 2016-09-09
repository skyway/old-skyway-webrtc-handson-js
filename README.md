## NTTCom WebRTC Handson Step 4

``` javascript
// コールの追加
function addCall(call){
    callList.push(call);
}

// コールの削除
function removeCall(call){
    var position = callList.indexOf(call);
    if(position > 0){
        callList.splice(position,1)
    }
}

// VIDEO要素を追加する
function addVideo(call,stream){
    var videoDom = $('<video autoplay>');
    videoDom.attr('id',call.peer);
    videoDom.prop('src',URL.createObjectURL(stream));

    $('.videosContainer').append(videoDom);
}

// VIDEO要素を削除する
function removeVideo(call){
    $('#'+call.peer).remove();
}
```
