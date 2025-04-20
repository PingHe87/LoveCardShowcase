const openBtn = document.getElementById("openPackBtn");
const packDiv = document.getElementById("pack");
const cardContainer = document.getElementById("cardContainer");
const card = document.getElementById("card");

let isDragging = false;
let startX = 0;
let targetRotation = 0;
let currentRotation = 0;

// 平滑动画用：每帧更新
function animate() {
  currentRotation += (targetRotation - currentRotation) * 0.1; // 缓动系数
  card.style.transform = `rotateY(${currentRotation}deg)`;
  requestAnimationFrame(animate);
}
animate();

openBtn.addEventListener("click", () => {
  packDiv.style.display = "none";
  cardContainer.classList.remove("hidden");
});

// 拖动区域绑定到整个 cardContainer（而不是 card）
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
  targetRotation += deltaX * 0.5; // 旋转灵敏度
});

// 手机端触摸旋转
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
