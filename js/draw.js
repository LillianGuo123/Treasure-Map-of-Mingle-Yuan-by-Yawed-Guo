
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");

// 加载底图线稿
const baseImage = new Image();
baseImage.src = "assets/map-outline.png";
baseImage.onload = function() {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
};

// 绘图逻辑
let drawing = false;
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// 清空画布
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
}

// 提交作品（保存在本地）
function submitDrawing() {
    const dataUrl = canvas.toDataURL("image/png");
    const drawings = JSON.parse(localStorage.getItem("drawings") || "[]");
    drawings.push({ image: dataUrl, time: new Date().toLocaleString(), votes: 0 });
    localStorage.setItem("drawings", JSON.stringify(drawings));
    alert("作品已提交！");
}
