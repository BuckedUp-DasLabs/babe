const links = document.querySelectorAll(".page-link");
const urlParams = new URLSearchParams(window.location.search);

if(!urlParams.get("page")){
  urlParams.set("page","balance")
  window.history.pushState({page_id: "balance"},"",`?${urlParams}`)
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const state = {}
    state.page_id = e.target.innerHTML.replace(" ","-");
    urlParams.set("page",`${e.target.getAttribute("to")}`);
    window.history.pushState(state,"",`?${urlParams}`)
  });
});