const openBtn = document.getElementById("openPackBtn");
const packDiv = document.getElementById("pack");
const cardContainer = document.getElementById("cardContainer");
const card = document.getElementById("card");
const bgm = document.getElementById("bgm");

let isDragging = false;
let startX = 0;
let targetRotation = 0;
let currentRotation = 0;

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

  // ✅ 播放背景音乐
  bgm.volume = 0.5; // 调整音量（0 ~ 1）
  bgm.play();

  setTimeout(() => {
    packDiv.style.display = "none";
    cardContainer.classList.remove("hidden");
    cardContainer.classList.add("show-animation");
    card.classList.add("glow");
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
// 🌟 自动生成动态颗粒
const particleContainer = document.querySelector(".particles");

function createParticles(num = 30) {
  for (let i = 0; i < num; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    // 随机位置
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;

    // 不同动画延迟 & 时间
    p.style.animationDuration = `${6 + Math.random() * 6}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;

    // 随机大小
    const size = Math.random() * 6 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    particleContainer.appendChild(p);
  }
}

// 初始化粒子
createParticles(30);

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
