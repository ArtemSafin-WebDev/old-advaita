import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function brokerage(selector = ".service-brokerage") {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const image = element.querySelector(".service-brokerage__image");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
      },
    });

    tl.to(image, {
      scaleY: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });
  });
}
