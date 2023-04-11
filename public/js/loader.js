(function () {
  function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = style["transform"];
    if (matrix === "none" || typeof matrix === "undefined") {
      return {
        x: 0,
        y: 0,
        z: 0,
      };
    }
    const matrixType = matrix.includes("3d") ? "3d" : "2d";
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    if (matrixType === "2d") {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0,
      };
    }
    if (matrixType === "3d") {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14],
      };
    }
  }

  function disableScroll() {
    document.documentElement.classList.add("no-scroll");
  }

  function enableScroll() {
    document.documentElement.classList.remove("no-scroll");
  }

  let loadStarted = false;

  const loader = document.querySelector(".loader");
  if (loader) {
    const loaderLetters = Array.from(
      loader.querySelectorAll(".loader__name-letter-image")
    );
    const loaderBackplate = loader.querySelector(".loader__backplate");
    const loaderName = loader.querySelector(".loader__name");
    const introName = document.querySelector(".intro__name");

    disableScroll();

    console.log("Media", window.matchMedia("(max-width: 1024px)").matches);
    console.log("IntroName", introName);

    let transitionStarted = false;

    function handleTransition() {
      transitionStarted = true;
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;

      if (isMobile || !introName) {
        setTimeout(() => {
          loader.classList.add("hidden");

          document.body.classList.add("loader-hidden");
          enableScroll();
          document.body.classList.add("animatable");
        }, 200);
      } else {
        setTimeout(() => {
          loaderBackplate.classList.add("hidden");
          document.body.classList.add("loader-hidden");

          const introNamePosition =
            introName.getBoundingClientRect().top + window.pageYOffset;
          const loaderNamePosition = loaderName.getBoundingClientRect().top;

          function handleTransitionEnd() {
            loaderName.removeEventListener(
              "transitionend",
              handleTransitionEnd
            );
            loader.classList.add("hidden");
            document.body.classList.add("animatable");
            setTimeout(() => {
              enableScroll();
            }, 500);
          }

          loaderName.addEventListener("transitionend", handleTransitionEnd);
          loaderName.style.transform = `translateY(${
            introNamePosition - loaderNamePosition
          }px)`;
        }, 200);
      }
    }

    function handleLetters() {
      loaderLetters.forEach((letter) => {
        let paused = false;

        const pauseAnimation = () => {
          if (paused) return;

          const { x } = getTranslateValues(letter);

          if (x == 0) {
            letter.classList.add("exit");
            paused = true;

            if (!transitionStarted) {
              handleTransition();
            }
            return;
          }
          requestAnimationFrame(pauseAnimation);
        };

        requestAnimationFrame(pauseAnimation);
      });
    }

    function handleLoad() {
      if (loadStarted) return;
      loadStarted = true;
      handleLetters();
    }

    window.addEventListener("load", () => {
      handleLoad();
    });
  }
})();
