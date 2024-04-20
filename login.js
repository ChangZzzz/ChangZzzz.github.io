var state = "default";
function animateBackground() {
  if (state == "default") {
    var background = document.querySelector(".background");
    var colume = document.querySelector(".column");
    var segment = document.querySelector(".ui.segment");
    background.style.animation = "none"; // 先清除之前的动画
    colume.style.animation = "none";
    setTimeout(function () {
      background.style.animation =
        "backgroundAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
      colume.style.animation =
        "columnAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
      segment.style.animation =
        "segmentAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
    }, 10);
    state = "animated";
  }
}
function reverseBackgroundAnimation() {
  if (state == "animated") {
    var background = document.querySelector(".background");
    var colume = document.querySelector(".column");
    var segment = document.querySelector(".ui.segment");
    setTimeout(function () {
      background.style.animation =
        "backgroundReverseAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
      colume.style.animation =
        "columnReverseAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
      segment.style.animation =
        "segmentReverseAnimation 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards";
    }, 10);
    state = "default";
  }
}
function saveUserinfo() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "" || password == "") {
    alert("用户名和密码不能为空");
  } else {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("用户信息已保存");
    window.location.href = "home.html";
  }
}
function checkLoginAndJump() {
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");

  if (username && password) {
    alert("欢迎回来，" + username);
  } else {
    alert("请先登录");
  }
}
