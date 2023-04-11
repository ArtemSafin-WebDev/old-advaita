import Swiper, { SwiperOptions } from "swiper";
import "swiper/css";

function officesSlider(selector: string = ".js-offices-slider"): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const container: HTMLElement | null = element.querySelector(".swiper");
    if (!container) return;
    let sliderInstance: Swiper | null = null;
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 500,
    };

    const mql = window.matchMedia("(max-width: 640px)");

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        sliderInstance = new Swiper(container, options);
      } else {
        if (sliderInstance) {
          sliderInstance.destroy();
          sliderInstance = null;
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}

export default officesSlider;
