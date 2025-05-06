
let mode = "hide";  // hide or find
let treasures = JSON.parse(localStorage.getItem("treasures") || "[]");

const mapContainer = document.getElementById("map-container");
const mapImage = document.getElementById("map");

function setMode(newMode) {
    mode = newMode;
    alert("已切换为 " + (mode === "hide" ? "藏宝" : "寻宝") + " 模式");
}

mapImage.addEventListener("click", function(e) {
    const rect = mapImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / mapImage.width).toFixed(4);
    const percentY = (y / mapImage.height).toFixed(4);

    if (mode === "hide") {
        const code = prompt("请输入藏宝编码：");
        if (code) {
            treasures.push({ x: percentX, y: percentY, code });
            localStorage.setItem("treasures", JSON.stringify(treasures));
            placeMarker(percentX, percentY);
        }
    } else if (mode === "find") {
        let found = false;
        treasures.forEach(t => {
            const dx = Math.abs(t.x - percentX);
            const dy = Math.abs(t.y - percentY);
            if (dx < 0.01 && dy < 0.01) {
                const inputCode = prompt("请输入该点的藏宝编码：");
                if (inputCode === t.code) {
                    alert("恭喜你解锁宝藏！");
                    found = true;
                    // 可播放动画
                } else {
                    alert("编码错误！");
                }
            }
        });
        if (!found) alert("这里好像没有宝藏哦～");
    }
});

function placeMarker(x, y) {
    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = (x * 100) + "%";
    marker.style.top = (y * 100) + "%";
    mapContainer.appendChild(marker);
}

// 初始化地图上的标记
treasures.forEach(t => placeMarker(t.x, t.y));
