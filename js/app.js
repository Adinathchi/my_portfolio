const preloader = document.getElementById("preloader");
const robotWrap = document.getElementById("robotWrap");
const greetingLine = document.getElementById("greetingLine");
const introduceLine = document.getElementById("introduceLine");
const burstText = document.getElementById("burstText");
const typedIntro = document.getElementById("typedIntro");
const doorTransition = document.getElementById("doorTransition");
const mainContent = document.getElementById("mainContent");
const projectStrip = document.getElementById("projectStrip");
const projectForm = document.getElementById("projectForm");
const projectTitleInput = document.getElementById("projectTitle");
const projectLinkInput = document.getElementById("projectLink");
const projectImageInput = document.getElementById("projectImage");
const projectAccessNote = document.getElementById("projectAccessNote");
const adminLoginLink = document.getElementById("adminLoginLink");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

const FALLBACK_IMAGE = "assests/1.png";
const ADMIN_FLAG_KEY = "adinath_portfolio_admin";
const PROJECT_STORAGE_KEY = "adinath_portfolio_projects";
const adminProjects = [
  {
    title: "Full Stack Project Showcase",
    link: "https://github.com/Adinathchi",
    image: "assests/1.png",
  },
  {
    title: "Machine Learning Project Showcase",
    link: "https://github.com/Adinathchi",
    image: "assests/2.png",
  },
  {
    title: "Data Analytics Project Showcase",
    link: "https://github.com/Adinathchi",
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
      return [...adminProjects];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [...adminProjects];
    }

    return parsed;
  } catch (error) {
    return [...adminProjects];
  }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

function isAdmin() {
  return localStorage.getItem(ADMIN_FLAG_KEY) === "true";
}

function createProjectCard(project, index, adminMode) {
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
  actions.append(openLink);

  if (adminMode) {
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-project";
    removeButton.textContent = "Remove";
    removeButton.dataset.index = String(index);
    actions.append(removeButton);
  }

  article.append(image, title, actions);
  return article;
}

function renderProjects(projects, adminMode) {
  if (!projectStrip) {
    return;
  }

  projectStrip.innerHTML = "";

  projects.forEach((project, index) => {
    projectStrip.appendChild(createProjectCard(project, index, adminMode));
  });
}

function setupProjectsAdminUI(adminMode) {
  if (!projectForm || !projectAccessNote || !adminLoginLink) {
    return;
  }

  if (adminMode) {
    projectForm.classList.remove("hidden");
    adminLoginLink.classList.add("hidden");
    projectAccessNote.textContent = "Admin mode active. You can add or remove projects.";
  } else {
    projectForm.classList.add("hidden");
    adminLoginLink.classList.remove("hidden");
    projectAccessNote.textContent = "Only admin can add projects. Visitors can view project highlights only.";
  }
}

function setupProjects() {
  if (!projectStrip) {
    return;
  }

  let projects = readProjects();
  const adminMode = isAdmin();

  renderProjects(projects, adminMode);
  setupProjectsAdminUI(adminMode);

  if (projectForm && adminMode) {
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
      renderProjects(projects, true);
      projectForm.reset();
    });
  }

  projectStrip.addEventListener("click", (event) => {
    if (!isAdmin()) {
      return;
    }

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
      projects = [...adminProjects];
    }

    saveProjects(projects);
    renderProjects(projects, true);
  });

  if (adminLogoutBtn && adminMode) {
    adminLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem(ADMIN_FLAG_KEY);
      window.location.reload();
    });
  }
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
