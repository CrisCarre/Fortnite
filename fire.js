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
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 7 + 2;
      this.speedY = Math.random() * 3.5 + 1.5;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.life = Math.random() * 0.75 + 0.25;
      this.decay = Math.random() * 0.006 + 0.002;
      this.wobble = Math.random() * 0.08 - 0.04;
      const hue = Math.random() * 30 + 5;
      const light = Math.random() * 25 + 45;
      this.color = `hsl(${hue},100%,${light}%)`;
    }
    update() {
      this.x += this.speedX + Math.sin(this.y * 0.02) * this.wobble;
      this.y -= this.speedY;
      this.life -= this.decay;
      this.size *= 0.994;
      if (this.life <= 0 || this.y < -30) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life * 0.85;
      // Glow
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Más partículas, concentradas en la parte baja
  for (let i = 0; i < 280; i++) {
    const p = new Particle();
    p.y = canvas.height - Math.random() * canvas.height * 0.6;
    particles.push(p);
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