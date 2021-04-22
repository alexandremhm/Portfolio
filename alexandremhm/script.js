const about = document.querySelector("#about");

about.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 570,
    behavior: "smooth",
  });
});

const education = document.querySelector("#education");

education.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 1000,
    behavior: "smooth",
  });
});

const goals = document.querySelector("#goals");
goals.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 1600,
    behavior: "smooth",
  });
});

const projects = document.querySelector("#projects");

projects.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 2100,
    behavior: "smooth",
  });
});

const road = document.querySelector("#road");

road.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 2750,
    behavior: "smooth",
  });
});
