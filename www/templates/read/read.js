CDctrl.read = {
    __init__: function (page_para) {
        CDctrl.read.cur_zimu = page_para.text;
        var res = {};
        res.list = CDctrl.read.check_list(CDctrl.read.cur_zimu);
        res.data=[];
        for(var i in CDdata.json){
            if(CDdata.json[i].text==CDctrl.read.cur_zimu) {
                res.data.push(CDdata.json[i]);
            }
        }

        return res;
    },
    init: function () {
        CDctrl.read.recording = false;
        CDctrl.read.obj = {};
        var a = $(".scroll-wrapper").css("height");
        var b = parseInt($(".mui-content").css("height"));
        var c = parseInt($(".content-top").css("height"));
        $(".scroll-wrapper").css("height", b - c - 44 + "px");
    },
    playRecord: function ($this) {
        console.log("要播放的", $this.data('sound') + ".mp3");
        var audio = $this.data('audio');
        $("#myAudio").attr("src", audio);
    },
    play: function ($this) {
        var idx = Number($this.data("index"));
        $("#myAudio").attr("src", CDctrl.read.record_history[idx].filePath);
    },
    remove: function ($this) {
        var btnArray = ['否', '是'];
        mui.confirm('确定要删除吗？', '提示', btnArray, function (e) {
            if (e.index == 1) {
                var idx = Number($this.data("index"));
                try{
                    var f1 = CDctrl.read.record_history[idx].filePath;
                }catch (e){
                    mui.toast("文件路径不存在");
                    return
                }
                //1.删除本地文件
                window.resolveLocalFileSystemURL('file:///storage/emulated/0/RecordMedia/', function (root) {
                    root.getFile(f1.slice(f1.lastIndexOf('/') + 1), {create: false}, function (fentry) {
                        fentry.remove(function () {
                            console.log('删除成功');
                        }, function (err) {
                            console.log('删除失败')
                        });
                    }, function (err) {
                        console.log('删除文件出错');
                    });
                }, function (err) {
                    console.log('文件夹不存在');
                });
                //2.删除stroage
                CDctrl.read.record_history.splice(idx, 1);
                CDctrl.read._setStorage("record-" + CDctrl.read.cur_zimu, CDctrl.read.record_history);
                //3.删除dom元素
                $(".record-list .record-item:eq(" + idx + ")").remove();
            } else {
                console.log("取消删除操作");
            }
        })
    },
    start_record: function ($this) {
        if (CDctrl.read.recording) {
            return
        }
        $this.css("display", "none").siblings().css("display", "block");

        console.log(window["plugins"].audioRecorderAPI);
        window["plugins"].audioRecorderAPI.record(function (msg) {
            CDctrl.read.recording = true;
            console.info("开始录音，本地路径：", msg);//输出录音保存在本地的路径
            CDctrl.read.obj = {
                filePath: msg,
                times: 0,
                record_date: 0,
            }
        }, function (err) {
            console.info("err", err);
            mui.toast("请到设置中打开录音权限");
        });
    },
    stop_record: function ($this) {
        if (!CDctrl.read.recording) {
            return
        }
        $this.css("display", "none").siblings().css("display", "block");
        CDctrl.read.recording = false;
        window["plugins"].audioRecorderAPI.stop(function (msg) {
            CDctrl.read.obj.times =CDctrl.read.format(msg);
            var now = new Date();
            var _Month=now.getMonth()+1;
            CDctrl.read.obj.record_date = now.getFullYear() + "-" + _Month + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            CDctrl.read.record_history = CDctrl.read._getStorage("record-" + CDctrl.read.cur_zimu);
            CDctrl.read.record_history.push(CDctrl.read.obj);
            CDctrl.read._setStorage("record-" + CDctrl.read.cur_zimu, CDctrl.read.record_history);
            CDctrl.read.obj = null;
            CDctrl.read.check_list(CDctrl.read.cur_zimu);
        }, function (err) {
            console.log(err);
            mui.toast('stop record failed');
        });
    },
    check_list: function () {
        CDctrl.read.record_history = CDctrl.read._getStorage("record-" + CDctrl.read.cur_zimu);
        var list = {list: CDctrl.read.record_history};
        var html = `
        <% _.each(list,function(x,i){ %>
                        <div class="record-item">
                    <div class="items">
                        <div class="contents">
                            <div class="date">
                                <span>{{x.record_date}}</span>
                                <br>
                                <span>{{x.times}}</span>
                            </div>
                            <div class="play"  data-click="play" data-index="{{i}}">
                                <img src="img/play.png" alt="" width="100%">
                            </div>
                            
                            <div class="trash" data-click="remove" data-index="{{i}}">
                                <img src="img/trash.png" alt="" width="100%">
                            </div>
                        </div>
                    </div>
                </div>
                        <% }) %>
        `;
        $(".record-list").html(CDframe._template(html, list));
        return list.list;
    },
    back: function () {
        CDctrl.read.stop_record();
        document.getElementById("myAudio").pause();
        CDpages.back();
    },

    format: function (t) {
       return _f(t);
        function _f(t) {
            var hour = 0;
            var minute = 0;
            var second = 0;

            second = t / 1000;

            if (second > 60) {
                minute = second / 60;
                second = second % 60;
            }
            if (minute > 60) {
                hour = minute / 60;
                minute = minute % 60;
            }
            var aaa=getTwoLength(hour) + ":" + getTwoLength(minute) + ":" + getTwoLength(second);
            return aaa;
        }

        function getTwoLength(data) {
            if (data < 10) {
                return "0" + Math.floor(data);
            } else {
                return "" + Math.floor(data);
            }
        }
    },

    _getStorage: function (x) {
        var storage = localStorage.getItem(x);
        if (!storage) {
            var storage_arr = [];
        } else {
            var storage_arr = JSON.parse(storage);
        }
        return storage_arr;
    },
    _setStorage: function (x, y) {
        localStorage.setItem(x, JSON.stringify(y));
    }
}

