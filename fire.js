// ── FIRE CANVAS ──
(function() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = canvas.height + 10;
      this.size  = Math.random() * 3 + 0.8;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.life   = Math.random() * 0.6 + 0.4;
      this.decay  = Math.random() * 0.004 + 0.002;
      const hue   = Math.random() * 28 + 8;
      this.color  = `hsl(${hue},100%,${Math.random() * 28 + 48}%)`;
    }
    update() {
      this.x     += this.speedX;
      this.y     -= this.speedY;
      this.life  -= this.decay;
      this.size  *= 0.996;
      if (this.life <= 0 || this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle   = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 130; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height;
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
  el.className   = 'show' + (err ? ' err' : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = ''; }, 3000);
}
