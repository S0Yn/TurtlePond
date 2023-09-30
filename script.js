let targets = [];
let movingToTarget = false;

// 監聽點擊事件，生成棕色圓球
document.addEventListener('click', function(event) {
  const target = document.createElement('div');
  target.style.position = 'absolute';
  target.style.width = '50px';
  target.style.height = '50px';
  target.style.backgroundColor = 'brown';
  target.style.borderRadius = '50%';
  target.style.left = `${event.clientX - 25}px`;
  target.style.top = `${event.clientY - 25}px`;
  document.body.appendChild(target);
  targets.push(target);
  movingToTarget = true;
});

const container = document.getElementById('container');
const imgBoxes = [];

// 初始化5個圖片元素
for (let i = 0; i < 5; i++) {
  const imgBox = document.createElement('div');
  imgBox.className = 'img-box';
  const imageElement = document.createElement('img');
  imageElement.src = 's3.png'; // 你的圖片路徑
  imgBox.appendChild(imageElement);
  container.appendChild(imgBox);
  imgBoxes.push(imgBox);
  moveRandomly(imgBox);
}

function moveRandomly(element) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  let speed = Math.random() * 5;
  let angle = Math.random() * 360;

  // 主要動畫邏輯
  setInterval(() => {
    if (movingToTarget && targets.length > 0) {
      const target = targets[0];
      const targetRect = target.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const dx = targetRect.left - elementRect.left;
      const dy = targetRect.top - elementRect.top;
      angle = Math.atan2(dy, dx) * (180 / Math.PI);
      speed = 5;

      if (elementRect.left < targetRect.right &&
          elementRect.right > targetRect.left &&
          elementRect.top < targetRect.bottom &&
          elementRect.bottom > targetRect.top) {
        targets.shift();
        document.body.removeChild(target);
        if (targets.length === 0) {
          movingToTarget = false;
        }

        // 增加新的圖片元素
        const newImgBox = document.createElement('div');
        newImgBox.className = 'img-box';
        const newImageElement = document.createElement('img');
        newImageElement.src = 's3.png'; // 你的圖片路徑
        newImgBox.appendChild(newImageElement);
        container.appendChild(newImgBox);
        imgBoxes.push(newImgBox);
        moveRandomly(newImgBox);
      }
    }

    x += Math.cos(angle * (Math.PI / 180)) * speed;
    y += Math.sin(angle * (Math.PI / 180)) * speed;

    if (x < 0 || x > window.innerWidth) angle = -angle;
    if (y < 0 || y > window.innerHeight) angle = -angle;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.transform = `rotate(${angle}deg)`;
  }, 50);
}
