const Video1 = document.getElementById("video1");
$("#volum").popup({ on: "click" });
$("#volumslider").slider({
  smooth: true,
  min: 0,
  max: 100,
  showThumbTooltip: true,
  onMove: function () {
    document.getElementById("video1").volume =
      $("#volumslider").slider("get value") / 100;
  },
});
$("#volumslider").slider("set value", 50);
$("#videoslider").slider({ smooth: true, min: 0, max: 100 });
//实现视频暂停播放
function playPause() {
  if (Video1.paused) {
    Video1.play();
    document.getElementById("playbutton").className = "pause icon";
  } else {
    Video1.pause();
    document.getElementById("playbutton").className = "play icon";
  }
}
Video1.addEventListener("timeupdate", function () {
  var Video1_time = document.getElementById("Video1_time");
  var Video1_progress_percent = (Video1.currentTime / Video1.duration) * 100;
  const show_minutes = Math.floor(Video1.currentTime / 60);
  const show_seconds = Math.floor(Video1.currentTime % 60);
  const minutes = Math.floor(Video1.duration / 60);
  const seconds = Math.floor(Video1.duration % 60);
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const Video1_show_time = `${padTo2Digits(show_minutes)}:${padTo2Digits(
    show_seconds
  )}`;
  const Video1_tottime = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  Video1_time.textContent = `${Video1_show_time}/${Video1_tottime}`;
  //更新歌曲时间
  //更新进度条
  $("#videoslider").slider("set value", Video1_progress_percent);
});
videoslider.addEventListener("click", function () {
  Video1.currentTime =
    Video1.duration * ($("#videoslider").slider("get value") / 100); //进度条控制进度
});
