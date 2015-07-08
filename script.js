/**
 * Created by yusuke on 2014/11/25.
 */

$(document).ready(function () {

    // 定数宣言
    const APIKEY = 'ad8276ac-56c9-436e-83ca-cbe9b38ec386';

    // グローバル変数
    var userList = [];
    var myPeerid = '';
    var myStream = null;
    var peer = null;

    // getUserMediaのcompatibility
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Peerオブジェクトを生成
    peer = new Peer({key: APIKEY, debug: 3});

    // openイベントのハンドラ
    peer.on('open', function(id) {

        myPeerid = id;
        console.log('My peer ID is: ' + id);

        // getUserMediaで自身のカメラ映像、音声を取得する
        _getUserMedia(function(stream){
            $('#myStream').prop('src', URL.createObjectURL(stream));
            $('#myStream').css('width','100%');
            myStream = stream;

            // カメラ映像、音声が取得できたらcallイベント用のハンドラを設置
            peer.on('call', function(call) {

                // 相手からcallイベントがきたらstreamを送り返す（応答する）
                call.answer(stream);

                // callオブジェクトのイベントをセット
                _callEvents(call);

                // 接続先毎のcallオブジェクトをマルチパーティ管理用に保存
                _addUserList(call);

            });

            // 全ユーザと接続を行う
            _createConnections();

        });

    });

    // エラーハンドラ
    peer.on('error', function(err){
        console.log(err);
    });

    function _getUserMedia(callback) {
        navigator.getUserMedia({
            audio: true,
            video: {
                mandatory: {
                    maxWidth:200,
                    maxHeight:200
                },
                optional: [
                    {
                        maxFrameRate: 5
                    }]
            }

        }, function(stream){
            callback(stream);

        }, function(){
            console.log('getUserMedia error');

        });
    }

    // ユーザリストを取得して片っ端から繋ぐ
    function _createConnections() {
        peer.listAllPeers(function(list){
            for(var cnt = 0;cnt < list.length;cnt++){
                if(myPeerid != list[cnt]){
                    var _call = peer.call(list[cnt],myStream);
                    _callEvents(_call);
                    _addUserList(_call);
                }
            }
        });
    }

    // callオブジェクトのイベントをセットする
    function _callEvents(call){
        // 相手からstreamイベンがきたらそのstreamをVIDEO要素に表示する
        call.on('stream', function(stream){
            _addVideoDom(call,stream);
        });

        // 相手からcloseイベントがきたらコネクションを切断して保存したcallオブジェクトを削除、対応するVIDEOS要素も削除
        call.on('close', function(){
            call.close();
            _removeUserList(call);
            _removeVideoDom(call);
        });

    }

    // ユーザリストの保存
    function _addUserList(call){
        userList.push(call);

    }

    // ユーザリストの削除
    function _removeUserList(call){
        var _position = userList.indexOf(call);
        if(_position > 0){
            userList.splice(_position,1)
        }
    }

    // VIDEO要素を追加する
    function _addVideoDom(call,stream){
        var _videoDom = $('<video>');
        _videoDom.attr('id',call.peer);
        _videoDom.prop('src',URL.createObjectURL(stream));
        _videoDom.prop('autoplay', true);
        _videoDom.addClass('video');

        $('.videosContainer').append(_videoDom);
        _resizeDom();

    }

    // VIDEO要素を削除する
    function _removeVideoDom(call){
        $('#'+call.peer).remove();
        _resizeDom();

    }

    // VIDEO要素のサイズを調整する
    function _resizeDom(){
        var _baseW = 100;
        var _baseH = 100;
        var _width = 100;
        var _height = 100;

        var _nodes = $('.videosContainer').children();
        var _width = _baseW / _nodes.length;
        var _height = _baseH / _nodes.length;

        for(var i=0; i < _nodes.length; i++){
            if(_width >= 25){
                $(_nodes[i]).css('width',_width+'%');
            }else{
                $(_nodes[i]).css('width','25%');
            }
        }

    }

});
