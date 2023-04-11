import Swiper, { SwiperOptions, Mousewheel } from "swiper";
import "swiper/css";
import Modal from "./classes/Modal";
import gsap from "gsap";

export default function productModal() {
  const productModal: HTMLElement = document.querySelector(".product-modal");
  const productModalCloseBtn: HTMLButtonElement = document.querySelector(
    ".product-modal__close"
  );

  if (!productModal) return;

  const productModalSlides: HTMLElement[] = Array.from(
    productModal.querySelectorAll(".swiper-slide")
  );

  const sliderContainer: HTMLElement = productModal.querySelector(".swiper");
  let sliderInstance: Swiper | null = null;

  const options: SwiperOptions = {
    slidesPerView: "auto",
    centeredSlides: false,
    loop: false,
    direction: "vertical",
    loopedSlides: 10,
    centeredSlidesBounds: true,
    modules: [Mousewheel],
    mousewheel: true,
    threshold: 5,
  };

  if (sliderContainer) {
    const mql = window.matchMedia("(max-width: 640px)");

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (sliderInstance) {
        sliderInstance.destroy();
        sliderInstance = null;
      }
      if (e.matches) {
        sliderInstance = new Swiper(sliderContainer, {
          ...options,
          direction: "horizontal",
        });
      } else {
        sliderInstance = new Swiper(sliderContainer, options);
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  }

  const modalInstance = new Modal(productModal, {
    closeButton: productModalCloseBtn,
    onClose: (modal) => {
      const content = modal.querySelector(".product-modal__content");
      content.innerHTML = "";
    },
  });

  const productsCards: HTMLLinkElement[] = Array.from(
    document.querySelectorAll(
      ".products__card, .products-catalog__card, .product-modal__slider-card"
    )
  );

  productsCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const href = card.href;
      if (card.hasAttribute("data-id")) {
        const id = card.getAttribute("data-id");
        const sliderIndex = productModalSlides.findIndex(
          (slide) =>
            slide
              .querySelector(".product-modal__slider-card")
              .getAttribute("data-id") === id
        );
        productsCards.forEach((card) => {
          const cardId = card.getAttribute("data-id");
          if (cardId !== id) {
            card.classList.remove("active");
          } else {
            card.classList.add("active");
          }
        });

        if (sliderIndex !== -1) {
          sliderInstance.slideTo(sliderIndex);
        }
      }

      modalInstance.openModal();

      fetch(href)
        .then((response) => {
          if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
          }

          return response.text();
        })
        .then((data) => {
          const parser = new DOMParser();
          const nextPageHtml = parser.parseFromString(data, "text/html");

          const modalContent = nextPageHtml.querySelector(
            ".product-modal__content"
          );

          const currentModalContent = document.querySelector(
            ".product-modal__content"
          );

          if (currentModalContent.children.length) {
            gsap
              .to(currentModalContent, {
                autoAlpha: 0,
                duration: 0.2,
              })
              .then(() => {
                currentModalContent.replaceWith(modalContent);
                gsap.from(modalContent, {
                  autoAlpha: 0,
                  duration: 0.2,
                });
              });
          } else {
            currentModalContent.replaceWith(modalContent);
            gsap.from(modalContent, {
              autoAlpha: 0,
              duration: 0.2,
            });
          }

          console.log("Next page HTML", modalContent);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
}
