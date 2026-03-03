const preloader = document.getElementById("preloader");
const robotWrap = document.getElementById("robotWrap");
const greetingLine = document.getElementById("greetingLine");
const introduceLine = document.getElementById("introduceLine");
const burstText = document.getElementById("burstText");
const typedIntro = document.getElementById("typedIntro");
const doorTransition = document.getElementById("doorTransition");
const mainContent = document.getElementById("mainContent");

const introMessage =
  "I am Adinath Chipparage, a full-stack developer who turns ideas into responsive, production-ready experiences with clean code and purposeful motion.";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  if (hour < 21) {
    return "Good evening";
  }

  return "Good night";
}

async function typeText(el, text, speed = 28) {
  el.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    el.textContent += text[i];
    await sleep(speed);
  }
}

function setupRevealAnimation() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

async function runExperience() {
  document.body.classList.add("lock-scroll");

  await sleep(850);
  robotWrap.classList.add("jump");

  await sleep(700);
  greetingLine.textContent = `${getGreeting()}. I am your mini guide.`;
  greetingLine.classList.add("show");

  await sleep(1350);
  introduceLine.textContent = "Let me introduce myself.";
  introduceLine.classList.add("show");

  await sleep(750);
  burstText.classList.add("show");

  await sleep(620);
  await typeText(typedIntro, introMessage, 24);

  await sleep(800);
  doorTransition.classList.add("active");
  await sleep(80);
  doorTransition.classList.add("open");

  await sleep(750);
  mainContent.classList.add("ready");
  preloader.classList.add("done");

  await sleep(500);
  document.body.classList.remove("lock-scroll");
  setupRevealAnimation();
}

document.addEventListener("DOMContentLoaded", runExperience);
