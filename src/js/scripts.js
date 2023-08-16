let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = {};
function onYouTubeIframeAPIReady() {
  const pages = document.querySelectorAll(".main__container");
  pages.forEach((page) => {
    const iframeContainer = page.querySelector("[video]");
    if (iframeContainer) {
      const playerVars = {
        origin: window.location.origin,
        controls: 0,
        disablekb: 1,
        fs: 0,
        playlist: iframeContainer.id,
        loop: 1,
        mute: 1,
        rel: 0,
      };
      if (page.classList.contains("active")) playerVars["autoplay"] = 1;
      if (iframeContainer)
        players[iframeContainer.id] = new YT.Player(iframeContainer.id, {
          videoId: iframeContainer.id,
          playerVars: playerVars,
        });
    }
  });
}

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

const handleCurrentPage = (first = false) => {
  const currentPage = urlParams.get("page");
  const pages = document.querySelectorAll(".main__container");
  const bg = document.querySelector(".main__bg");
  bg.classList.toggle("alternate");
  pages.forEach((page) => {
    page.classList.remove("active");
    const iframe = page.querySelector("iframe");
    if (!first) {
      if (iframe) players[iframe.id].pauseVideo();
    }
    if (page.id === currentPage) {
      page.classList.add("active");
      if (iframe) players[iframe.id].playVideo();
    }
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
console.log(mobileButton);
console.log(mobileList);
console.log(links);

[...links, mobileButton].forEach((item) => {
  console.log("aaaa", item)
  console.log(item.addEventListener("click", () => {
    mobileButton.classList.toggle("active");
    mobileList.classList.toggle("active");
  }));
});
