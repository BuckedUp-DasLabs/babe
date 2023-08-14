const links = document.querySelectorAll(".page-link");
const urlParams = new URLSearchParams(window.location.search);

const handleCurrentLink = () => {
  const currentPage = urlParams.get("page");
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("to") == currentPage) link.classList.add("active");
  });
};

if (!urlParams.get("page")) {
  urlParams.set("page", "balance");
  window.history.pushState({ page_id: "balance" }, "", `?${urlParams}`);
}
handleCurrentLink();

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const state = {};
    state.page_id = e.target.innerHTML.replace(" ", "-");
    urlParams.set("page", `${e.target.getAttribute("to")}`);
    window.history.pushState(state, "", `?${urlParams}`);
    handleCurrentLink();
  });
});
