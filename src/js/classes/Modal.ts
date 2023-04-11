import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

interface ModalOptions {
  closeButton?: HTMLButtonElement | (HTMLButtonElement | null)[];
  openButton?: HTMLButtonElement | (HTMLButtonElement | null)[];
  onClose?: (modal: HTMLElement) => void;
  onOpen?: (modal: HTMLElement) => void;
}

class Modal {
  private modal;
  private options?;
  public open: boolean = false;
  private onClose: (modal: HTMLElement) => void;
  private onOpen: (modal: HTMLElement) => void;
  constructor(modal: HTMLElement, options?: ModalOptions) {
    this.modal = modal;
    this.options = options;
    this.setHandlers();
    if (this.options.onClose) {
      this.onClose = this.options.onClose;
    }
    if (this.options.onOpen) {
      this.onOpen = this.options.onOpen;
    }
  }

  public openModal(): void {
    if (this.open) return;
    this.modal.classList.add("active");
    disableBodyScroll(this.modal, {
      reserveScrollBarGap: true,
    });
    this.open = true;

    if (this.onOpen) {
      console.log("On open callback");
      this.onOpen(this.modal);
    }
  }

  public closeModal(): void {
    if (!this.open) return;
    this.modal.classList.remove("active");
    clearAllBodyScrollLocks();
    this.open = false;

    if (this.onClose) {
      console.log("On close callback");
      this.onClose(this.modal);
    }
  }

  private setHandlers() {
    if (this.options?.closeButton) {
      if (Array.isArray(this.options.closeButton)) {
        this.options.closeButton.forEach((btn) => {
          if (btn !== null) {
            btn.addEventListener("click", (event: MouseEvent) => {
              event.preventDefault();
              this.closeModal();
            });
          }
        });
      } else {
        this.options?.closeButton.addEventListener(
          "click",
          (event: MouseEvent) => {
            event.preventDefault();
            this.closeModal();
          }
        );
      }
    }
    if (this.options?.openButton) {
      if (Array.isArray(this.options.openButton)) {
        this.options.openButton.forEach((btn) => {
          if (btn !== null) {
            btn.addEventListener("click", (event: MouseEvent) => {
              event.preventDefault();
              this.openModal();
            });
          }
        });
      } else {
        this.options?.openButton.addEventListener(
          "click",
          (event: MouseEvent) => {
            event.preventDefault();
            this.openModal();
          }
        );
      }
    }
  }
}

export type { ModalOptions };

export default Modal;
