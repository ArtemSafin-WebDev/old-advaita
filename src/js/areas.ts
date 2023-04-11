import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function areas() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".areas")
  );

  elements.forEach((element) => {
    const image = element.querySelector(".areas__image");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(image, {
      yPercent: -15,
      duration: 0.1,
    });
  });
}

export default areas;
