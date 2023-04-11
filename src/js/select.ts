function select(
  selector: string = ".js-select",
  btnSelector: string = ".js-select-btn",
  btnTextSelector: string = ".js-select-btn-text",
  choiceTextSelector: string = ".js-select-choice-text"
): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );
  elements.forEach((element) => {
    const btn = element.querySelector<HTMLButtonElement>(btnSelector);
    const btnText = element.querySelector(btnTextSelector);
    const inputs = Array.from(
      element.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"], input[type="radio"]'
      )
    );
    const handleBtnClick = (event: MouseEvent) => {
      event.preventDefault();
      element.classList.toggle("active");
    };

    const handleSelectValue = () => {
      const checked = inputs.find((input) => input.checked);
      if (checked && btnText) {
        const choiceText =
          checked.parentElement?.querySelector(choiceTextSelector);
        if (choiceText) {
          btnText.textContent = choiceText.textContent;
        }
      }
      element.classList.remove("active");
    };

    const handleOutsideClick = (event: MouseEvent) => {
      const { target } = event;
      if (target && target instanceof Element) {
        const clickedInside =
          target.matches(selector) || target.closest(selector);
        if (clickedInside) return;
        element.classList.remove("active");
      }
    };

    btn?.addEventListener("click", handleBtnClick);
    inputs.forEach((input) => {
      input.addEventListener("change", handleSelectValue);
    });
    document.addEventListener("click", handleOutsideClick);
  });
}

export default select;
