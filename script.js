/**
 * Created by yusuke on 2014/11/25.
 */

$(document).ready(function () {

    // 定数宣言
    var APIKEY = 'ad8276ac-56c9-436e-83ca-cbe9b38ec386';

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

        navigator.getUserMedia({
            audio: true,
            video: true
        }, function(stream){
            $('#myStream').prop('src', URL.createObjectURL(stream));
            myStream = stream;

            // 全ユーザと接続を行う
            connectToPeers();
        }, function(){
            console.error('getUserMedia error');
        });
    });


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

        // 相手からcloseイベントがきたらコネクションを切断して保存したcallオブジェクトを削除、対応するVIDEOS要素も削除
        call.on('close', function(){
            call.close();
            removeCall(call);
            removeVideo(call);
        });

    }

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
        var videoDom = $('<video>');
        videoDom.attr('id',call.peer);
        videoDom.prop('src',URL.createObjectURL(stream));
        videoDom.prop('autoplay', true);
        videoDom.addClass('video');

        $('.videosContainer').append(videoDom);
    }

    // VIDEO要素を削除する
    function removeVideo(call){
        $('#'+call.peer).remove();
    }

});
