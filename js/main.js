// =====================
// Settings Box Handling
// =====================

const settingsIcon = document.querySelector(".settings-box .icon");
const settingsBox = document.querySelector(".settings-box");

settingsIcon.addEventListener("click", () => {
  const isActive = settingsBox.classList.toggle("active");
  settingsIcon.querySelector("i").style.transform = isActive
    ? "rotate(180deg)"
    : "rotate(0deg)";
});

// =====================
// Color Switcher
// =====================

const colorsList = document.querySelectorAll(".colors-list li");

function setMainColor(color) {
  document.documentElement.style.setProperty("--main-color", color);
  localStorage.setItem("color_option", color);
}

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    setMainColor(e.target.dataset.color);
    handleActive(e);
  });
});

const savedColor = localStorage.getItem("color_option");
if (savedColor) {
  setMainColor(savedColor);
  colorsList.forEach((el) => {
    el.classList.toggle("active", el.dataset.color === savedColor);
  });
}

// =====================
// Background Switcher
// =====================

const backgroundsButtons = document.querySelectorAll(".backgrounds button");

backgroundsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleActive(e);
    const isRandom = e.target.dataset.background === "yes";
    randomizeImage(isRandom);
    localStorage.setItem("background_option", isRandom ? "true" : "false");
  });
});

// =====================
// Landing Page Background
// =====================

const landingPage = document.querySelector(".landing-page");
const imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let theInterval;
let backgroundOption;

function setBackgroundOptionFromStorage() {
  const savedBackground = localStorage.getItem("background_option");
  if (savedBackground !== null) {
    backgroundOption = savedBackground === "true";
    backgroundsButtons.forEach((el) => el.classList.remove("active"));
    document
      .querySelector(`.backgrounds .${backgroundOption ? "yes" : "no"}`)
      .classList.add("active");
  } else {
    backgroundOption = true;
    localStorage.setItem("background_option", "true");
    document.querySelector(".backgrounds .yes").classList.add("active");
  }
}
setBackgroundOptionFromStorage();
randomizeImage(backgroundOption);

function randomizeImage(option) {
  clearInterval(theInterval);
  if (option === true) {
    theInterval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage = `url("pics/${imagesArray[randomNumber]}")`;
    }, 5000);
  } else {
    // Set to first image if static
    landingPage.style.backgroundImage = `url("pics/${imagesArray[0]}")`;
  }
}

// =====================
// Skills Progress Animation
// =====================

const skills = document.querySelector(".skills");
let skillsAnimated = false;

window.addEventListener("scroll", () => {
  const skillsOffSetTop = skills.offsetTop;
  const skillsOuterHeight = skills.offsetHeight;
  const windowHeight = window.innerHeight;
  const windowScrollTop = window.pageYOffset;

  if (
    !skillsAnimated &&
    windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight
  ) {
    document
      .querySelectorAll(".skills .skill-box .progress span")
      .forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    skillsAnimated = true;
  }
});

// =====================
// Popup Images
// =====================

const ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Popup Box
    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // Image
    const popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    // Heading
    if (img.alt) {
      const imgHeading = document.createElement("h3");
      imgHeading.textContent = img.alt;
      imgHeading.className = "image-heading";
      popupBox.appendChild(imgHeading);
    }

    // Close Button
    const closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);

    document.body.appendChild(popupBox);

    // Close events
    function closePopup(e) {
      if (
        e.target.classList.contains("close-button") ||
        e.target.classList.contains("popup-overlay")
      ) {
        popupBox.remove();
        overlay.remove();
        document.removeEventListener("click", closePopup);
      }
    }
    document.addEventListener("click", closePopup);
  });
});

// =====================
// Smooth Scroll
// =====================

function scroll(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const section = document.querySelector(
        e.target.dataset.section || e.target.getAttribute("data-section")
      );
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

scroll(allBullets);
scroll(allLinks);

// =====================
// Handle Active State
// =====================

function handleActive(event) {
  event.target.parentElement
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));
  event.target.classList.add("active");
}

// =====================
// Bullets Option
// =====================

const bulletsSpans = document.querySelectorAll(".bullets-option button");
const bulletsContainer = document.querySelector(".nav-bullets");

function setBulletsDisplayFromStorage() {
  const savedBulletsStyle = localStorage.getItem("bullets_option");
  if (savedBulletsStyle !== null) {
    bulletsSpans.forEach((button) => {
      button.classList.remove("active");
      if (
        (savedBulletsStyle === "flex" && button.dataset.display === "yes") ||
        (savedBulletsStyle === "none" && button.dataset.display === "no")
      ) {
        button.classList.add("active");
      }
    });
    bulletsContainer.style.display =
      savedBulletsStyle === "flex" ? "flex" : "none";
  }
}
setBulletsDisplayFromStorage();

bulletsSpans.forEach((button) => {
  button.addEventListener("click", (e) => {
    const display = button.dataset.display === "yes" ? "flex" : "none";
    bulletsContainer.style.display = display;
    handleActive(e);
    localStorage.setItem("bullets_option", display);
  });
});

// =====================
// Reset Options
// =====================

document.querySelector(".reset").onclick = function () {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  window.location.reload();
};

// =====================
// Responsive Menu
// =====================

