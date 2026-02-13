let currentPage = 0;
let fireworksStarted = false;

/* -------------------------
   PAGE SWITCHING
------------------------- */

document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById("startButton");
  const bgMusic = document.getElementById("bgMusic");

  if (startButton) {
    startButton.addEventListener("click", function () {

      console.log("Intro clicked");

      if (bgMusic) {
        bgMusic.play().catch(() => {});
      }

      document.getElementById("page0").classList.remove("active");
      document.getElementById("page1").classList.add("active");

      currentPage = 1;
    });
  }

});

function goToPage(pageNumber) {

  console.log("Switching to page:", pageNumber);

  const clickSound = document.getElementById("clickSound");
  const bgMusic = document.getElementById("bgMusic");

  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }

  if (clickSound) {
    clickSound.currentTime = 0;

    clickSound.play()
      .then(() => {
        clickSound.onended = () => switchPage(pageNumber);
      })
      .catch(() => {
        // If sound fails, switch anyway
        switchPage(pageNumber);
      });

  } else {
    switchPage(pageNumber);
  }
}
function switchPage(pageNumber) {

  const current = document.getElementById("page" + currentPage);
  const next = document.getElementById("page" + pageNumber);

  next.classList.add("active");
  current.classList.remove("active");

  currentPage = pageNumber;

  if (pageNumber === 3 && !fireworksStarted) {
    startFireworks();
    fireworksStarted = true;
  }
  
}




/* -------------------------
   FIREWORKS (ONLY PAGE 3)
------------------------- */

function startFireworks() {

  const canvas = document.getElementById("fireworks");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = [];

  function createFirework() {

    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height * 0.7;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 100,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
      });
    }
  }

  function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    });

    particles = particles.filter(p => p.life > 0);

    if (Math.random() < 0.03) {
      createFirework();
    }

    requestAnimationFrame(update);
  }

  update();
}