// Получение доступа к холсту и его настройка.
var htmlCanvas001 = document.getElementById("canvas001");
var canvas001 = htmlCanvas001.getContext(`2d`);
htmlCanvas001.style.backgroundColor = `black`;
htmlCanvas001.width = window.innerWidth - 4;
htmlCanvas001.height = window.innerHeight - 4;

// Уравнивание размера холста в соответсвии с размерами окна браузера.
window.addEventListener(`resize`, function () {
  htmlCanvas001.width = window.innerWidth;
  htmlCanvas001.height = window.innerHeight;
});
// Переменные координат курсора мыши.
var mouse = {
  x: htmlCanvas001.width / 2,
  y: htmlCanvas001.height / 2,
};
// Захват координат курсора мыши с сохранением в структуре mouse.
addEventListener(`mousemove`, function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
// Получение случайного числа min/max.
function randomIntFromRage(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.velocity = 0.01;
  this.radius = radius;
  this.radians = Math.random() * (Math.PI * 2);
  this.color = color;
  this.distanceFromCenter = randomIntFromRage(50, 150);
  this.lastMousePos = {
    x: x,
    y: x,
  }

  this.draw = (lastCoordinate) => {
    canvas001.beginPath();
    canvas001.strokeStyle = `hsl(` + color + `, 50%, 50%)`;
    canvas001.lineCap = 'round';
    canvas001.lineWidth = this.radius;
    canvas001.moveTo(lastCoordinate.x, lastCoordinate.y);
    canvas001.lineTo(this.x, this.y);
    canvas001.stroke();
    canvas001.closePath();
  }

  this.update = () => {
    const lastCoordinate = {
      x: this.x,
      y: this.y,
    }

    this.radians += this.velocity;
    this.lastMousePos.x += (mouse.x - this.lastMousePos.x) * 0.005;
    this.lastMousePos.y += (mouse.y - this.lastMousePos.y) * 0.005;
    this.x = this.lastMousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMousePos.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastCoordinate);
  }
}
// Рекурсионная функция отрисовки кадров.
function animate() {
  // canvas001.clearRect(0, 0, htmlCanvas001.width, htmlCanvas001.height);
  canvas001.fillStyle = 'rgba(0,0,0,0.05)';
  canvas001.fillRect(0, 0, htmlCanvas001.width, htmlCanvas001.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(animate);
}
let particles;
function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    const getColor = Math.random() * 360;
    const radius = (Math.random() * 8) + 1;
    particles.push(new Particle(htmlCanvas001.width / 2, htmlCanvas001.height / 2, radius, getColor));
  }
}
init();
animate();
