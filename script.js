const openBtn = document.getElementById("openPackBtn");
const packDiv = document.getElementById("pack");
const cardContainer = document.getElementById("cardContainer");
const card = document.getElementById("card");
const petalsContainer = document.getElementById("petals-container");

let isDragging = false;
let startX = 0;
let targetRotation = 0;
let currentRotation = 0;

// 🌸 创建花瓣函数
function createPetals(num = 20) {
  for (let i = 0; i < num; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    // 横向位置 & 初始纵向位置（屏幕上方之外）
    petal.style.left = `${Math.random() * 100}%`;
    const initialTop = Math.floor(Math.random() * -120) - 80; // -80 ~ -200px
    petal.style.top = `${initialTop}px`;

    // 动画参数
    petal.style.animationDuration = `${6 + Math.random() * 3}s`;
    petal.style.animationDelay = `${Math.random() * 3}s`;

    petalsContainer.appendChild(petal);
  }
}

// ✅ 页面加载时生成花瓣
window.addEventListener("DOMContentLoaded", () => {
  createPetals(20);
});

// 🎴 卡片旋转动画
function animate() {
  currentRotation += (targetRotation - currentRotation) * 0.1;
  card.style.transform = `rotateY(${currentRotation}deg)`;
  requestAnimationFrame(animate);
}
animate();

// 🎁 打开卡包动画
openBtn.addEventListener("click", () => {
  packDiv.classList.add("open-animation");

  // 再追加几片花瓣
  createPetals(10);

  setTimeout(() => {
    packDiv.style.display = "none";
    cardContainer.classList.remove("hidden");
  }, 2000);
});

// 🖱️ 鼠标拖动卡片旋转
cardContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  startX = e.clientX;
  targetRotation += deltaX * 0.5;
});

// 📱 手机滑动旋转
cardContainer.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);

cardContainer.addEventListener(
  "touchmove",
  (e) => {
    const deltaX = e.touches[0].clientX - startX;
    startX = e.touches[0].clientX;
    targetRotation += deltaX * 0.5;
  },
  { passive: true }
);
