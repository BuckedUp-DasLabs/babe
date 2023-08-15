const getPaginationImages = (index, className, images) => {
  return `<span class="${className} custom-pagination-bullet"><img src=${images[
    index
  ].getAttribute("src")} alt=${images[index].getAttribute("alt")}></span>`;
};

const imagesPre = document.querySelectorAll(
  ".swiper-pre-workout .swiper-slide img"
);
const swiperPreWorkout = new Swiper(".swiper-pre-workout", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  pagination: {
    el: ".pre-workout-pagination",
    clickable: true,
    renderBullet: (index, className) =>
      getPaginationImages(index, className, imagesPre),
  },
});
