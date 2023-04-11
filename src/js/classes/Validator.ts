import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import isNumeric from "validator/es/lib/isNumeric";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ValidationError {
  element: HTMLInputElement | HTMLElement;
  message: string;
}

class Validator {
  private form;
  private textFields: HTMLInputElement[];
  private selects: HTMLElement[];
  private hasBeenValidated: boolean = false;
  public errors: ValidationError[] = [];
  private emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.form.noValidate = true;
    this.textFields = Array.from(
      form.querySelectorAll('input[type="text"], input[type="email"]')
    );
    this.selects = Array.from(form.querySelectorAll("[data-required-select]"));

    this.textFields.forEach((field) => {
      field.addEventListener("input", () => {
        if (this.hasBeenValidated) {
          const result = this.validateTextField(field);
          this.showTextFieldMessage(field, result);
        }
      });
    });

    this.selects.forEach((select) => {
      const selectInputs = Array.from(
        select.querySelectorAll<HTMLInputElement>(
          'input[type="radio"], input[type="checkbox"]'
        )
      );

      selectInputs.forEach((input) => {
        input.addEventListener("change", () => {
          if (this.hasBeenValidated) {
            const result = this.validateSelect(select);
            this.showSelectFieldMessage(select, result);
          }
        });
      });
    });

    this.form.addEventListener("reset", () => {
      this.reset();
    });
  }

  validateTextField(field: HTMLInputElement): ValidationError | null {
    const value = field.value.trim();
    this.errors = this.errors.filter((error) => error.element !== field);
    if (field.hasAttribute("required") && !value) {
      this.errors.push({
        element: field,
        message: "Field is required",
      });
    }

    if (field.matches('[type="email"]') && value) {
      if (!value.match(this.emailRegex)) {
        this.errors.push({
          element: field,
          message: "Enter correct E-mail",
        });
      }
    }

    if (value && field.matches('[data-alphanumeric=""]')) {
      const cleanedValue = value.replace(/\s/g, "");
      if (!isAlphanumeric(cleanedValue) || isNumeric(cleanedValue)) {
        this.errors.push({
          element: field,
          message: "Only digits and numbers allowed",
        });
      }
    }

    const error = this.errors.find((error) => error.element === field);
    if (error) {
      return error;
    } else {
      return null;
    }
  }

  placeErrorMessage(container: HTMLElement, error: ValidationError | null) {
    const currentMessage = container.querySelector(".validation-error");
    if (currentMessage && error === null) {
      currentMessage.remove();
    } else if (currentMessage && error !== null) {
      currentMessage.textContent = error.message;
    } else if (!currentMessage && error !== null) {
      const newMessage = document.createElement("div");
      newMessage.className = "validation-error";
      newMessage.textContent = error.message;
      container.appendChild(newMessage);
    }

    this.updateHeight();
  }

  updateHeight() {
    ScrollTrigger.refresh();
  }

  showTextFieldMessage(
    field: HTMLInputElement,
    error: ValidationError | null
  ): void {
    const parent = field.parentElement;
    if (!parent) return;
    this.placeErrorMessage(parent, error);
  }

  validateSelect(select: HTMLElement): ValidationError | null {
    const selectInputs = Array.from(
      select.querySelectorAll<HTMLInputElement>(
        'input[type="radio"], input[type="checkbox"]'
      )
    );
    const checked = selectInputs.find((input) => input.checked);

    if (!checked) {
      return {
        element: select,
        message: "Field is required",
      };
    } else {
      return null;
    }
  }

  showSelectFieldMessage(
    select: HTMLElement,
    error: ValidationError | null
  ): void {
    this.placeErrorMessage(select, error);
  }

  validate(): boolean {
    this.hasBeenValidated = true;
    this.errors = [];
    this.textFields.forEach((field) => {
      const result = this.validateTextField(field);
      this.showTextFieldMessage(field, result);
    });

    this.selects.forEach((select) => {
      const result = this.validateSelect(select);
      this.showSelectFieldMessage(select, result);
    });

    return this.errors.length === 0;
  }

  reset() {
    this.errors = [];
    this.hasBeenValidated = false;
    this.form
      .querySelectorAll(".validation-error")
      .forEach((message) => message.remove());
  }

  get valid(): boolean {
    return this.errors.length === 0;
  }
}

export type { ValidationError };

export default Validator;
