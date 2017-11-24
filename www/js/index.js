/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    onDeviceReady: function () {
        // 手机状态栏问题
        document.body.style.width = window.screen.width + "px";

        if (cordova.platformId == 'android') {
            document.body.style.height = window.screen.height - 20 + "px";
            StatusBar.backgroundColorByHexString("#333");
        }
        else if (cordova.platformId == "ios") {
            document.body.style.height = window.screen.height - 20 + "px";
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString("#f7f7f7");
        }
        else {
            document.body.style.height = window.screen.height + "px";

        }
        CDframe.init({// 所有的组件
            words: {lazy: true},
            read: {
                lazy: true
            }
        });

        //安卓手机硬件退出问题
        var eventBackButton = function () {
            if (CDpages.get_current().page.name == 'words') {
                mui.toast("再点一次 退出");
                setTimeout(function () {
                    document.addEventListener("backbutton", eventBackButton, false);
                }, 2000);
                document.removeEventListener("backbutton", eventBackButton, false);
            } else if (CDpages.get_current().page.name == 'read') {
                CDpages.goto('words');
            } else {
                CDpages.back();
            }
        }
        document.addEventListener("backbutton", eventBackButton, false);

        CDpages.goto('words');


    }

};

app.initialize();
CDdata.json=[
    {"text":"a","sound":"啊","src":"sound/a/a1.mp3"},
    {"text":"a","sound":"挨","src":"sound/a/ai1.mp3"},
    {"text":"a","sound":"安","src":"sound/a/an1.mp3"},
    {"text":"a","sound":"凹","src":"sound/a/ao1.mp3"},
    {"text":"b","sound":"八","src":"sound/b/ba1.mp3"},
    {"text":"b","sound":"班","src":"sound/b/ban1.mp3"},
    {"text":"b","sound":"帮","src":"sound/b/bang1.mp3"},
    {"text":"b","sound":"包","src":"sound/b/bao1.mp3"},
    {"text":"b","sound":"北","src":"sound/b/bei3.mp3"},
    {"text":"c","sound":"参","src":"sound/c/can1.mp3"},
    {"text":"c","sound":"仓","src":"sound/c/cang1.mp3"},
    {"text":"c","sound":"插","src":"sound/c/cha1.mp3"},
    {"text":"c","sound":"拆","src":"sound/c/chai1.mp3"},
    {"text":"c","sound":"掺","src":"sound/c/chan1.mp3"},
    {"text":"c","sound":"常","src":"sound/c/chang2.mp3"},
    {"text":"c","sound":"潮","src":"sound/c/chao2.mp3"},
    {"text":"c","sound":"扯","src":"sound/c/che3.mp3"},
    {"text":"d","sound":"大","src":"sound/d/da4.mp3"},
    {"text":"d","sound":"带","src":"sound/d/dai4.mp3"},
    {"text":"d","sound":"担","src":"sound/d/dan1.mp3"},
    {"text":"d","sound":"当","src":"sound/d/dang1.mp3"},
    {"text":"d","sound":"刀","src":"sound/d/dao1.mp3"},
    {"text":"e","sound":"饿","src":"sound/e/e4.mp3"},
    {"text":"e","sound":"嗯","src":"sound/e/en1.mp3"},
    {"text":"e","sound":"而","src":"sound/e/er2.mp3"},
    {"text":"f","sound":"发","src":"sound/f/fa1.mp3"},
    {"text":"f","sound":"翻","src":"sound/f/fan1.mp3"},
    {"text":"f","sound":"方","src":"sound/f/fang1.mp3"},
    {"text":"f","sound":"非","src":"sound/f/fei1.mp3"},
    {"text":"f","sound":"分","src":"sound/f/fen1.mp3"},
    {"text":"f","sound":"风","src":"sound/f/feng1.mp3"},
    {"text":"g","sound":"盖","src":"sound/g/gai4.mp3"},
    {"text":"g","sound":"杠","src":"sound/g/gang4.mp3"},
    {"text":"g","sound":"告","src":"sound/g/gao4.mp3"},
    {"text":"g","sound":"哥","src":"sound/g/ge1.mp3"},
    {"text":"g","sound":"跟","src":"sound/g/gen1.mp3"},
    {"text":"h","sound":"哈","src":"sound/h/ha1.mp3"},
    {"text":"h","sound":"韩","src":"sound/h/han2.mp3"},
    {"text":"h","sound":"孩","src":"sound/h/hai2.mp3"},
    {"text":"h","sound":"和","src":"sound/h/he2.mp3"},
    {"text":"h","sound":"豪","src":"sound/h/hao2.mp3"},
    {"text":"j","sound":"及","src":"sound/j/ji2.mp3"},
    {"text":"j","sound":"家","src":"sound/j/jia1.mp3"},
    {"text":"j","sound":"间","src":"sound/j/jian1.mp3"},
    {"text":"j","sound":"姜","src":"sound/j/jiang1.mp3"},
    {"text":"j","sound":"交","src":"sound/j/jiao1.mp3"},
    {"text":"j","sound":"接","src":"sound/j/jie1.mp3"},
    {"text":"j","sound":"金","src":"sound/j/jin1.mp3"},
    {"text":"j","sound":"究","src":"sound/j/jiu1.mp3"},
    {"text":"k","sound":"科","src":"sound/k/ke1.mp3"},
    {"text":"k","sound":"抠","src":"sound/k/kou1.mp3"},
    {"text":"k","sound":"坤","src":"sound/k/kun1.mp3"},
    {"text":"k","sound":"空","src":"sound/k/kong1.mp3"},
    {"text":"k","sound":"康","src":"sound/k/kang1.mp3"},
    {"text":"l","sound":"乐","src":"sound/l/le4.mp3"},
    {"text":"l","sound":"路","src":"sound/l/lu4.mp3"},
    {"text":"l","sound":"论","src":"sound/l/lun4.mp3"},
    {"text":"l","sound":"浪","src":"sound/l/lang4.mp3"},
    {"text":"m","sound":"麻","src":"sound/m/ma2.mp3"},
    {"text":"m","sound":"蛮","src":"sound/m/man2.mp3"},
    {"text":"m","sound":"忙","src":"sound/m/mang2.mp3"},
    {"text":"m","sound":"萌","src":"sound/m/meng2.mp3"},
    {"text":"n","sound":"那","src":"sound/n/na4.mp3"},
    {"text":"n","sound":"难","src":"sound/n/nan4.mp3"},
    {"text":"n","sound":"闹","src":"sound/n/nao4.mp3"},
    {"text":"n","sound":"囊","src":"sound/n/nang2.mp3"},
    {"text":"n","sound":"能","src":"sound/n/neng2.mp3"},

];