import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function equilizer() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".service-finance__equilizer")
  );

  elements.forEach((element) => {
    const groups = Array.from(element.querySelectorAll("g"));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
      },
    });

    console.log("Groups", groups);

    let startTime = 0;

    groups.forEach((group) => {
      const cells = Array.from(group.querySelectorAll(".eq-cell")).reverse();

      cells.forEach((cell, index) => {
        const position = index === 0 ? startTime : ">";
        tl.to(
          cell,
          {
            fill: "#abbbfe",
            duration: 0.07,
          },
          position
        );
      });

      startTime += 0.1;
    });
  });
}

export default equilizer;
