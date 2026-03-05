const preloader = document.getElementById("preloader");
const robotWrap = document.getElementById("robotWrap");
const greetingLine = document.getElementById("greetingLine");
const introduceLine = document.getElementById("introduceLine");
const burstText = document.getElementById("burstText");
const typedIntro = document.getElementById("typedIntro");
const doorTransition = document.getElementById("doorTransition");
const mainContent = document.getElementById("mainContent");
const projectForm = document.getElementById("projectForm");
const projectStrip = document.getElementById("projectStrip");
const projectTitleInput = document.getElementById("projectTitle");
const projectLinkInput = document.getElementById("projectLink");
const projectImageInput = document.getElementById("projectImage");

const PROJECT_STORAGE_KEY = "adinath_portfolio_projects";
const FALLBACK_IMAGE = "assests/1.png";
const defaultProjects = [
  {
    title: "Full Stack Project",
    link: "https://github.com/adinath123",
    image: "assests/1.png",
  },
  {
    title: "Machine Learning Project",
    link: "https://github.com/adinath123",
    image: "assests/2.png",
  },
  {
    title: "Data Analytics Project",
    link: "https://github.com/adinath123",
    image: "assests/3.png",
  },
];

const introMessage =
  "I am Adinath Chipparage, a full-stack web developer and machine learning enthusiast with strong interest in practical data analytics.";

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

function readProjects() {
  try {
    const raw = localStorage.getItem(PROJECT_STORAGE_KEY);

    if (!raw) {
      return [...defaultProjects];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [...defaultProjects];
    }

    return parsed;
  } catch (error) {
    return [...defaultProjects];
  }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project card visible";

  const image = document.createElement("img");
  image.src = project.image || FALLBACK_IMAGE;
  image.alt = `${project.title} preview`;
  image.onerror = () => {
    image.src = FALLBACK_IMAGE;
  };

  const title = document.createElement("h3");
  title.textContent = project.title;

  const actions = document.createElement("div");
  actions.className = "project-actions";

  const openLink = document.createElement("a");
  openLink.href = project.link;
  openLink.target = "_blank";
  openLink.rel = "noopener noreferrer";
  openLink.textContent = "Open Project";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-project";
  removeButton.textContent = "Remove";
  removeButton.dataset.index = String(index);

  actions.append(openLink, removeButton);
  article.append(image, title, actions);
  return article;
}

function renderProjects(projects) {
  if (!projectStrip) {
    return;
  }

  projectStrip.innerHTML = "";

  projects.forEach((project, index) => {
    projectStrip.appendChild(createProjectCard(project, index));
  });
}

function setupProjects() {
  if (!projectForm || !projectStrip) {
    return;
  }

  let projects = readProjects();
  renderProjects(projects);

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProject = {
      title: projectTitleInput.value.trim(),
      link: projectLinkInput.value.trim(),
      image: projectImageInput.value.trim() || FALLBACK_IMAGE,
    };

    if (!newProject.title || !newProject.link) {
      return;
    }

    projects = [newProject, ...projects];
    saveProjects(projects);
    renderProjects(projects);
    projectForm.reset();
  });

  projectStrip.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement) || !target.classList.contains("remove-project")) {
      return;
    }

    const index = Number.parseInt(target.dataset.index || "-1", 10);

    if (index < 0 || index >= projects.length) {
      return;
    }

    projects = projects.filter((_, i) => i !== index);

    if (projects.length === 0) {
      projects = [...defaultProjects];
    }

    saveProjects(projects);
    renderProjects(projects);
  });
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
  setupProjects();
}

document.addEventListener("DOMContentLoaded", runExperience);
