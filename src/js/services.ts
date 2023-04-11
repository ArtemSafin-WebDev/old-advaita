import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function services(selector: string = ".js-services") {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const bgImage = element.querySelector(".services__bg-image");
    const content = element.querySelector(".services__content");

    let mm = gsap.matchMedia();

    mm.add("(orientation: landscape)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: () => `top+=${window.innerHeight * 2} top`,
          markers: false,
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(bgImage, {
        maskSize: "auto 1500%",
        duration: 1,
        ease: "power2.in",
      }).to(content, {
        autoAlpha: 1,
        duration: 0.5,
      });
    });

    mm.add("(orientation: portrait)", () => {
      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          element.classList.add("revealed");
        },
      });
    });
  });
}

export default services;
