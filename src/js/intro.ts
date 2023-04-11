import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function intro(selector: string = ".js-intro") {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const bg = element.querySelector<HTMLDivElement>(".intro__bg-parallax");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bg, {
        duration: 1,
        y: () => element.offsetHeight * 0.3,
      });

      const textContent: HTMLElement = element.querySelector(
        ".intro__text-content"
      );
      const introContent: HTMLElement =
        element.querySelector(".intro__content");
      // const bottomRow: HTMLElement =
      //   element.querySelector(".intro__bottom-row");
      ScrollTrigger.create({
        trigger: textContent,
        start: "top top+=20",
        pin: true,
        pinSpacing: false,
        end: () => {
          const contentHeight = introContent.offsetHeight;
          const paddingTop = parseFloat(
            window
              .getComputedStyle(introContent, null)
              .getPropertyValue("padding-top")
          );
          const paddingBottom = parseFloat(
            window
              .getComputedStyle(introContent, null)
              .getPropertyValue("padding-bottom")
          );
          const textContentHeight = textContent.offsetHeight;

          console.log(
            contentHeight,
            paddingTop,
            paddingBottom,
            textContentHeight
          );

          return contentHeight - paddingTop - paddingBottom - textContentHeight;
        },
      });
    });
  });
}

export default intro;
