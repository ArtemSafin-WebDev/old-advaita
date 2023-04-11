import Swiper, { SwiperOptions, Autoplay } from "swiper";
import "swiper/css";

function partnersSlider(selector: string = ".js-partners-slider"): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const list = element.querySelector<HTMLUListElement>(".partners__list");
    const container: HTMLElement | null = element.querySelector(".swiper");
    let sliderInstance: Swiper | null = null;
    let listClone: HTMLUListElement | null = null;
    const options: SwiperOptions = {
      modules: [Autoplay],
      autoplay: {
        delay: 1500,
      },
      slidesPerView: "auto",
      speed: 600,
      centeredSlides: true,
      loop: true,
      loopedSlides: 8,
    };

    const mql = window.matchMedia("(max-width: 640px)");

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        console.log("Media Query Matched!");
        if (listClone) {
          list.style.animation = "";
          listClone.style.animation = "";

          listClone.remove();
          listClone = null;
        }
        if (container) {
          sliderInstance = new Swiper(container, options);
        }
      } else {
        console.log("Media not matches");
        if (sliderInstance) {
          sliderInstance.destroy();
          sliderInstance = null;
        }
        if (list) {
          const clone = list.cloneNode(true) as HTMLUListElement;
          const parent = list.parentElement;
          listClone = clone;
          if (parent) {
            parent.append(clone);
          }

          requestAnimationFrame(() => {
            list.style.animation = "ticker 15s linear infinite";
            listClone.style.animation = "ticker 15s linear infinite";
          });
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}

export default partnersSlider;
