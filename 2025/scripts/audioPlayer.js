var imageTracker = 'playImage';
//set events handlers for on click
document.getElementById("swapImage").onclick = function () {
    swapImage();
    playPause();
};
document.getElementById("stopImage").onclick = function () {
    stop();
}
document.getElementById("nextImage").onclick = function () {
    forward();
}
document.getElementById("backImage").onclick = function () {
    backward();
}

//hadlers
var swapImage = function () {
    var image = document.getElementById('swapImage');
    if (imageTracker == 'playImage') {
        image.src = 'img/song-on.gif';
        imageTracker = 'stopImage';
    } else {
        image.src = 'img/song1.png';
        imageTracker = 'playImage';
    }
};

//playing flag 
var musicTracker = 'noMusic';
//playlist audios
var audios = [];
$(".song").each(function () {
    var load = new Audio($(this).attr("url"));
    load.load();
    load.addEventListener('ended', function () {
        forward();
    });
    audios.push(load);
});
//active track
var activeTrack = 0;


var playPause = function () {
    if (musicTracker == 'noMusic') {
        audios[activeTrack].play();
        musicTracker = 'playMusic';
    } else {
        audios[activeTrack].pause();
        musicTracker = 'noMusic';
    }
    showPlaying();
};

var stop = function () {
    if (musicTracker == 'playMusic') {
        audios[activeTrack].pause();
        audios[activeTrack].currentTime = 0;
        audios[activeTrack].play();
    } else {
        audios[activeTrack].currentTime = 0;
    }
};

var forward = function () {
    function increment() {
        if (activeTrack < audios.length - 1)
            activeTrack++;
        else activeTrack = 0;
    }
    if (musicTracker == 'playMusic') {
        audios[activeTrack].pause();
        audios[activeTrack].currentTime = 0;
        increment();
        audios[activeTrack].play();
    } else {
        increment();
    }
    showPlaying();
};

var backward = function () {
    function decrement() {
        if (activeTrack > 0)
            activeTrack--;
        else activeTrack = audios.length - 1;
    }
    if (musicTracker == 'playMusic') {
        audios[activeTrack].pause();
        audios[activeTrack].currentTime = 0;
        decrement();
        audios[activeTrack].play();
    } else {
        decrement();
    }
    showPlaying();
};

var showPlaying = function () {
    var src = audios[activeTrack].src;
    $(".song").removeClass("playing");
    $("div[url='" + src + "']").addClass("playing");
    console.log($("div[url='" + src + "']"));
};

$(document).ready(function () {

    // 4.8s loading结束后，弹出提示
    setTimeout(function () {
        Swal.fire({
            title: 'Do you want to play music?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false,
            allowEscapeKey: false,
            backdrop: 'rgba(0,0,0,0.6)',
        }).then((result) => {

            // 用户选择后，淡入 + 动画启动
            startBirthdayAnimation(result.isConfirmed);
        });

        $("#bootSection").fadeOut(); // 隐藏 loading

    }, 4300);
});


function startBirthdayAnimation(playMusic) {

    // 1. 图片和文字淡入
    $("#birthdayImg, #code").css("opacity", "1");

    // 2. 启动图片下落动画
    $("#birthdayImg").css({
        'animation': 'drop 10s forwards'
    });

    // 3. 启动打字机效果
    $("#code").typewriter();

    // 4. 播放音乐（如果选择 Yes）
    if (playMusic) {
        try {
            audios[activeTrack].play();
            musicTracker = 'playMusic';
            showPlaying();
            swapImage();
        } catch (error) {
            console.error("播放失败：", error);
        }
    } else {
        musicTracker = 'noMusic';
    }
}
