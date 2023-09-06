const links = document.querySelectorAll(".page-link");
const urlParams = new URLSearchParams(window.location.search);

const handleWindowWidth = () => {
  const width = window.innerWidth;
  const images = document.querySelectorAll(".main__img");
  const contents = document.querySelectorAll(".content");
  const titles = document.querySelectorAll(".banner .h1");
  if (width <= 1125) {
    images.forEach((image, i) => {
      if (!contents[i].contains(image))
        titles[i].insertAdjacentElement("afterend", image);
    });
  } else {
    images.forEach((image, i) => {
      if (contents[i].contains(image)) {
        contents[i].insertAdjacentElement("afterend", image);
      }
    });
  }
};
window.onresize = () => {
  handleWindowWidth();
};
handleWindowWidth();

const handleCurrentLink = () => {
  const currentPage = urlParams.get("page");
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("to") == currentPage) link.classList.add("active");
  });
};

const handleCurrentPage = () => {
  const currentPage = urlParams.get("page");
  const pages = document.querySelectorAll(".main__container");
  pages.forEach((page) => {
    page.classList.remove("active");
    if (page.id === currentPage) 
      page.classList.add("active");
  });
};

if (!urlParams.get("page")) {
  urlParams.set("page", "pre-workout");
  window.history.pushState({ page_id: "pre-workout" }, "", `?${urlParams}`);
}
handleCurrentLink();
handleCurrentPage(true);

const handleUrl = (e) => {
  const state = {};
  state.page_id = e.target.innerHTML.replace(" ", "-");
  urlParams.set("page", `${e.target.getAttribute("to")}`);
  window.history.pushState(state, "", `?${urlParams}`);
  window.scrollTo(0,0)
  handleCurrentLink();
};

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    handleUrl(e);
    handleCurrentPage();
  });
});

const mobileButton = document.querySelector(".header__mobile-button");
const mobileList = document.querySelector(".header ul");

[...links, mobileButton].forEach((item) => {
  item.addEventListener("click", () => {
    mobileButton.classList.toggle("active");
    mobileList.classList.toggle("active");
  });
});
