const imgcontainer = document.getElementById("imgcontainer");
document.ondragover = function (e) {
  e.preventDefault(); //在ondragover中阻止默认行为才能触发 ondrop 而不是 ondragleave
};
document.ondrop = function (e) {
  e.preventDefault(); //阻止 document.ondrop的默认行为 不在新窗口中打开拖进的图片
};
imgcontainer.ondrop = function (e) {
  console.log(e.dataTransfer);
  var list = e.dataTransfer.files;
  for (var i = 0; i < list.length; i++) {
    var f = list[i];
    reader(f);
    //读取指定文件的内容 作为“数据URL”
  }
};
function reader(f) {
  var reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onload = function () {
    var img = new Image();
    img.src = reader.result;
    img.width = 200; // 设置宽度为200像素
    img.height = 200; // 设置高度为200像素
    imgcontainer.appendChild(img);
  };
}
