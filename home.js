$("#topmenu").visibility({
  type: "fixed",
  offset: 10, // 与顶部距离
});
$("#mainimg").visibility({
  once: false,
  continuous: true,
  onPassing: function (calculations) {
    if (calculations.percentagePassed > 0.1) {
      $("#arrowdown").css("animation", "moveup 1.5s infinite");
    } else {
      $("#arrowdown").css("animation", "movedown 1.5s infinite");
    }
  },
});

var canvas = document.getElementById("underline");
var ctx = canvas.getContext("2d");
const rectWidth = 200;
const rectHeight = 6;
const speed = 4;
let x = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f0908d";
  ctx.fillRect(x, 0, rectWidth, rectHeight);
  x += speed;
  if (x > canvas.width) {
    x = -rectWidth;
  }
  requestAnimationFrame(draw);
}
draw();

function changepage(targetheight) {
  myIframe = document.getElementById("myIframe");
  $("#myIframe").css("height", targetheight + "px");
  myIframe.scrollIntoView({ behavior: "smooth", block: "start" });
}

const menuItems = document.querySelectorAll(".ui.huge.secondary.menu .item");
const highlight = document.querySelector(".highlight");
const menu = document.querySelector(".ui.huge.secondary.menu");

// 点击菜单项时触发的函数

function handleClick() {
  // 计算底部色块的目标位置和宽度

  menuItems.forEach((item) => {
    item.style.fontWeight = "bold";
    item.style.color = "black";
    item.style.fontSize = "1.2rem";
  });
  // 为当前点击的菜单项设置字体加粗样式
  this.style.color = "#bf242a";
  this.style.fontSize = "1.4rem";

  // 设置底部色块的样式
  setTimeout(() => {
    const itemRect = this.getBoundingClientRect();
    const highlightWidth = itemRect.width;
    const highlightLeft = itemRect.left - menu.getBoundingClientRect().left;
    highlight.style.width = highlightWidth + "px";
    highlight.style.transform = `translateX(${highlightLeft}px)`;
  }, 101);
}

// 为每个菜单项添加点击事件监听器
menuItems.forEach((item) => {
  item.addEventListener("click", handleClick);
});

document.addEventListener("DOMContentLoaded", function () {
  // 调用 handleClick() 函数，并传入第一个菜单项作为参数
  handleClick.call(menuItems[0]);
});

//子页面音乐同步
const music = document.getElementById("music");
window.addEventListener("message", function (event) {
  // 检查消息来源是否是指定的 iframe
  if (event.source === document.getElementById("myIframe").contentWindow) {
    // 输出接收到的消息
    if (event.data === "playMusic") {
      // 播放音乐
      music.play();
    }
    if (event.data === "pauseMusic") {
      music.pause();
    }
    if (event.data === "musictimechanged") {
      music.currentTime = localStorage.getItem("musictimesaved");
      console.log(localStorage.getItem("musictimesaved"));
    }
  }
});

function checkmusic() {
  myIframe = document.getElementById("myIframe");
  localStorage.setItem("musictimesaved", music.currentTime);
  if (!music.paused) {
    myIframe.onload = function () {
      myIframe.contentWindow.postMessage("Musicplay", "*");
    };
  } else {
    myIframe.onload = function () {
      myIframe.contentWindow.postMessage("Musicpause", "*");
    };
  }
}
