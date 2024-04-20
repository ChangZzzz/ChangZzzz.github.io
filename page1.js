const music = document.getElementById("music");
music.volume = 0;
const musicimg = document.getElementById("musicimg");
var isShow = true;

$("#musicslider").slider({ smooth: true, min: 0, max: 100 });

function playMusic() {
  music.play();
  window.parent.postMessage("playMusic", "*"); //向主页面通讯
  localStorage.setItem("music", "true");
  musicimg.style.animationPlayState = "running";
  //音乐播放+封面旋转
}
function pauseMusic() {
  music.pause();
  window.parent.postMessage("pauseMusic", "*"); //向主页面通讯
  localStorage.setItem("music", "false");
  musicimg.style.animationPlayState = "paused";
  //音乐暂停+封面暂停旋转
}
music.addEventListener("timeupdate", function () {
  var music_time = document.getElementById("music_time");
  var music_progress_percent = (music.currentTime / music.duration) * 100;
  const show_minutes = Math.floor(music.currentTime / 60);
  const show_seconds = Math.floor(music.currentTime % 60);
  const minutes = Math.floor(music.duration / 60);
  const seconds = Math.floor(music.duration % 60);
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const music_show_time = `${padTo2Digits(show_minutes)}:${padTo2Digits(
    show_seconds
  )}`;
  const music_tottime = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  music_time.textContent = `${music_show_time}/${music_tottime}`;
  //更新歌曲时间
  //更新进度条
  $("#musicslider").slider("set value", music_progress_percent);
  if (music_progress_percent == 100) {
    musicimg.style.animationPlayState = "paused";
  } //播放结束暂停封面旋转
});
musicslider.addEventListener("click", function () {
  music.currentTime =
    music.duration * ($("#musicslider").slider("get value") / 100); //进度条控制进度
  localStorage.setItem("musictimesaved", music.currentTime);
  setTimeout(() => {
    window.parent.postMessage("musictimechanged", "*"); // 向主页面通知时间改变
  }, 10); // 延迟 10 毫秒 防止过早读取到过期值
  console.log(localStorage.getItem("musictimesaved"));
});

window.addEventListener("message", function (event) {
  if (event.data === "Musicplay") {
    playMusic();
    music.currentTime = localStorage.getItem("musictimesaved");
  }
  if (event.data === "Musicpause") {
    pauseMusic();
    music.currentTime = localStorage.getItem("musictimesaved");
  }
});
