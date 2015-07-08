/**
 * Created by yusuke on 2014/11/25.
 */

$(document).ready(function () {

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

    // callイベント用のハンドラを設置


    // callオブジェクトのイベントをセットする


    // ユーザリストを取得して片っ端から繋ぐ



    // コールの追加


    // コールの削除


    // VIDEO要素を追加する


    // VIDEO要素を削除する


});
