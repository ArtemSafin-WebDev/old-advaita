import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

function menu() {
  const button = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );
  const pageHeaderMenu =
    document.querySelector<HTMLDivElement>(".page-header__menu");

  if (!button || !pageHeaderMenu) return;

  let menuOpen: boolean = false;

  const openMenu = () => {
    document.body.classList.add("mobile-menu-open");
    menuOpen = true;
    disableBodyScroll(pageHeaderMenu, {
      reserveScrollBarGap: true,
    });
  };

  const closeMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    menuOpen = false;
    clearAllBodyScrollLocks();
  };

  const menuHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  button.addEventListener("click", menuHandler);

  const mql = window.matchMedia("(max-width: 640px)");

  const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
    if (!e.matches && menuOpen) {
      closeMenu();
    }
  };

  mql.addEventListener("change", handleResize);
}

export default menu;
