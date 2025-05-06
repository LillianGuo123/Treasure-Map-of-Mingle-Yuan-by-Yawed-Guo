
const gallery = document.getElementById("gallery");
const drawings = JSON.parse(localStorage.getItem("drawings") || "[]");
const votedIndex = localStorage.getItem("votedIndex");

drawings.forEach((drawing, index) => {
    const card = document.createElement("div");
    card.className = "drawing-card";
    if (votedIndex == index) card.classList.add("highlight");

    const img = document.createElement("img");
    img.src = drawing.image;

    const info = document.createElement("p");
    info.textContent = "提交时间：" + drawing.time;

    const voteCount = document.createElement("p");
    voteCount.textContent = "票数：" + drawing.votes;

    const button = document.createElement("button");
    button.textContent = "投票";
    button.disabled = (votedIndex !== null);  // 每天只能投一次
    button.onclick = () => {
        drawing.votes += 1;
        localStorage.setItem("votedIndex", index);
        localStorage.setItem("drawings", JSON.stringify(drawings));
        alert("投票成功！");
        location.reload();
    };

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(voteCount);
    card.appendChild(button);
    gallery.appendChild(card);
});
