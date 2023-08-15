const getPaginationImages = (index, className, images) => {
  return `<span class="${className} custom-pagination-bullet"><img src=${images[
    index
  ].getAttribute("src")} alt=${images[index].getAttribute("alt")}></span>`;
};

const imagesPre = document.querySelectorAll(
  ".swiper-pre-workout .swiper-slide img"
);

const baseConfig = {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
};

const swiperPreWorkout = new Swiper(".swiper-pre-workout", {
  ...baseConfig,
  pagination: {
    el: ".pre-workout-pagination",
    clickable: true,
    renderBullet: (index, className) =>
      getPaginationImages(index, className, imagesPre),
  },
});

const imagesCollagen = document.querySelectorAll(
  ".swiper-collagen .swiper-slide img"
);
const swiperCollagen = new Swiper(".swiper-collagen", {
  ...baseConfig,
  pagination: {
    el: ".collagen-pagination",
    clickable: true,
    renderBullet: (index, className) =>
      getPaginationImages(index, className, imagesCollagen),
  },
});
