// ── FIRE CANVAS ──
(function () {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * canvas.width;
      this.y = init ? canvas.height - Math.random() * canvas.height * 0.5 : canvas.height + 15;
      this.size = Math.random() * 12 + 4;
      this.speedY = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 2;
      this.life = Math.random() * 0.8 + 0.2;
      this.decay = Math.random() * 0.005 + 0.0015;
      this.wobble = (Math.random() - 0.5) * 0.06;
      const hue = Math.random() * 35 + 3;
      const light = Math.random() * 30 + 40;
      this.color = `hsl(${hue},100%,${light}%)`;
      this.glowColor = `hsl(${hue},100%,65%)`;
    }
    update() {
      this.x += this.speedX + Math.sin(this.y * 0.015) * this.wobble * 10;
      this.y -= this.speedY;
      this.life -= this.decay;
      this.size *= 0.993;
      if (this.life <= 0 || this.y < -40) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life * 0.9;
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = this.glowColor;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      // segundo círculo más pequeño y brillante encima
      ctx.globalAlpha = this.life * 0.5;
      ctx.shadowBlur = this.size * 6;
      ctx.fillStyle = `hsl(40,100%,80%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 400; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── UTILIDADES ──
function ini(nombre) {
  return nombre.trim().slice(0, 2).toUpperCase();
}

function showToast(msg, err = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'show' + (err ? ' err' : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = ''; }, 3000);
}