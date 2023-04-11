import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function productsShowMore(selector = ".products__show-more") {
  const elements = Array.from(document.querySelectorAll(selector));

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const image = element.querySelector<HTMLImageElement>(
        ".products__show-more-image"
      );

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
  });
}
