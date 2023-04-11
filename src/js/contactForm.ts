import axios from "axios";
import Modal from "./classes/Modal";
import Validator from "./classes/Validator";

function contactForm(selector = ".js-contact-form") {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const form = element.querySelector<HTMLFormElement>("form");
    const modal = document.querySelector<HTMLDivElement>(
      ".contact-form__success"
    );
    const closeModalBtn = modal.querySelector<HTMLButtonElement>(
      ".contact-form__success-close"
    );

    const readMoreBtn = modal.querySelector<HTMLButtonElement>(
      ".contact-form__success-link"
    );

    const controller = new AbortController();
    if (!form) return;

    const buttons = [closeModalBtn, readMoreBtn];

    const validator = new Validator(form);
    let successModal: Modal | null = null;
    if (modal) {
      successModal = new Modal(modal, {
        closeButton: buttons,
      });
    }
    form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      validator.validate();

      if (validator.valid) {
        const formData = new FormData(form);

        axios
          .post(form.action, formData, {
            signal: controller.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "mail_sent" && successModal) {
              form.reset();
              successModal.openModal();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  });
}

export default contactForm;
