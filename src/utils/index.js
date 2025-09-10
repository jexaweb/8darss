// src/utils/gradients.js
// src/js/gradients.js
export function getRandomGradientOImage(width = 800, height = 400) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const x0 = Math.random() * width;
  const y0 = Math.random() * height;
  const x1 = Math.random() * width;
  const y1 = Math.random() * height;

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  const randColor = () =>
    `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;

  gradient.addColorStop(0, randColor());
  gradient.addColorStop(0.5, randColor());
  gradient.addColorStop(1, randColor());

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}