const toggleMenu = document.querySelector(".toggle-menu");
const links = document.querySelector(".header-area .links");
const toggleMenuSpans = document.querySelectorAll(".toggle-menu span");

toggleMenu.addEventListener("click", function () {
  const isOpen = links.classList.toggle("open");
  toggleMenuSpans.forEach((span) => {
    span.style.backgroundColor = isOpen ? "var(--main-color)" : "#fff";
  });
});

document.querySelectorAll(".header-area .links a").forEach(function (link) {
  link.addEventListener("click", function () {
    toggleMenuSpans.forEach((span) => {
      span.style.backgroundColor = "#fff";
    });
    links.classList.remove("open");
  });
});

// =====================
// Responsive Enhancements (Media Queries)
// =====================

(function addResponsiveStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
@media (max-width: 992px) {
  .about-us {
    flex-direction: column;
    gap: 0;
    text-align: center;
  }
  .about-us .info, .about-us .image-box {
    padding: 10px;
  }
  .features .container {
    flex-direction: column;
    align-items: center;
  }
  .features .feat-box {
    width: 90%;
    margin-bottom: 30px;
  }
  .testimonials .ts-box {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
    float: none;
  }
  .timeline .timeline-content .left,
  .timeline .timeline-content .right {
    width: 100%;
    float: none;
    margin-bottom: 30px;
  }
  .timeline .timeline-content .left::before,
  .timeline .timeline-content .right::before {
    display: none;
  }
  .timeline .timeline-content .left .content::before,
  .timeline .timeline-content .right .content::before {
    display: none;
  }
  .timeline .timeline-content::before {
    left: 8px;
  }
}
@media (max-width: 768px) {
  .about-us {
    flex-direction: column;
    gap: 0;
  }
  .about-us .image-box img {
    width: 180px;
  }
  .skills .skill-box {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
  .features .feat-box {
    width: 100%;
  }
  .gallery .images-box {
    flex-direction: column;
    align-items: center;
  }
  .gallery img {
    width: 90vw;
    max-width: 300px;
  }
  .nav-bullets {
    top: auto;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    flex-direction: row;
    width: auto;
    border-radius: 10px 10px 0 0;
    background: rgba(255,255,255,0.95);
  }
  .nav-bullets .bullet {
    margin: 10px 5px;
  }
  .timeline .timeline-content .year {
    width: 80px;
    font-size: 18px;
  }
  .contact form {
    flex-direction: column;
    gap: 0;
  }
  .contact form .left,
  .contact form .right {
    width: 100%;
    float: none;
  }
}
@media (max-width: 576px) {
  .landing-page .introduction-text {
    width: 98%;
    font-size: 16px;
  }
  .about-us .image-box img {
    width: 120px;
  }
  .features .feat-box {
    padding: 12px 4px 18px 4px;
  }
  .popup-box {
    width: 95vw;
    padding: 10px;
  }
  .footer {
    font-size: 16px;
    padding: 10px;
  }
}
  `;
  document.head.appendChild(style);
})();

// =====================
// Enhanced Hovers & Animations
// =====================

(function addHoverStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
.settings-box .icon:hover {
  background: var(--main-color);
  color: #fff;
  animation: pulse 0.7s;
}
.settings-box .colors-list li:hover,
.settings-box .colors-list li.active {
  box-shadow: 0 0 0 4px rgba(33,150,243,0.12);
  transform: scale(1.15) rotate(-3deg);
  transition: 0.2s;
}
.settings-box .option-box button:hover,
.settings-box .option-box button.active {
  background: linear-gradient(90deg, var(--main-color) 60%, #e91e63 100%);
  color: #fff;
  letter-spacing: 1.5px;
  transform: translateY(-2px) scale(1.05);
}
.settings-box .reset:hover {
  background: #b71c1c;
  letter-spacing: 2px;
  animation: shake 0.3s;
}
@keyframes shake {
  0% { transform: translateX(0);}
  25% { transform: translateX(-3px);}
  50% { transform: translateX(3px);}
  75% { transform: translateX(-3px);}
  100% { transform: translateX(0);}
}
.nav-bullets .bullet:hover {
  background-color: var(--main-color);
  border-color: #fff;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.18);
  transform: scale(1.15);
}
.landing-page .header-area ul li a:hover,
.landing-page .header-area ul li a.active {
  color: var(--main-color);
  background: #fff;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
  transform: translateY(-2px) scale(1.08);
}
.features .feat-box:hover img {
  transform: scale(1.12) rotate(-4deg);
  filter: drop-shadow(0 4px 16px rgba(33,150,243,0.18));
}
.features .feat-box:hover {
  transform: translateY(-12px) scale(1.04);
  box-shadow: 0 12px 32px rgba(33, 150, 243, 0.18);
}
.gallery img:hover {
  transform: scale(1.12) rotate(-2deg);
  border-color: var(--main-color);
  box-shadow: 0 12px 32px rgba(33, 150, 243, 0.18);
}
.popup-box {
  animation: fadeIn 0.4s;
}
.close-button:hover {
  background: #b71c1c;
  transform: scale(1.15) rotate(8deg);
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 var(--main-color);}
  100% { box-shadow: 0 0 0 8px rgba(33,150,243,0);}
}
  `;
  document.head.appendChild(style);
})();
